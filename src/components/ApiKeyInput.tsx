
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("openai_api_key") || "");
  const [isVisible, setIsVisible] = useState(false);
  const [showInput, setShowInput] = useState(!localStorage.getItem("openai_api_key"));

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      toast.success("API key saved");
      setShowInput(false);
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setShowInput(true);
    toast.success("API key removed");
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      {showInput ? (
        <div className="glass-panel rounded-xl overflow-hidden subtle-shadow p-4">
          <h3 className="text-parisNavy font-medium mb-2 text-sm">OpenAI API Key</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Enter your OpenAI API key to enable translation. The key is stored only in your browser.
          </p>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input
                type={isVisible ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full p-2 rounded-lg bg-white/50 border border-parisMuted focus:border-parisBlue focus:ring-1 focus:ring-parisBlue pr-10 text-sm"
              />
              <button
                onClick={toggleVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-parisBlue"
                aria-label={isVisible ? "Hide API key" : "Show API key"}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isVisible ? (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </>
                  ) : (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </button>
            </div>
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2 bg-parisBlue text-white rounded-lg hover:bg-parisBlue/90 transition-colors text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={handleRemoveApiKey}
            className="text-xs text-parisBlue hover:text-parisAccent french-transition flex items-center space-x-1 py-1 px-2"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 16a4 4 0 0 1-4-4V6"></path>
              <path d="M6 8h.01"></path>
              <path d="M12 8a4 4 0 0 1 8 0v6a4 4 0 0 1-4 4h-4"></path>
              <path d="m15 12-6 6"></path>
              <path d="m15 18-6-6"></path>
            </svg>
            <span>Change API Key</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
