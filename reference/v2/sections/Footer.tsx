"use client";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';

const footerLinks = [
  {
    title: 'My Resume',
    href: '/assets/docs/cv.pdf',
  },
  {
    title: 'Github',
    href: 'https://github.com/harisizm',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/harisizm',
  },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1600px] h-[400px] z-0 pointer-events-none">
        <div className="h-full w-full bg-emerald-300/30 
          [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]" />
      </div>

      {/* ✅ Main footer content stays on top */}
      <div className="container relative z-10">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">
            &copy; 2026. All rights reserved - Haris
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map(link => (
              <a
                href={link.href}
                key={link.title}
                className="inline-flex items-center gap-1.5 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
