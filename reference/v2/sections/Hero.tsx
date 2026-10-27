'use client'; // Required for React hooks in Next.js 13+ App Router
import { Header } from "@/sections/Header";
import memojiImage from '@/assets/images/memoji-computer.png';
import profilePic from '@/assets/images/profile-pic.jpg';
import Image from 'next/image';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import grainIamge from '@/assets/images/grain.jpg';
import StarIcon from '@/assets/icons/star.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg'
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '@/assets/icons/github.svg';
import { HeroOrbit } from '@/components/HeroOrbit';
import { useState, useEffect, useRef } from 'react';
import { smoothScrollTo } from "@/utils/smoothScroll";


export const HeroSection = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isCVHovered, setIsCVHovered] = useState(false);
  const cvTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showCopyToast, setShowCopyToast] = useState(false);

  useEffect(() => {
    if (showCopyToast) {
      const timer = setTimeout(() => setShowCopyToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopyToast]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 100;
      smoothScrollTo(offsetPosition);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'education', 'experience', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // 1. Bottom of page check (Force Contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [previewStyle, setPreviewStyle] = useState({ top: 0, left: 0, transformOrigin: 'bottom center' });
  const cvButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollDismiss = () => {
      if (isCVHovered) {
        setIsCVHovered(false);
        // Clear timeout if scrolling happens during the delay
        if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
      }
    };
    window.addEventListener('scroll', handleScrollDismiss);
    return () => window.removeEventListener('scroll', handleScrollDismiss);
  }, [isCVHovered]);

  const cvEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCVEnter = () => {
    // Clear any existing leave timeout
    if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);

    // Clear any existing enter timeout
    if (cvEnterTimeoutRef.current) clearTimeout(cvEnterTimeoutRef.current);

    if (cvButtonRef.current) {
      const rect = cvButtonRef.current.getBoundingClientRect();
      const pWidth = 380; // Smaller width
      const pHeight = 500; // Smaller height

      let left = 0;
      let top = 0;
      let origin = "bottom right";

      // Check if there is enough space on the left
      if (rect.left > pWidth + 40) {
        // Desktop / Wide screen side-anchor (Left of button)
        left = rect.left - pWidth - 20;
        top = rect.bottom - pHeight;
        origin = "bottom right";
      } else {
        // Mobile / Narrow screen center-above anchor
        left = rect.left + rect.width / 2 - pWidth / 2;
        left = Math.max(10, Math.min(left, window.innerWidth - pWidth - 10));
        top = rect.top - pHeight - 20;
        origin = "bottom center";

        // If top is too tight, place below
        if (rect.top < pHeight + 40) {
          top = rect.bottom + 20;
          origin = "top center";
        }
      }

      setPreviewStyle({
        top,
        left,
        transformOrigin: origin
      });
    }

    setIsCVHovered(true);
  };

  const handleCVLeave = () => {
    // Clear entry timeout if mouse leaves before it triggers
    if (cvEnterTimeoutRef.current) clearTimeout(cvEnterTimeoutRef.current);

    // Standard leave delay to allow moving mouse to the preview
    cvTimeoutRef.current = setTimeout(() => setIsCVHovered(false), 800);
  };

  return (
    <>
      <Header activeSection={activeSection} />
      <div id="home" className='py-24 md:py-32 lg:py-40 relative z-0 overflow-x-clip '>
        {/* Background elements - moved to lower z-index to ensure content is clickable */}
        <div className='absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]'>
          <div
            className='absolute inset-0 -z-30 opacity-5 '
            style={{
              backgroundImage: `url(${grainIamge.src})`
            }}
          ></div>
          <div className='size-[620px] hero-ring '></div>
          <div className='size-[820px] hero-ring '></div>
          <div className='size-[1020px] hero-ring '></div>
          <div className='size-[1220px] hero-ring '></div>

          {/* Orbit elements - ensured they don't interfere with content clickability */}
          <HeroOrbit size={430} rotation={-14} shouldOrbit
            orbitDuration='30s' shouldSpin spinDuration='3s' >
            <SparkleIcon className='size-8 text-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={440} rotation={79} shouldOrbit
            orbitDuration='32s' shouldSpin spinDuration='3s'>
            <SparkleIcon className='size-5 text-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={520} rotation={-41} shouldOrbit
            orbitDuration='34s'>
            <div className='size-2 rounded-full bg-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={530} rotation={178} shouldOrbit
            orbitDuration='36s' shouldSpin spinDuration='3s'>
            <SparkleIcon className='size-10 text-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={550} rotation={20} shouldOrbit
            orbitDuration='38s' shouldSpin spinDuration='6s'>
            <StarIcon className='size-12 text-emerald-300' />
          </HeroOrbit>
          <HeroOrbit size={650} rotation={98} shouldOrbit
            orbitDuration='40s' shouldSpin spinDuration='6s'>
            <StarIcon className='size-8 text-emerald-300' />
          </HeroOrbit>
          <HeroOrbit size={650} rotation={-5} shouldOrbit
            orbitDuration='42s'>
            <div className='size-2 rounded-full bg-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={710} rotation={144} shouldOrbit
            orbitDuration='44s' shouldSpin spinDuration='3s'>
            <SparkleIcon className='size-14 text-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={720} rotation={85} shouldOrbit
            orbitDuration='46s'>
            <div className='size-3 rounded-full bg-emerald-300/20' />
          </HeroOrbit>
          <HeroOrbit size={800} rotation={-72} shouldOrbit
            orbitDuration='48s' shouldSpin spinDuration='6s'>
            <StarIcon className='size-28 text-emerald-300' />
          </HeroOrbit>

        </div>
        {/* Main content */}

        {/* Absolutely Centered Badge */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none'>
          <div className='relative flex items-center justify-center group'>
            {/* Rotating Text Ring */}
            <div className='animate-spin-slow group-hover:pause transition-all duration-300'>
              <svg viewBox="0 0 100 100" width="120" height="120" className="overflow-visible">
                <path
                  id="curve"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-bold uppercase tracking-widest fill-white/80">
                  <textPath href="#curve" startOffset="0%">
                    Available for new projects
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Center Glowing Hub */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-300'>
              <div className='relative size-3 bg-emerald-500 rounded-full'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75'></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

          <div className="flex flex-col md:flex-row items-center gap-20 md:gap-28">

            {/* Left Column (50%) */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

              <h2 className='font-serif text-3xl md:text-5xl tracking-wide max-w-lg'>
                Building Production-Grade Web Apps That Solve Real Problems
              </h2>
              <p className='mt-10 text-white/60 md:text-lg max-w-lg'>
                Full-stack software engineer specializing in MERN, data visualization, and automation. I design, ship, and scale applications used by real users.
              </p>

              <button
                onClick={() => scrollToSection('projects')}
                className='inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl relative z-20 cursor-pointer hover:bg-white/5 transition duration-300 mt-8'
              >
                <span className='font-semibold'>Explore My Work</span>
                <ArrowDown className="size-4" />
              </button>
            </div>

            {/* Right Column (50%) */}
            <div className="flex-1 flex flex-col items-center gap-16">
              <h1 className="font-serif text-4xl md:text-6xl text-center tracking-wide text-white/90">
                Hafiz Muhammad Haris
              </h1>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative size-48 md:size-64 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
                  <Image
                    src={profilePic}
                    alt="Hafiz Muhammad Haris"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>



              <div className='flex flex-col md:flex-row justify-center items-center gap-4 w-full'>
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
                          animate={{ opacity: 1, y: -40, x: -50 }}
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
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                            LinkedIn Profile
                            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                          </div>
                        </motion.a>

                        {/* GitHub */}
                        <motion.a
                          initial={{ opacity: 0, y: 0, x: 0 }}
                          animate={{ opacity: 1, y: 0, x: -70 }}
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
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                            View Repositories
                            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                          </div>
                        </motion.a>

                        {/* Email */}
                        <motion.button
                          initial={{ opacity: 0, y: 0, x: 0 }}
                          animate={{ opacity: 1, y: 40, x: -50 }}
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
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                            Copy my Email
                            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
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
                    className='inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl relative z-20 cursor-pointer hover:bg-gray-200 transition duration-300'
                  >
                    <span className='font-semibold'>Contact Me</span>
                  </button>
                </div>

                <div
                  ref={cvButtonRef}
                  className='relative group cursor-pointer z-20'
                  onMouseEnter={handleCVEnter}
                  onMouseLeave={handleCVLeave}
                  onClick={() => setIsCVModalOpen(true)}
                >
                  {/* Animated Gradient Border Wrapper */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-300 to-sky-400 rounded-xl opacity-40 group-hover:opacity-100 blur-sm transition duration-500 group-hover:duration-200"></div>

                  <div className='relative flex items-center gap-2 bg-gray-950 px-6 h-12 rounded-xl transition duration-300 border border-white/10 group-hover:border-white/20'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 text-emerald-300 group-hover:text-white transition-colors duration-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span className='font-semibold text-white/90 group-hover:text-white transition-colors duration-300'>View My CV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

      {/* CV Preview - Persisted to allow preloading */}
      {/* We keep it mounted but hidden to avoid re-loading the PDF on every hover */}
      <motion.div
        initial={false}
        animate={isCVHovered ? "visible" : "hidden"}
        style={{
          left: previewStyle.left,
          transformOrigin: previewStyle.transformOrigin,
        }}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.3, ease: "easeInOut" },
            transitionEnd: { top: -9999 }
          },
          visible: {
            opacity: 1,
            scale: 1,
            top: previewStyle.top,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        className={`fixed w-[380px] max-w-[calc(100vw-20px)] h-[500px] z-[100] ${isCVHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onMouseEnter={() => {
          if (cvTimeoutRef.current) clearTimeout(cvTimeoutRef.current);
          setIsCVHovered(true);
        }}
        onMouseLeave={handleCVLeave}
      >
        <div className="relative w-full h-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Loading Spinner / Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-white z-0">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>

          <iframe
            src="/assets/docs/cv.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            className="w-full h-full border-none relative z-10 bg-white"
            title="CV Preview"
            scrolling="no"
          />

          {/* Bottom Gradient Overlay (30%) */}
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/40 via-black/10 to-transparent z-15 pointer-events-none"></div>

          {/* Overlay Button - Always Visible */}
          <div className={`absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 z-20 ${isCVHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCVHovered(false);
                setIsCVModalOpen(true);
              }}
              className='relative bg-gray-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-transform active:scale-95 flex items-center gap-2 pointer-events-auto'
            >
              <div className="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-20 duration-1000"></div>
              <span>View Full CV</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Full Screen CV Modal */}
      {
        isCVModalOpen && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsCVModalOpen(false)}
          >
            <div
              className="bg-white w-full h-full md:w-[90%] md:h-[95%] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-serif text-xl font-bold text-gray-900">Curriculum Vitae</h3>
                <div className="flex items-center gap-4">
                  <a
                    href="/assets/docs/cv.pdf"
                    download="Hafiz_Muhammad_Haris_CV.pdf"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                  </a>
                  <button
                    onClick={() => setIsCVModalOpen(false)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-full transition-colors border border-red-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* PDF Viewer */}
              <div className="flex-1 bg-gray-100">
                <iframe
                  src="/assets/docs/cv.pdf"
                  className="w-full h-full"
                  title="Full CV"
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};