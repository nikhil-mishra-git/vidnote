import React from "react";

const WhyCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3 hover:border-zinc-700 transition">
      
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
        <Icon className="text-[#24cfa6] text-2xl" />
      </div>

      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default WhyCard;
