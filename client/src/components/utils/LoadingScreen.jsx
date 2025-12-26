import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LoadingScreen = ({ onComplete }) => {
    const overlayRef = useRef(null);
    const textRef = useRef(null);
    const counterValue = useRef({ value: 0 });
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const letters = textRef.current.querySelectorAll("span");

        const tl = gsap.timeline({
            onComplete: () => onComplete && onComplete(),
        });

        gsap.to(counterValue.current, {
            value: 100,
            duration: 3.2,
            ease: "power2.out",
            onUpdate: () => {
                setCounter(Math.round(counterValue.current.value));
            },
        });

        tl.to(overlayRef.current, {
            scaleY: 1,
            transformOrigin: "top",
            duration: 0.9,
            ease: "expo.inOut",
        })
            .fromTo(
                letters,
                {
                    y: 80,
                    opacity: 0,
                    rotateX: -90,
                    filter: "blur(10px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.08,
                    ease: "power4.out",
                },
                "-=0.4"
            )
            .to(
                letters,
                {
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.6"
            )
            .to(
                letters,
                {
                    y: -60,
                    opacity: 0,
                    rotateX: 90,
                    filter: "blur(8px)",
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power3.inOut",
                },
                "+=0.3"
            )
            .to(overlayRef.current, {
                scaleY: 0,
                transformOrigin: "bottom",
                duration: 0.9,
                ease: "expo.inOut",
            });
    }, [onComplete]);

    const brand = "VidNote AI".split("").map((char, i) => (
        <span key={i} className="inline-block">
            {char === " " ? "\u00A0" : char}
        </span>
    ));

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#101010] overflow-hidden">

            {/* ===== BACKGROUND BLOBS (same as landing) ===== */}
            <div className="absolute -top-40 left-1/3 -translate-x-1/2 -z-10">
                <div className="w-[120px] md:w-[260px] h-[320px] md:h-[450px] bg-[#24cfa6] rotate-45 rounded-[50%] blur-[60px] md:blur-[100px] opacity-25"></div>
            </div>

            <div className="absolute -top-32 left-3/5 -translate-x-1/2 -z-10">
                <div className="w-[80px] md:w-[240px] h-[260px] md:h-[360px] bg-[#24cfa6] -rotate-45 rounded-[50%] blur-[60px] md:blur-[90px] opacity-25"></div>
            </div>

            <div className="absolute top-1/2 -right-40 translate-x-1/2 -z-10">
                <div className="w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-[#24cfa6] rounded-full blur-[90px] opacity-20"></div>
            </div>

            <div className="absolute bottom-20 -left-40 translate-x-1/2 -z-10">
                <div className="w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-[#24cfa6] rounded-full blur-[90px] opacity-20"></div>
            </div>

            {/* ===== GSAP OVERLAY ===== */}
            <div
  ref={overlayRef}
  className="absolute inset-0 bg-transparent scale-y-0 origin-top backdrop-blur-sm"
/>


            {/* ===== BRAND TEXT ===== */}
            <h1
                ref={textRef}
                className="
        relative z-10 font-bold tracking-tight text-white
        text-[14vw] sm:text-[10vw] md:text-[6vw]
      "
                style={{ fontFamily: "Satoshi, sans-serif" }}
            >
                {brand}
            </h1>

            {/* ===== COUNTER ===== */}
            <span
                className="
        absolute bottom-6 right-6 z-20 text-[#24cfa6]
        text-[3.5rem] sm:text-[4rem] md:text-[4.5rem]
      "
                style={{ fontFamily: "Birthstone, cursive" }}
            >
                {counter}%
            </span>
        </div>
    );

};

export default LoadingScreen;
