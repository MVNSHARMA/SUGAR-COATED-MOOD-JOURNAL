import { createContext } from 'react';

interface MoodContextType {
  currentMood: string;
  setCurrentMood: (mood: string) => void;
}

export const MoodContext = createContext<MoodContextType>({
  currentMood: '',
  setCurrentMood: () => {},
}); 