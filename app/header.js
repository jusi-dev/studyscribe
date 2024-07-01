"use client"

import { useState } from "react";
import Image from "next/image";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="fixed w-screen z-50">
            {/* Header and Menu Container */}
            <div className={`bg-slate-200 rounded-3xl min-w-[80vw] px-4 flex flex-col items-center mx-8 mt-10 border-b-2 border-prim transition-all duration-300 ease-in-out ${isMenuOpen ? 'py-4' : 'py-2'}`}>
                {/* Header Content */}
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/studyscribe.png" width={75} height={75} />
                        <p className="text-prim font-bold text-2xl">StudyScribe</p>
                    </div>
                    <div onClick={toggleMenu} className="cursor-pointer">
                        {/* Burger Menu Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                {/* Slide-out Menu */}
                <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'} w-full`}>
                    <ul className="mt-2 flex flex-col items-center">
                        <li className="py-2"><a href="#home" className="text-prim font-bold text-lg">Home</a></li>
                        <li className="py-2"><a href="#about" className="text-prim font-bold text-lg">About</a></li>
                        <li className="py-2"><a href="#services" className="text-prim font-bold text-lg">Services</a></li>
                        <li className="py-2"><a href="#contact" className="text-prim font-bold text-lg">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

