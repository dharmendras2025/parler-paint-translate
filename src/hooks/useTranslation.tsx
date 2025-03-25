
import { useState } from "react";
import { toast } from "sonner";

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
  
  const translateText = async (text: string) => {
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

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("openai_api_key")}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a professional French translator. Translate the provided English text to French. Only respond with the translated text, nothing else."
            },
            {
              role: "user",
              content: text
            }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Translation failed");
      }

      const data = await response.json();
      const translatedText = data.choices[0].message.content.trim();

      setResult({
        original: text,
        translated: translatedText,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Translation error:", error);
      setResult({
        original: text,
        translated: "",
        isLoading: false,
        error: error instanceof Error ? error.message : "Translation failed. Please try again.",
      });
      toast.error("Translation failed. Please check your API key.");
    }
  };

  return {
    translateText,
    result,
  };
}
