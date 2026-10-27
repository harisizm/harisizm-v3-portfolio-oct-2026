import Image from "next/image";
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import GithubIcon from '@/assets/icons/github.svg';
import khilariverseImage from "@/assets/project images/Khilariverse.png";
import transgpaImage from "@/assets/project images/Transgpa.png";
import groceryPosImage from "@/assets/project images/grocery pos.png";
import timetableGeneratorImage from "@/assets/project images/timetable generator.png";
import zayrImage from "@/assets/project images/zayr.png";
import zayrahImage from "@/assets/project images/zayrah.png";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "",
    year: "Jan 2026",
    title: "TransGPA: Academic Transcript Analyzer & CGPA Simulator",
    results: [
      { title: "Built a privacy-first transcript analyzer used by 100+ students, enabling real-time GPA simulations across multiple semesters" },
      { title: "Visualized 4+ academic performance metrics using Recharts dashboards" },
      { title: "Parsed academic PDFs locally in <2 seconds, ensuring zero server-side data storage" },
    ],
    link: "https://trans-gpa-uol.vercel.app",
    github: "https://github.com/harisizm/TransGpa",
    image: transgpaImage,
    techStack: [
      { name: "React", icon: "react-original" },
      { name: "TypeScript", icon: "typescript-original" },
      { name: "Tailwind", icon: "tailwindcss-original" },
      { name: "Vite", icon: "vitejs-original" },
    ],
  },
  {
    company: "",
    year: "Aug 2025",
    title: "Timetable Generator FOR UOL SE Department",
    results: [
      { title: "Developed a Python-based timetable generator used by 60+ students with smart semester/section filtering" },
      { title: "Implemented curriculum cross-checking and shareable image output using Streamlit and Matplotlib" },
      { title: "Automated schedule parsing ensure 100% accuracy from university Excel sheets" },
    ],
    link: "https://timetable-generator-uol-se.streamlit.app",
    github: "https://github.com/harisizm/Timetable_Generator_UOL_deployed",
    image: timetableGeneratorImage,
    techStack: [
      { name: "Python", icon: "python-original" },
      { name: "Pandas", icon: "pandas-original" },
      { name: "Plotly", icon: "plotly-original" },
    ],
  },
  {
    company: "",
    year: "Dec 2025",
    title: "Khilariverse: E-commerce Gaming Peripherals Store",
    results: [
      { title: "Developed a full-stack MERN platform supporting 100+ products and role-based access for admins and users" },
      { title: "Implemented 5+ admin analytics modules for sales, inventory, and order tracking" },
      { title: "Integrated Cloudinary and Nodemailer, automating 100% of image storage and transactional emails" },
    ],
    link: "https://khilariverse.vercel.app",
    github: "https://github.com/harisizm/Khilariverse",
    image: khilariverseImage,
    techStack: [
      { name: "MongoDB", icon: "mongodb-original" },
      { name: "Express", icon: "express-original" },
      { name: "React", icon: "react-original" },
      { name: "Node.js", icon: "nodejs-original" },
      { name: "Redux", icon: "redux-original" },
    ],
  },
  {
    company: "",
    year: "Dec 2025",
    title: "Grocery Store Management System (POS)",
    results: [
      { title: "Developed a full-featured web-based POS and inventory system with real-time sales processing" },
      { title: "Implemented inventory, product, and customer management with low-stock alerts and automated updates" },
      { title: "Designed a normalized relational database in MySQL to ensure data integrity and efficient querying" },
    ],
    link: "#",
    github: "https://github.com/harisizm/GROCERY-POS-SYSTEM",
    image: groceryPosImage,
    techStack: [
      { name: "React", icon: "react-original" },
      { name: "Node.js", icon: "nodejs-original" },
      { name: "MySQL", icon: "mysql-original" },
      { name: "Express", icon: "express-original" },
    ],
  },
  {
    company: "",
    year: "May 2025",
    title: "Zayrah: E-commerce Grocery Shopping Website",
    results: [
      { title: "Built a full-stack e-commerce platform with React, Node, Express, MongoDB, and Stripe payments" },
      { title: "Implemented authentication and role-based access (users, sellers, admins) with JWT and product management" },
      { title: "Designed a responsive, mobile-friendly UI and integrated real-time APIs for seamless seller experiences" },
    ],
    link: "https://zayrah-by-harisizm.vercel.app",
    github: "https://github.com/harisizm/Zayrah",
    image: zayrahImage,
    techStack: [
      { name: "MongoDB", icon: "mongodb-original" },
      { name: "Node.js", icon: "nodejs-original" },
      { name: "React", icon: "react-original" },
      { name: "Tailwind", icon: "tailwindcss-original" },
    ],
  },
  {
    company: "",
    year: "April 2025",
    title: "Zayr: E-commerce Clothing Brand Website",
    results: [
      { title: "Built with React and React Router featuring customized CSS styling" },
      { title: "Implemented product listing by categories and smooth navigation with functional routing" },
      { title: "Developed functional Cart and login/signup pages for a complete retail flow" },
    ],
    link: "https://zayrbyharisizm.vercel.app",
    github: "https://github.com/harisizm/Zayr_by_Harisizm",
    image: zayrImage,
    techStack: [
      { name: "React", icon: "react-original" },
      { name: "HTML5", icon: "html5-original" },
      { name: "CSS3", icon: "css3-original" },
      { name: "JavaScript", icon: "javascript-original" },
    ],
  },
];

const TechIcon = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="group/tech relative">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-950/90 text-white text-[10px] rounded opacity-0 group-hover/tech:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 border border-white/10 backdrop-blur-md shadow-xl translate-y-2 group-hover/tech:translate-y-0">
        {name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950/90"></div>
      </div>
      <Image
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.split('-')[0]}/${icon}.svg`}
        alt={name}
        width={32}
        height={32}
        className="size-8 object-contain opacity-70 group-hover/tech:opacity-100 transition-all duration-300 group-hover/tech:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
      />
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 pt-24 lg:pt-32 md:pt-28">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="A showcase of production-ready applications combining data, automation, and modern web tech."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12 md:mt-20">
          {portfolioProjects.map((project) => (
            <Card
              key={project.title}
              className="group flex flex-col h-full bg-gray-950/40 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden relative"
            >
              <div className="flex flex-col h-full relative z-10">
                {/* Background Image Expansion Effect */}
                <div className="absolute top-0 left-0 w-full h-56 -z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/40 to-gray-950/95 z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000 blur-[3px] group-hover:blur-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="px-6 pt-8 pb-8 flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-[10px] text-transparent bg-clip-text">
                      <span>{project.company}</span>
                      <span>&bull;</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl mt-3 md:text-2xl leading-tight min-h-[60px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-4 relative z-20">
                    {project.techStack.map((tech) => (
                      <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>

                  {/* Main Display Image */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-6 border border-white/10 shadow-2xl group-hover:border-emerald-500/20 transition-all duration-500">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <hr className="border-t border-white/5 my-6" />

                  <ul className="flex flex-col gap-3 flex-grow">
                    {project.results.map((result) => (
                      <li key={result.title} className="flex gap-2 text-sm leading-relaxed text-white/80">
                        <CheckCircleIcon className="size-4 shrink-0 text-emerald-400 mt-1" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <button className="bg-white/5 text-white h-11 w-full rounded-xl font-bold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300 border border-white/10 backdrop-blur-md shadow-lg group/btn">
                        <GithubIcon className="size-5 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm">GitHub</span>
                      </button>
                    </a>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <button className="bg-emerald-500/10 text-emerald-400 h-11 w-full rounded-xl font-bold inline-flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20 backdrop-blur-md shadow-lg group/btn">
                        <span className="text-sm">Live Demo</span>
                        <ArrowUpRightIcon className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};