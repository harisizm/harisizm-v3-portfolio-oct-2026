"use client";
import mindbridgeLogo from "@/assets/images/mindbridge logo.png";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Career History"
          title="Experience"
          description="My professional journey and roles."
        />

        <div className="mt-12 lg:mt-20 flex flex-col gap-8">
          <Card className="p-8 md:p-10 hover:-translate-y-1 transition duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-bold">Chat Support Executive - Mindbridge</h3>
                <span className="text-white/60 text-sm md:text-base block mt-1 mb-4">June 2024 – September 2024</span>
                <p className="text-white/80 md:text-lg">
                  Handled customer, rider, and vendor queries for Talabat, resolving food delivery issues and providing active, empathetic assistance to riders.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center bg-white p-2 rounded-xl border border-white/10 shrink-0 w-32 h-16">
                <Image src={mindbridgeLogo} alt="Mindbridge Logo" className="object-contain w-full h-full" />
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-10 hover:-translate-y-1 transition duration-300">
            <h3 className="font-serif text-xl md:text-2xl font-bold">Email Marketing Manager - SBI International</h3>
            <span className="text-white/60 text-sm md:text-base block mt-1 mb-4">June 2023 – July 2023</span>
            <p className="text-white/80 md:text-lg">
              Researched and identified potential clients, built targeted email lists, crafted tailored pitches, and optimized campaigns to drive engagement for construction projects.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
