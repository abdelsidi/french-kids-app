import { useState, useCallback, useEffect, useRef } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const frenchVoiceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Try to find a good French voice
        frenchVoiceRef.current = voices.find(voice => 
          voice.lang === 'fr-FR' || voice.lang.startsWith('fr')
        ) || voices.find(voice => 
          voice.name.includes('French') || voice.name.includes('Français')
        );
        setVoicesLoaded(true);
      };

      // Load voices immediately and when they change
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speak = useCallback((text, lang = 'fr-FR') => {
    if (!supported || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.7; // Slower for kids
    utterance.pitch = 1.0;

    // Use French voice if available
    if (frenchVoiceRef.current) {
      utterance.voice = frenchVoiceRef.current;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      setSpeaking(false);
    };

    // Speak
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const cancel = useCallback(() => {
    if (supported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  return { speak, cancel, speaking, supported, voicesLoaded };
}