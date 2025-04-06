import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Paper,
  Grid,
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Avatar,
  Chip,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { analyzeMood, moodSpotifyPlaylists, generateMeme } from '../services/geminiService';
import { getMoodColor } from '../utils/moodUtils';

// Animation variants for drop letters
const dropLetterVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Emotion options with emojis
const emotions = [
  { value: 'happy', label: 'Happy 😊', color: '#FFD700', emoji: '😊', description: "You're feeling like a kid in a candy store! 🍬" },
  { value: 'sad', label: 'Sad 😢', color: '#4169E1', emoji: '😢', description: "Even the sweetest treats can't fix everything, but they help! 🍫" },
  { value: 'stressed', label: 'Stressed 😰', color: '#FF69B4', emoji: '😰', description: "When life gives you stress, eat chocolate! 🍪" },
  { value: 'energetic', label: 'Energetic ⚡', color: '#32CD32', emoji: '⚡', description: "You're buzzing like a bee on sugar! 🐝" },
  { value: 'sleepy', label: 'Sleepy 😴', color: '#9370DB', emoji: '😴', description: "Time for a sugar rush to wake you up! ☕" }
];

interface Analysis {
  response: string;
  foodSuggestions: Array<{
    name: string;
    description: string;
    recipe: string;
    orderLink: string;
    youtubeLink: string;
  }>;
  quote: string;
  poetry?: string;
  meme?: {
    imageUrl: string;
    caption: string;
    description: string;
  };
}

const Journal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState<string>('');
  const [mood, setMood] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [animatedResponse, setAnimatedResponse] = useState<string[]>([]);

  // Update animated response when analysis changes
  React.useEffect(() => {
    if (analysis?.response) {
      setAnimatedResponse(analysis.response.split(''));
    }
  }, [analysis]);

  const handleSubmit = async () => {
    if (!journalEntry.trim() || !mood) return;
    
    setIsAnalyzing(true);
    try {
      const [moodAnalysis, meme] = await Promise.all([
        analyzeMood(journalEntry, mood),
        generateMeme(mood)
      ]);
      
      const result = {
        ...moodAnalysis,
        meme
      };
      
      console.log("Analysis result:", result);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing mood:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefreshSuggestions = async () => {
    if (!mood || !journalEntry) return;
    
    try {
      // Get new food suggestions only
      const newAnalysis = await analyzeMood(journalEntry, mood);
      console.log("New food suggestions:", newAnalysis.foodSuggestions);
      
      // Create a complete Analysis object with all required properties
      // but keep the existing quote and poetry
      const updatedAnalysis: Analysis = {
        response: analysis?.response || "Your mood is as unique as a custom-made dessert! 🍰",
        foodSuggestions: newAnalysis.foodSuggestions,
        quote: analysis?.quote || newAnalysis.quote, // Keep the existing quote
        poetry: analysis?.poetry || newAnalysis.poetry, // Keep the existing poetry
        meme: analysis?.meme || newAnalysis.meme // Keep the existing meme
      };
      
      setAnalysis(updatedAnalysis);
    } catch (error) {
      console.error("Error refreshing suggestions:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
            fontFamily: "'Comic Sans MS', cursive",
            color: '#FF69B4',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            mb: 4
          }}>
            🍬 Sugar-Coated Mood Journal 🍭
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ 
              fontFamily: "'Comic Sans MS', cursive",
              color: '#FF1493',
              mb: 2
            }}>
              Yo, How's Your Sweet Tooth Vibing Today? 🍪
            </Typography>
            <Grid container spacing={2}>
              {emotions.map((emotion) => (
                <Grid item xs={6} sm={4} key={emotion.value}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paper
                      elevation={mood === emotion.value ? 8 : 2}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: mood === emotion.value 
                          ? `linear-gradient(135deg, ${emotion.color} 0%, ${emotion.color}99 100%)`
                          : 'white',
                        border: `2px solid ${emotion.color}`,
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6
                        }
                      }}
                      onClick={() => setMood(emotion.value)}
                    >
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        color: mood === emotion.value ? 'white' : emotion.color
                      }}>
                        {emotion.emoji}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        color: mood === emotion.value ? 'white' : 'text.primary'
                      }}>
                        {emotion.label.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        color: mood === emotion.value ? 'white' : 'text.secondary',
                        display: 'block',
                        mt: 1
                      }}>
                        {emotion.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Spill Your Sweet Tea Here 🍯"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                '&:hover fieldset': {
                  borderColor: '#FF69B4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF69B4',
                },
              },
              '& .MuiInputLabel-root': {
                fontFamily: "'Comic Sans MS', cursive",
                color: '#FF69B4',
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!journalEntry.trim() || !mood || isAnalyzing}
                sx={{
                  background: 'linear-gradient(135deg, #FF69B4 0%, #FF69B499 100%)',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontFamily: "'Comic Sans MS', cursive",
                  fontSize: '1.1rem',
                  boxShadow: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF69B499 0%, #FF69B4 100%)',
                  }
                }}
              >
                {isAnalyzing ? 'Analyzing...' : 'Let\'s See What The Sugar Gods Say 🍬'}
              </Button>
            </motion.div>
          </Box>

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)' }}>
                <Typography variant="h5" gutterBottom sx={{ 
                  fontFamily: "'Comic Sans MS', cursive",
                  color: '#FF1493',
                  mb: 3
                }}>
                  Your Mood Analysis (No Cap) 🎭
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  fontFamily: "'Comic Sans MS', cursive",
                  letterSpacing: '0.5px',
                  wordSpacing: '2px'
                }}>
                  {animatedResponse.map((char, index) => (
                    <motion.span
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={dropLetterVariants}
                      custom={index}
                      style={{ 
                        display: 'inline-block',
                        marginRight: char === ' ' ? '0.5em' : '0'
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </Typography>

                {analysis?.response && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                      fontFamily: "'Comic Sans MS', cursive",
                      color: '#FF1493',
                      mb: 2
                    }}>
                      Your Mood Analysis 🍬
                    </Typography>
                    <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)', borderRadius: 3 }}>
                      <Typography variant="body1" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        whiteSpace: 'pre-line',
                        textAlign: 'center'
                      }}>
                        {analysis.response}
                      </Typography>
                    </Paper>
                  </Box>
                )}

                {analysis?.poetry && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                      fontFamily: "'Comic Sans MS', cursive",
                      color: '#FF1493',
                      mb: 2
                    }}>
                      Your Daily Dose of Sugar Poetry (No Cap) 🍯
                    </Typography>
                    <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)', borderRadius: 3 }}>
                      <Typography variant="body1" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        fontStyle: 'italic',
                        whiteSpace: 'pre-line',
                        textAlign: 'center'
                      }}>
                        {analysis.poetry}
                      </Typography>
                    </Paper>
                  </Box>
                )}

                {analysis.meme && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ 
                      fontFamily: "'Comic Sans MS', cursive",
                      color: '#FF69B4',
                      mb: 2
                    }}>
                      🎭 Mood Meme (Dank Edition)
                    </Typography>
                    <Paper elevation={2} sx={{ p: 3, background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)', borderRadius: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img 
                          src={analysis.meme.imageUrl} 
                          alt={analysis.meme.caption}
                          style={{ 
                            maxWidth: '100%', 
                            borderRadius: '10px',
                            marginBottom: '1rem'
                          }}
                        />
                        <Typography variant="h6" sx={{ 
                          fontFamily: "'Comic Sans MS', cursive",
                          color: '#FF1493',
                          textAlign: 'center',
                          mb: 1
                        }}>
                          {analysis.meme.caption}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Comic Sans MS', cursive",
                          color: '#666',
                          textAlign: 'center',
                          fontStyle: 'italic'
                        }}>
                          {analysis.meme.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                )}

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ 
                      fontFamily: "'Comic Sans MS', cursive",
                      color: '#FF69B4'
                    }}>
                      🍽️ Food Suggestions (Dank Edition)
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleRefreshSuggestions}
                      disabled={isAnalyzing}
                      sx={{
                        borderColor: '#FF69B4',
                        color: '#FF69B4',
                        '&:hover': {
                          borderColor: '#FF69B4',
                          backgroundColor: '#FF69B411',
                        }
                      }}
                    >
                      Hit Me With Another One 🔄
                    </Button>
                  </Box>
                  {analysis.foodSuggestions && analysis.foodSuggestions.map((suggestion, index) => (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        p: 3,
                        mb: 2,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
                      }}
                    >
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Comic Sans MS', cursive",
                        color: '#FF69B4',
                        mb: 1
                      }}>
                        {suggestion.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, fontFamily: "'Comic Sans MS', cursive" }}>
                        {suggestion.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, fontFamily: "'Comic Sans MS', cursive" }}>
                        <strong>Recipe:</strong> {suggestion.recipe}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          href={suggestion.orderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #FF69B4 0%, #FF69B499 100%)',
                            fontFamily: "'Comic Sans MS', cursive",
                            '&:hover': {
                              background: 'linear-gradient(135deg, #FF69B499 0%, #FF69B4 100%)',
                            }
                          }}
                        >
                          Order Now 🛵
                        </Button>
                        <Button
                          variant="outlined"
                          href={suggestion.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: 3,
                            borderColor: '#FF69B4',
                            color: '#FF69B4',
                            fontFamily: "'Comic Sans MS', cursive",
                            '&:hover': {
                              borderColor: '#FF69B4',
                              background: '#FF69B411',
                            }
                          }}
                        >
                          Watch Recipe 🎥
                        </Button>
                        <Button
                          variant="outlined"
                          href={moodSpotifyPlaylists[mood] || "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: 3,
                            borderColor: '#1DB954',
                            color: '#1DB954',
                            fontFamily: "'Comic Sans MS', cursive",
                            '&:hover': {
                              borderColor: '#1DB954',
                              background: '#1DB95411',
                            }
                          }}
                        >
                          Start Vibin 🎵
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Journal; 