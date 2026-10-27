"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import Image from "next/image";
import certImage from "@/assets/docs/cert-image.png";

import uolLogo from "@/assets/images/uol logo.png";

export const EducationAndCertificationSection = () => {
  return (
    <section id="education" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Qualifications"
          title="Education & Certifications"
          description="My academic background and professional certifications."
        />

        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Certifications */}
          <Card className="p-8 md:p-10 transition duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image
                src={certImage}
                alt="Certificate Background"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-100 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md [mask-image:linear-gradient(to_right,black,black_43%,transparent_100%)]"></div>
            </div>
            <div className="relative z-10 drop-shadow-lg">
              <h3 className="font-serif text-2xl mb-6">Certifications</h3>
              <h4 className="text-xl md:text-2xl font-bold font-serif">Supervised Machine Learning Specialization</h4>
              <p className="text-white/60 mt-2">Coursera, Stanford Online, Deeplearning.AI</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 relative z-10">
              <a href="/assets/coursera-cert.pdf" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <button className="bg-white/10 text-white h-12 rounded-xl px-6 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/20 transition border border-white/10 w-full">
                  <span>View Certificate</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </a>
              <a href="https://coursera.org/share/542313d84f1815a93b7e0398c4b8c1fe" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <button className="bg-white text-gray-950 h-12 rounded-xl px-6 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/80 transition w-full">
                  <span>Verify Credential</span>
                  <ArrowUpRightIcon className="size-4" />
                </button>
              </a>
            </div>
          </Card>

          {/* Education */}
          <Card className="p-8 md:p-10 transition duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image
                src={uolLogo}
                alt="UOL Logo Background"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-100 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md [mask-image:linear-gradient(to_right,black,black_34%,transparent_100%)]"></div>
            </div>
            <div className="relative z-10 drop-shadow-lg">
              <h3 className="font-serif text-2xl mb-6">Education</h3>
              <div className="flex flex-col justify-center gap-2">
                <h4 className="text-xl md:text-2xl font-bold font-serif">Bachelor of Science in Software Engineering</h4>
                <p className="text-white/60 mt-2">The University of Lahore</p>
                <p className="text-white/50 text-sm mt-1">February 2023 - May 2027</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
