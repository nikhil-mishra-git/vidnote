import React from "react";

const FeatureCard = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-zinc-700 transition">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
        <Icon className="text-[#24cfa6] text-2xl" />
      </div>

      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

      {/* Preview Box */}
      <div className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-4 text-zinc-400 text-sm font-mono">
        {children}
      </div>
    </div>
  );
};

export default FeatureCard;
