import React from "react";
import WhyCard from "../utils/WhyCard";

import { LuTimer } from "react-icons/lu";
import { LuBrainCircuit } from "react-icons/lu";
import { LuLanguages } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";

const WhyChoose = () => {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8 lg:px-20 text-center">
      
      <h2 className="font-mono text-4xl md:text-5xl font-bold text-white">
        Why choose <span className="text-[#24cfa6]">AI</span> notes maker ?
      </h2>

      <p className="font-mono text-zinc-400 mt-3 text-sm md:text-base max-w-2xl mx-auto">
        Built for students and professionals who want to learn smarter, not harder
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <WhyCard
          icon={LuTimer}
          title="Lightning Fast"
          description="Generate comprehensive notes from any video in under 60 seconds"
        />

        <WhyCard
          icon={LuBrainCircuit}
          title="AI-Powered Accuracy"
          description="Advanced AI ensures accurate transcription and intelligent summarization"
        />

        <WhyCard
          icon={LuLanguages}
          title="Any Language"
          description="Supports videos in multiple languages with automatic translation"
        />

        <WhyCard
          icon={LuClock3}
          title="Save Hours"
          description="Transform hours of video content into digestible study materials instantly"
        />

      </div>
    </section>
  );
};

export default WhyChoose;
