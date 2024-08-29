"use client"
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
    const nav = useRef(null);
    const [showNav, setShowNav] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition >= 300) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      };
  
      // Attach the scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return(
        <div
        className={`navbar fixed top-0 left-0 w-full bg-white shadow transition-transform duration-500 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'} z-50`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="navbar-header">
            <button className="navbar-toggle block md:hidden text-xl focus:outline-none">
              <i className="fas fa-bars"></i>
            </button>
            <a href="#" className="navbar-brand font-bold text-lg">
               Profile
            </a>
          </div>
          <nav
            id="rock-navigation"
            className="hidden md:flex space-x-6 uppercase"
          >
            <ul className="flex space-x-6">
              <li className="active">
                <a href="#home" className="smoothScroll hover:text-gray-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="smoothScroll hover:text-gray-600">
                  My Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="smoothScroll hover:text-gray-600">
                  Portfolio
                </a>
              </li>
  
              <li>
                <a href="#about" className="smoothScroll hover:text-gray-600">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="smoothScroll hover:text-gray-600">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
}