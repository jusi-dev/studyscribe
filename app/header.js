"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/studyscribe.png" alt="StudyScribe Logo" width={40} height={40} className="w-auto h-8" />
                        <span className="font-bold text-xl text-gray-900">StudyScribe</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="#features" className="nav-link">Features</Link>
                        <Link href="#pricing" className="nav-link">Pricing</Link>
                        <Link href="/dashboard">
                            <Button className="btn-primary">Get Started</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="nav-link">Home</Link>
                            <Link href="#features" className="nav-link">Features</Link>
                            <Link href="#pricing" className="nav-link">Pricing</Link>
                            <Link href="/dashboard">
                                <Button className="btn-primary w-full">Get Started</Button>
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};
