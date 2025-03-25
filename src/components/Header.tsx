
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header 
      className={cn(
        "w-full py-6 animate-slide-down", 
        className
      )}
    >
      <div className="container-french">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-parisNavy">
            Le Traducteur
          </div>
          <div className="text-sm text-muted-foreground">
            English to French Translation
          </div>
          <div className="w-16 h-px bg-parisAccent my-2"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
