import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './components/Home';
import Journal from './components/Journal';
import { MoodContext } from './context/MoodContext';

// Sugar-themed background patterns
const backgroundPatterns = [
  '🍬', '🍭', '🍫', '🧁', '🍪', '🍩', '🍰', '🍡', '🍮', '🍯'
];

// Wrapper component to access location
interface AnimatedRoutesProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ isDarkMode, setIsDarkMode }) => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      <Route path="/journal" element={<Journal />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [backgroundItems, setBackgroundItems] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  // Create floating background items
  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: backgroundPatterns[Math.floor(Math.random() * backgroundPatterns.length)]
    }));
    setBackgroundItems(items);
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#FF69B4',
      },
      secondary: {
        main: '#FFD700',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #121212 0%, #1a1a2e 100%)' 
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffe5e5 100%)',
        }}
      >
        {/* Floating background items */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
          {backgroundItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
                x: [item.x, item.x + 10, item.x],
                y: [item.y, item.y - 10, item.y],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: '1.5rem',
                zIndex: 0,
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </Box>

        <MoodContext.Provider value={{ currentMood, setCurrentMood }}>
          <Router>
            <AnimatedRoutes isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </Router>
        </MoodContext.Provider>
      </Box>
    </ThemeProvider>
  );
};

export default App; 