"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import Image from "next/image";
import mapImage from '@/assets/images/map.png';
import smileMemoji from '@/assets/images/memoji-smile.png';
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import { StripeIcon } from "@/assets/icons/StripeIcon";
import { CloudinaryIcon } from "@/assets/icons/CloudinaryIcon";

const toolboxItems = [
  {
    title: 'JavaScript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    title: 'HTML5',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    title: 'CSS3',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    title: 'React',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    title: 'TypeScript',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    title: 'Python',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    title: 'Tailwind CSS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    title: 'Node.js',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    title: 'MongoDB',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    title: 'MySQL',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    title: 'Express',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    title: 'Vite',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  },
  {
    title: 'Redux',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  },
  {
    title: 'Stripe',
    iconType: StripeIcon,
  },
  {
    title: 'Pandas',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  },
  {
    title: 'Streamlit',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg',
  },
  {
    title: 'Cloudinary',
    iconType: CloudinaryIcon,
  },
  {
    title: 'Vercel',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  },
];

const hobbies = [
  {
    title: 'Sketching',
    emoji: '🎨',
    left: '5%',
    top: '5%',
  },
  {
    title: 'Photography',
    emoji: '📸',
    left: '50%',
    top: '5%',
  },
  {
    title: 'FPV Drones',
    emoji: '🛸',
    left: '35%',
    top: '40%',
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '10%',
    top: '35%',
  },
  {
    title: 'Basketball',
    emoji: '🏀',
    left: '70%',
    top: '45%',
  },
  {
    title: 'Fitness',
    emoji: '🏋️',
    left: '5%',
    top: '65%',
  },
  {
    title: 'Snooker',
    emoji: '🎱',
    left: '45%',
    top: '70%',
  },

]

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me." />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[240px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the classics shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0 relative aspect-[2/3] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/assets/images/crime-and-punishment.png"
                  alt="Crime and Punishment cover"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </Card>
            <Card className="h-[240px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
                className=""
              />
              <ToolboxItems items={toolboxItems}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:60s]"
              />
              <ToolboxItems items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:45s]" />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[200px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6" />
              <div className="relative flex-1" ref=
                {constraintRef}>
                {hobbies.map((hobby) => (

                  <motion.div key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" style={{
                    left: hobby.left,
                    top: hobby.top,
                  }}
                    drag
                    dragConstraints={constraintRef}>
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>

                ))}
              </div>
            </Card>
            <Card className="h-[200px] p-0 relative md:col-span-2 lg:col-span-1">
              <a href="https://www.google.com/maps/place/Lahore,+Punjab,+Pakistan" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image src={mapImage} alt="map"
                  className="h-full w-full object-cover object-left-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full  after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20
            animate-ping [animation-duration:2s]"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                  <Image src={smileMemoji} alt="smiling memoji" className="size-20 p-2 object-contain transform hover:scale-110 transition-transform duration-300" />
                </div>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
