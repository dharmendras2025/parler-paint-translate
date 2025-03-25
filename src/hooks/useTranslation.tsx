
import { useState } from "react";

interface TranslationResult {
  original: string;
  translated: string;
  isLoading: boolean;
  error: string | null;
}

export function useTranslation() {
  const [result, setResult] = useState<TranslationResult>({
    original: "",
    translated: "",
    isLoading: false,
    error: null,
  });

  // Simple dictionary for demo purposes
  // In a real app, you would use an API like Google Translate
  const englishToFrench: Record<string, string> = {
    "hello": "bonjour",
    "goodbye": "au revoir",
    "thank you": "merci",
    "please": "s'il vous plaît",
    "yes": "oui",
    "no": "non",
    "good morning": "bonjour",
    "good evening": "bonsoir",
    "good night": "bonne nuit",
    "how are you": "comment allez-vous",
    "I'm fine": "je vais bien",
    "what's your name": "comment vous appelez-vous",
    "my name is": "je m'appelle",
    "nice to meet you": "enchanté",
    "excuse me": "excusez-moi",
    "I don't understand": "je ne comprends pas",
    "where is": "où est",
    "how much": "combien",
    "I would like": "je voudrais",
    "the bill please": "l'addition s'il vous plaît",
    "delicious": "délicieux",
    "cheers": "santé",
    "welcome": "bienvenue",
    "sorry": "désolé",
    "love": "amour",
    "friend": "ami",
    "family": "famille",
    "today": "aujourd'hui",
    "tomorrow": "demain",
    "yesterday": "hier",
  };

  const translateText = (text: string) => {
    if (!text.trim()) {
      setResult({
        original: "",
        translated: "",
        isLoading: false,
        error: null,
      });
      return;
    }

    setResult({
      original: text,
      translated: "",
      isLoading: true,
      error: null,
    });

    // Simulate API delay
    setTimeout(() => {
      try {
        // For longer text, split by spaces and translate word by word if in dictionary
        const words = text.toLowerCase().split(' ');
        const translatedWords = words.map(word => {
          // Check if the word is in our dictionary
          if (englishToFrench[word]) {
            return englishToFrench[word];
          }
          
          // Check if the entire phrase is in our dictionary
          if (englishToFrench[text.toLowerCase()]) {
            return englishToFrench[text.toLowerCase()];
          }
          
          // If not found, return the original word
          return word;
        });

        setResult({
          original: text,
          translated: translatedWords.join(' '),
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setResult({
          original: text,
          translated: "",
          isLoading: false,
          error: "Translation failed. Please try again.",
        });
      }
    }, 600);
  };

  return {
    translateText,
    result,
  };
}
