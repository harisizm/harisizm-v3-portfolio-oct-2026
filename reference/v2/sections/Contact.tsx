'use client';
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import GithubIcon from '@/assets/icons/github.svg';
import grainImage from '@/assets/images/grain.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export const ContactSection = () => {
  const [isContactHovered, setIsContactHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  useEffect(() => {
    if (showCopyToast) {
      const timer = setTimeout(() => setShowCopyToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopyToast]);

  return (
    <div id="contact" className='py-16 pt-12 lg:py-24 lg:pt-20'>
      <div className='container'>
        <div className='text-gray-900 py-8 px-10 text-center md:text-left relative z-0'>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-3xl overflow-hidden -z-10">
            <div
              className='absolute inset-0 opacity-5'
              style={{ backgroundImage: `url(${grainImage.src})` }}
            ></div>
          </div>
          <div className='flex flex-col md:flex-row gap-8 md:gap-16 items-center'>
            <div>
              <h2 className='font-serif text-2xl md:text-3xl'>
                Lets create something amazing together
              </h2>
              <p className='text-sm md:text-base mt-2'>
                Ready to bring your next project to life? Let’s connect and discuss how I can help you achieve your goals.
              </p>
            </div>
            <div
              className="relative z-50"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                setIsContactHovered(true);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = setTimeout(() => {
                  setIsContactHovered(false);
                }, 500);
              }}
            >
              <AnimatePresence>
                {isContactHovered && (
                  <>
                    {/* LinkedIn */}
                    <motion.a
                      initial={{ opacity: 0, y: 0, x: 0 }}
                      animate={{ opacity: 1, y: -40, x: 175 }}
                      exit={{ opacity: 0, y: 0, x: 0 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                      href="https://www.linkedin.com/in/harisizm"
                      target="_blank"
                      className="absolute left-0 top-0 size-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10 group"
                    >
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 duration-1000"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>

                      {/* Tooltip */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                        LinkedIn Profile
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </motion.a>

                    {/* GitHub */}
                    <motion.a
                      initial={{ opacity: 0, y: 0, x: 0 }}
                      animate={{ opacity: 1, y: 0, x: 205 }}
                      exit={{ opacity: 0, y: 0, x: 0 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      href="https://github.com/harisizm"
                      target="_blank"
                      className="absolute left-0 top-0 size-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10 group"
                    >
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 duration-1000 delay-100"></div>
                      <GithubIcon className="size-5" />

                      {/* Tooltip */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                        View Repositories
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </motion.a>

                    {/* Email */}
                    <motion.button
                      initial={{ opacity: 0, y: 0, x: 0 }}
                      animate={{ opacity: 1, y: 40, x: 175 }}
                      exit={{ opacity: 0, y: 0, x: 0 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      onClick={() => {
                        navigator.clipboard.writeText('haris687.chohan@gmail.com');
                        setShowCopyToast(true);
                      }}
                      className="absolute left-0 top-0 size-12 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10 group"
                    >
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 duration-1000 delay-200"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>

                      {/* Tooltip */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                        Copy my Email
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Toast Notification */}
              <AnimatePresence>
                {showCopyToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, x: "-50%" }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-3 border border-gray-700"
                  >
                    <div className="flex items-center justify-center size-5 bg-green-500 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="font-semibold text-sm">Email copied to clipboard</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className='text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-950 cursor-pointer hover:bg-gray-800 relative z-20'
              >
                <span className='font-semibold'>Hire me</span>
                <ArrowUpRightIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
