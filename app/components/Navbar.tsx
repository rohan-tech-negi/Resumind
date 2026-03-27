import {Link} from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current, 
                { y: -80, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.2 }
            );
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none">
            <nav ref={navRef} className="pointer-events-auto w-[90%] max-w-[1200px] glass-panel px-6 py-4 flex flex-row justify-between items-center opacity-0">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-tr from-[#8e98ff] to-[#606beb] p-2 rounded-xl text-white group-hover:scale-105 transition-transform duration-300">
                        <Sparkles size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gradient tracking-tight">RESUMIND</p>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden md:block">
                        How it Works
                    </Link>
                    <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden md:block">
                        Dashboard
                    </Link>
                    <Link to="/upload" className="primary-button w-fit px-6 py-2.5 text-sm font-semibold flex items-center gap-2 group">
                        <span>Upload Resume</span>
                        <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-white transition-colors animate-pulse" />
                    </Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar

