
import React from "react";
import Header from "@/components/Header";
import TranslationCard from "@/components/TranslationCard";
import Footer from "@/components/Footer";
import ApiKeyInput from "@/components/ApiKeyInput";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-parisCream">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-parisBlue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-parisAccent/5 rounded-full blur-3xl"></div>
        
        {/* Architectural element - subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          <div className="container-french">
            <ApiKeyInput />
            <TranslationCard />
            
            {/* Additional information */}
            <div className="mt-12 max-w-xl mx-auto text-center animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
              <h2 className="font-serif text-xl text-parisNavy mb-3">About This Translator</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This elegant translator is designed with the principles of French architecture in mind – 
                simplicity, symmetry, and attention to detail. The interface reflects the 
                clean lines and subtle ornamentation found in classic French design.
                Powered by OpenAI's GPT-4o for accurate translations.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
