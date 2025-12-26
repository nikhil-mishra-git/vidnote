import React from "react";
import FeatureCard from "../utils/FeatureCard.jsx";

// Icons
import { LuFileText } from "react-icons/lu";
import { LuBrain } from "react-icons/lu";
import { IoHelpCircle } from "react-icons/io5";
import { LuLayers } from "react-icons/lu";

const LearningSection = () => {
    return (
        <section className="py-12 md:py-24 px-4 md:px-8 lg:px-20 text-center">
            {/* Heading */}
            <h2 className="font-mono text-4xl md:text-5xl font-bold text-white">
                Everything you need to learn
            </h2>
            <p className="font-mono text-zinc-400 mt-3 text-sm md:text-base">
                Transform any <span className="text-[#24cfa6]">YouTube</span> video into comprehensive <span className="text-[#24cfa6]">study materials</span>
            </p>

            {/* Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Summary */}
                <FeatureCard
                    icon={LuFileText}
                    title="Summary"
                    description="Get a concise overview of the entire video content in seconds"
                >
                    The video discusses the fundamentals of machine learning, covering
                    supervised and unsupervised learning...
                </FeatureCard>

                {/* Notes */}
                <FeatureCard
                    icon={LuBrain}
                    title="Notes"
                    description="Structured notes organized by topics and timestamps"
                >
                    • Introduction to ML <br />
                    • Types of Learning <br />
                    • Neural Networks 
                </FeatureCard>

                {/* MCQs */}
                <FeatureCard
                    icon={IoHelpCircle}
                    title="MCQs"
                    description="Auto-generated multiple choice questions for self-assessment"
                >
                    Q: What is the main difference between supervised and unsupervised learning?
                </FeatureCard>

                {/* Flashcards */}
                <FeatureCard
                    icon={LuLayers}
                    title="Flashcards"
                    description="Interactive flashcards for quick revision and memorization"
                >
                    Front: Define Machine Learning <br />
                    Back: A subset of AI that enables systems to learn...
                </FeatureCard>

            </div>
        </section>
    );
};

export default LearningSection;
