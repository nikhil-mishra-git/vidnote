import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiLoader,
    FiYoutube,
    FiLink,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiBookOpen,
    FiMessageSquare,
    FiTarget,
    FiBook,
    FiCopy,
    FiPlayCircle
} from "react-icons/fi";
import { IoCheckmarkCircle, IoSparkles } from "react-icons/io5";
import { generateNotes } from "../../api/apiCalls";
import toast from "react-hot-toast";

const steps = [
    { name: "Fetching Video", icon: <FiPlayCircle /> },
    { name: "Reading Transcript", icon: <FiMessageSquare /> },
    { name: "Extracting Key Points", icon: <FiTarget /> },
    { name: "Generating Summary", icon: <FiFileText /> },
    { name: "Generating Notes", icon: <FiBookOpen /> },
    { name: "Creating MCQs", icon: <FiBook /> },
    { name: "Creating Flashcards", icon: <FiCopy /> }
];

const NewVideo = () => {
    const [url, setUrl] = useState("");
    const [activeStep, setActiveStep] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();

    const handleProcess = async () => {
        if (!url.trim()) return;

        setIsProcessing(true);
        setActiveStep(0);

        let step = 0;
        const interval = setInterval(() => {
            setActiveStep((prev) => {
                if (prev < steps.length - 2) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1200);

        try {

            toast.loading("Creating note...");
            const data = await generateNotes(url);

            clearInterval(interval);

            setActiveStep(steps.length - 1);
            toast.dismiss();
            toast.success("Note created successfully");

            setTimeout(() => {
                navigate(`/dashboard/detail-note/${data.data._id}`);
            }, 600);

        } catch (error) {
            clearInterval(interval);
            toast.error("Something went wrong");

            setIsProcessing(false);
            setActiveStep(-1);
        }
    };

    const handleKeyPress = (e) => { if (e.key === 'Enter' && !isProcessing && url.trim()) { handleProcess(); } };



    return (
        <div className="min-h-[80vh] text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
                        Create New <span className="text-[#24cfa6]">AI Note</span>
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base">
                        Paste a YouTube link to generate notes, flashcards, and quizzes
                    </p>
                </div>

                <div className="absolute z-0 top-45 left-10 md:left-40 w-[200px] md:w-[320px] h-[120px] md:h-[220px] bg-[#24cfa6]/20 blur-[80px] md:blur-[100px] rounded-full"></div>

                {/* Main Input Card */}
                <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiYoutube className="text-[#24cfa6]" size={20} />
                        <label className="text-sm font-medium">YouTube Video Link</label>
                    </div>

                    <div className="flex flex-col md:flex-row w-full gap-3 md:gap-4">

                        {/* INPUT BOX */}
                        <div className="w-full md:w-3/5 flex items-center gap-3 px-3 md:px-4 py-3 md:py-5 bg-black/50 border border-zinc-700 rounded-lg">
                            <FiLink className="text-white" />
                            <input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 bg-transparent outline-none placeholder:text-zinc-500 text-sm md:text-base"
                                placeholder="https://www.youtube.com/watch?v=..."
                                disabled={isProcessing}
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleProcess}
                            disabled={isProcessing || !url.trim()}
                            className="w-full md:w-2/5 bg-[#24cfa6] hover:bg-[#20b895] text-black font-semibold 
                                rounded-lg transition-all duration-200 disabled:opacity-50 
                                disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4 py-3 md:py-3 text-sm md:text-base"
                        >
                            {isProcessing ? (
                                <>
                                    <FiLoader className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FiBookOpen />
                                    Generate Notes
                                </>
                            )}
                        </button>

                    </div>


                    <div className="flex items-center gap-2 mt-3 md:mt-4 text-xs text-zinc-500">
                        <FiClock size={12} />
                        <span>Usually takes 1-2 minutes depending on video length</span>
                    </div>
                </div>

                {/* Steps Progress */}
                {isProcessing && (
                    <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 md:p-6 animate-fadeIn">

                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                            <div className="flex items-center gap-3">
                                <FiLoader className="animate-spin text-[#24cfa6]" />
                                <h2 className="text-base md:text-lg font-semibold">Processing your video</h2>
                            </div>
                            <div className="text-xs md:text-sm bg-zinc-800 px-2 md:px-3 py-1 rounded-full">
                                <span className="text-[#24cfa6]">{activeStep + 1}</span>
                                <span className="text-zinc-400">/{steps.length}</span>
                            </div>
                        </div>

                        {/* Steps List */}
                        <div className="space-y-2 md:space-y-3">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg transition-colors ${activeStep === i ? 'bg-zinc-800/50' : ''
                                        }`}
                                >
                                    <div className="relative">
                                        {activeStep === i ? (
                                            <div className="relative">
                                                <FiLoader className="animate-spin text-[#24cfa6]" size={18} />
                                                <div className="absolute inset-0 bg-[#24cfa6]/10 rounded-full"></div>
                                            </div>
                                        ) : activeStep > i ? (
                                            <IoCheckmarkCircle className="text-[#24cfa6]" size={20} />
                                        ) : (
                                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-zinc-600 flex items-center justify-center">
                                                <span className="text-xs">{step.icon}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <span className={`font-medium text-sm md:text-base ${activeStep >= i ? "text-white" : "text-zinc-500"
                                            }`}>
                                            {step.name}
                                        </span>
                                        {activeStep === i && (
                                            <div className="mt-1 md:mt-2">
                                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#24cfa6] rounded-full animate-pulse"
                                                        style={{ width: '50%' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-zinc-800">
                            <div className="flex justify-between text-xs md:text-sm mb-1 md:mb-2">
                                <span className="text-zinc-400">Overall Progress</span>
                                <span className="text-[#24cfa6] font-medium">
                                    {Math.round(((activeStep + 1) / steps.length) * 100)}%
                                </span>
                            </div>
                            <div className="h-1.5 md:h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#24cfa6] rounded-full transition-all duration-300"
                                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Features */}
                {!isProcessing && (
                    <div className="mt-6 md:mt-8">
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2">
                            <FiCheckCircle className="text-[#24cfa6]" />
                            What you'll get:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                            <div className="flex items-center gap-3 p-2 md:p-3 bg-zinc-800/30 rounded-lg">
                                <FiBookOpen className="text-[#24cfa6] " />
                                <span className="text-xs md:text-sm">Comprehensive Notes</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 md:p-3 bg-zinc-800/30 rounded-lg">
                                <FiCopy className="text-[#24cfa6] " />
                                <span className="text-xs md:text-sm">Flashcards</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 md:p-3 bg-zinc-800/30 rounded-lg">
                                <FiBook className="text-[#24cfa6] " />
                                <span className="text-xs md:text-sm">Quiz Questions</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 md:p-3 bg-zinc-800/30 rounded-lg">
                                <FiFileText className="text-[#24cfa6] " />
                                <span className="text-xs md:text-sm">Video Summary</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-zinc-500">
                    <p>Works best with educational videos that have clear audio and captions</p>
                </div>
            </div>

            {/* Custom Animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default NewVideo;