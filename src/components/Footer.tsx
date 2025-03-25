
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-10 pb-6 animate-slide-up">
      <div className="container-french">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-px bg-parisAccent mb-4"></div>
          <p className="text-sm text-muted-foreground text-center">
            Inspired by French architectural design
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} Le Traducteur
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
