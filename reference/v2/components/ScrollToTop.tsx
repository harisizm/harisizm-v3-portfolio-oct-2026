'use client';
import { useEffect, useState } from 'react';
import { smoothScrollTo } from "@/utils/smoothScroll";
import ArrowDown from '@/assets/icons/arrow-down.svg';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-8 right-12 md:right-16 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="relative group bg-gray-950 border border-gray-800 p-3 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 rounded-full border border-green-500 animate-ping-large opacity-75"></div>
        <ArrowDown className="size-6 text-emerald-300 transform rotate-180" />
      </button>
    </div>
  );
};
