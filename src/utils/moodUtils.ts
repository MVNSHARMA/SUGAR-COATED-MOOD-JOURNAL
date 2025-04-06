export const getMoodColor = (mood: string): string => {
  const moodColors: { [key: string]: string } = {
    happy: '#FFD700',    // Gold
    sad: '#4169E1',      // Royal Blue
    stressed: '#FF6B6B',  // Coral Red
    energetic: '#32CD32', // Lime Green
    sleepy: '#9370DB'    // Medium Purple
  };
  
  return moodColors[mood.toLowerCase()] || '#808080'; // Default to gray if mood not found
}; 