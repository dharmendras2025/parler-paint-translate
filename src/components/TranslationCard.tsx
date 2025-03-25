
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

const TranslationCard: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const { translateText, result } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleTranslate = () => {
    if (!localStorage.getItem("openai_api_key")) {
      toast.error("Please enter your OpenAI API key first");
      return;
    }
    
    translateText(inputText);
  };

  const handleCopyToClipboard = () => {
    if (result.translated && navigator.clipboard) {
      navigator.clipboard.writeText(result.translated)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(() => {
          setCopySuccess(false);
        });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-panel rounded-xl overflow-hidden subtle-shadow">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="input-text" className="text-sm font-medium text-parisNavy">
                  English
                </label>
                <span className="text-xs text-muted-foreground">
                  {inputText.length} characters
                </span>
              </div>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  id="input-text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Type your text here..."
                  className="w-full p-4 rounded-lg bg-white/50 border border-parisMuted focus:border-parisBlue focus:ring-1 focus:ring-parisBlue resize-none min-h-[120px] transition-all duration-200"
                  rows={3}
                />
                <button
                  onClick={handleTranslate}
                  className="absolute bottom-3 right-3 px-3 py-1 bg-parisBlue text-white rounded-md hover:bg-parisBlue/90 transition-colors text-xs"
                >
                  Translate
                </button>
              </div>
            </div>
            
            {/* Divider with decorative element */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full h-px bg-parisMuted/30"></div>
              <div className="relative z-10 px-4 py-2 bg-white/50 rounded-full border border-parisMuted/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-parisAccent">
                  <path d="m7 15 5 5 5-5"></path>
                  <path d="m7 9 5-5 5 5"></path>
                </svg>
              </div>
            </div>
            
            {/* Output Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-parisNavy">
                  French
                </label>
                {result.translated && (
                  <button 
                    onClick={handleCopyToClipboard}
                    className="text-xs text-parisBlue hover:text-parisAccent french-transition flex items-center space-x-1"
                  >
                    {copySuccess ? (
                      <span>Copied!</span>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div
                ref={resultRef}
                className={`w-full p-4 rounded-lg bg-white/70 border min-h-[120px] transition-all duration-200 font-medium ${
                  result.error ? "border-red-300" : "border-parisMuted"
                }`}
              >
                {result.isLoading ? (
                  <div className="flex items-center justify-center h-full space-x-2">
                    <div className="w-2 h-2 rounded-full bg-parisBlue animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-parisBlue animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-parisBlue animate-pulse delay-150"></div>
                  </div>
                ) : result.error ? (
                  <p className="text-red-500">{result.error}</p>
                ) : result.translated ? (
                  <p className="text-parisNavy">{result.translated}</p>
                ) : (
                  <p className="text-muted-foreground italic">Translation will appear here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationCard;
