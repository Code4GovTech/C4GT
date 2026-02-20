import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff } from '@mui/icons-material';
import { IconButton, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleVoiceInput } from '../store/slices/searchSlice';

const VoiceInterface: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    let recognition: any = null;

    if ('webkitSpeechRecognition' in window) {
      recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setTranscript(transcript);
        dispatch(toggleVoiceInput());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language, dispatch]);

  const toggleListening = () => {
    if (isListening) {
      (window as any).webkitSpeechRecognition.stop();
    } else {
      (window as any).webkitSpeechRecognition.start();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={toggleListening}
        color={isListening ? 'secondary' : 'primary'}
        aria-label={isListening ? t('voice.stop') : t('voice.start')}
      >
        {isListening ? <MicOff /> : <Mic />}
      </IconButton>
      {transcript && (
        <Typography variant="body2" color="text.secondary">
          {transcript}
        </Typography>
      )}
    </Box>
  );
};

export default VoiceInterface; 