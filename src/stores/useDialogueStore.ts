import { create } from 'zustand';
import chapter1Data from '../data/chapter1.json';
import chapter2Data from '../data/chapter2.json';
import chapter3Data from '../data/chapter3.json';
import chapter4Data from '../data/chapter4.json';
import { useGameStore } from './useGameStore';
import { submitScore } from '../services/leaderboard';

export type DialogueOption = {
  key: string;
  label: string;
  consequence: string;
  ideologyDelta: number;
  forcesDelta: number;
};

export type DialogueNode = {
  id: string;
  type: 'line' | 'choice';
  speaker?: string;
  text?: string;
  prompt?: string;
  timerSeconds?: number;
  timeoutFallback?: string;
  options?: DialogueOption[];
  next?: string;
};

interface DialogueState {
  currentNode: DialogueNode | null;
  nodesMap: Record<string, DialogueNode>;
  
  loadChapter: (chapterNum: number) => void;
  advance: (nextNodeId?: string) => void;
  makeChoice: (option: DialogueOption) => void;
}

export const useDialogueStore = create<DialogueState>((set, get) => ({
  currentNode: null,
  nodesMap: {},
  
  loadChapter: (chapterNum: number) => {
    let data;
    let startNode = 'ch1_start';
    if (chapterNum === 1) { data = chapter1Data; startNode = 'ch1_start'; }
    else if (chapterNum === 2) { data = chapter2Data; startNode = 'ch2_start'; }
    else if (chapterNum === 3) { data = chapter3Data; startNode = 'ch3_start'; }
    else if (chapterNum === 4) { data = chapter4Data; startNode = 'ch4_start'; }
    
    if (!data) return;

    const map: Record<string, DialogueNode> = {};
    data.nodes.forEach((n: any) => {
      map[n.id] = n;
    });
    set({ nodesMap: map, currentNode: map[startNode] });
    useGameStore.getState().setChapter(chapterNum as 1|2|3|4);
  },
  
  advance: (nextNodeId?: string) => {
    const { currentNode, nodesMap, loadChapter } = get();
    if (!currentNode) return;
    
    let nextId = nextNodeId || currentNode.next;
    
    if (nextId === 'ending') {
      const state = useGameStore.getState();
      // Điểm thất bại: Trọng số tư tưởng rất thấp (x10) cộng với lực lượng còn sót lại
      const failScore = Math.max(0, state.ideology * 10) + state.forces;
      
      const localKey = 'binh_minh_do_player';
      const localDataStr = localStorage.getItem(localKey);
      let isNewHighScore = true;
      if (localDataStr) {
         const localData = JSON.parse(localDataStr);
         if (localData.name === state.playerName && failScore <= localData.bestScore) {
             isNewHighScore = false;
         }
      }
      
      if (isNewHighScore) {
         submitScore(state.playerName, failScore);
      }
      state.saveProgress(failScore, 'game_over');

      state.setEndGameStatus({
        type: 'lose',
        title: 'KẾT CỤC',
        message: currentNode.text || "Lịch sử đã rẽ sang một trang tăm tối vì quyết định sai lầm của bạn. Phong trào sụp đổ, bạn phải làm lại từ đầu!"
      });
      set({ currentNode: null });
      return;
    }
    
    if (nextId === 'next_chapter') {
      const currentCh = useGameStore.getState().chapter;
      if (currentCh < 4) {
         loadChapter(currentCh + 1);
      }
      return;
    }

    if (nextId === 'true_ending') {
      const state = useGameStore.getState();
      const finalScore = state.ideology * 100 + state.forces;
      
      const localKey = 'binh_minh_do_player';
      const localDataStr = localStorage.getItem(localKey);
      let isNewHighScore = true;
      if (localDataStr) {
         const localData = JSON.parse(localDataStr);
         if (localData.name === state.playerName && finalScore <= localData.bestScore) {
             isNewHighScore = false;
         }
      }
      
      if (isNewHighScore) {
         submitScore(state.playerName, finalScore);
      }
      state.saveProgress(finalScore, 'true_ending');
      
      state.setEndGameStatus({
        type: 'win',
        title: 'TRUE ENDING',
        message: currentNode.text || "BÌNH MINH ĐỎ! Lịch sử ghi nhận vinh quang của giai cấp vô sản. Bạn là Lãnh tụ kiệt xuất!"
      });
      set({ currentNode: null });
      return;
    }

    if (nextId === 'normal_ending') {
      const state = useGameStore.getState();
      const finalScore = state.ideology * 50 + state.forces;
      
      const localKey = 'binh_minh_do_player';
      const localDataStr = localStorage.getItem(localKey);
      let isNewHighScore = true;
      if (localDataStr) {
         const localData = JSON.parse(localDataStr);
         if (localData.name === state.playerName && finalScore <= localData.bestScore) {
             isNewHighScore = false;
         }
      }
      
      if (isNewHighScore) {
         submitScore(state.playerName, finalScore);
      }
      state.saveProgress(finalScore, 'normal_ending');
      
      state.setEndGameStatus({
        type: 'win',
        title: 'NORMAL ENDING',
        message: currentNode.text || "KHÚC TRÁNG CA! Phong trào bước vào kháng chiến trường kỳ gian khổ."
      });
      set({ currentNode: null });
      return;
    }

    if (nextId && nodesMap[nextId]) {
      set({ currentNode: nodesMap[nextId] });
    } else {
      set({ currentNode: null });
    }
  },
  
  makeChoice: (option: DialogueOption) => {
    const { advance, currentNode } = get();
    // Update game stats
    const gameStore = useGameStore.getState();
    const newIdeology = Math.max(0, Math.min(100, gameStore.ideology + option.ideologyDelta));
    const newForces = Math.max(0, gameStore.forces + option.forcesDelta);
    
    // Update Session Stats
    if (currentNode && currentNode.type === 'choice') {
       gameStore.updateSessionStat((stats) => {
           const newStats = { ...stats, totalQuestions: stats.totalQuestions + 1 };
           if (option.ideologyDelta > 0) {
               newStats.correctAnswers += 1;
               if (currentNode.id.includes('bonus')) {
                   newStats.bonusUnlocked += 1;
               }
               newStats.correctDetails = [
                 ...newStats.correctDetails,
                 {
                    chapter: gameStore.chapter,
                    question: currentNode.prompt || 'Câu hỏi',
                    answer: option.label
                 }
               ];
           } else {
               newStats.wrongAnswers += 1;
           }
           return newStats;
       });
    }
    
    useGameStore.setState({ ideology: newIdeology, forces: newForces });
    
    if (newIdeology <= 0) {
       advance('ending'); // Lực lượng tư tưởng sụp đổ -> Game Over
    } else {
       advance(option.consequence);
    }
  }
}));
