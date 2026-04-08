"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/service", label: "Services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 9999;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-root.scrolled {
          padding: 0;
        }

        .nav-inner {
          margin: 0 auto;
          max-width: 1280px;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* Glass bar */
        .nav-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: background 0.4s ease, box-shadow 0.4s ease;
          z-index: -1;
        }

        .nav-root.scrolled .nav-bg {
          background: rgba(255,255,255,0.95);
          box-shadow: 0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04);
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .nav-logo:hover { opacity: 0.85; }

        .nav-logo img {
          height: 42px;
          width: auto;
          border-radius: 8px;
          object-fit: contain;
        }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 10px;
          position: relative;
          letter-spacing: 0.01em;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover {
          color: #1d4ed8;
          background: rgba(37,99,235,0.06);
        }

        .nav-link:hover::after { width: 50%; }

        /* CTA Button */
        .nav-cta {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #fff;
          text-decoration: none;
          padding: 9px 22px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          box-shadow: 0 2px 12px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .nav-cta:hover::before { opacity: 1; }

        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .nav-cta:active { transform: translateY(0); }

        .nav-cta span { position: relative; z-index: 1; }

        .nav-cta-arrow {
          position: relative;
          z-index: 1;
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 15px;
        }

        .nav-cta:hover .nav-cta-arrow { transform: translateX(3px); }

        /* Mobile toggle */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          cursor: pointer;
          gap: 5px;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .nav-hamburger:hover { background: rgba(37,99,235,0.08); }

        .ham-bar {
          display: block;
          width: 18px; height: 1.5px;
          background: #374151;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
          transform-origin: center;
        }

        .nav-hamburger.open .ham-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-hamburger.open .ham-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open .ham-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-drawer {
          position: absolute;
          top: 72px; left: 0; right: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          max-height: 0;
          opacity: 0;
        }

        .mobile-drawer.open {
          max-height: 500px;
          opacity: 1;
        }

        .mobile-drawer-inner {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 1rem 1.5rem 1.5rem;
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
        }

        .mobile-links { list-style: none; margin: 0; padding: 0; }

        .mobile-link-item {
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .mobile-drawer.open .mobile-link-item {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-drawer.open .mobile-link-item:nth-child(1) { transition-delay: 0.05s; }
        .mobile-drawer.open .mobile-link-item:nth-child(2) { transition-delay: 0.1s; }
        .mobile-drawer.open .mobile-link-item:nth-child(3) { transition-delay: 0.15s; }
        .mobile-drawer.open .mobile-link-item:nth-child(4) { transition-delay: 0.2s; }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
          margin-bottom: 3px;
        }

        .mobile-nav-link:hover {
          background: rgba(37,99,235,0.07);
          color: #2563eb;
          padding-left: 18px;
        }

        .mobile-nav-link-icon {
          font-size: 12px;
          color: #9ca3af;
          transition: transform 0.2s, color 0.2s;
        }

        .mobile-nav-link:hover .mobile-nav-link-icon {
          transform: translateX(4px);
          color: #2563eb;
        }

        .mobile-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 10px 0;
        }

        .mobile-cta-wrap {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease 0.22s, transform 0.3s ease 0.22s;
        }

        .mobile-drawer.open .mobile-cta-wrap {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-size: 14.5px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .mobile-cta-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.38);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links,
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex; }
        }

        @media (min-width: 769px) {
          .nav-hamburger { display: none; }
          .mobile-drawer { display: none; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-bg" />

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <img src="/BTAKELOGO.jpg" alt="logo" />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop">
            <Link href="/contactus" className="nav-cta">
              <span>Contact Now</span>
              <span className="nav-cta-arrow">→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="ham-bar" />
            <span className="ham-bar" />
            <span className="ham-bar" />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
          <div className="mobile-drawer-inner">
            <ul className="mobile-links">
              {navLinks.map((item) => (
                <li key={item.href} className="mobile-link-item">
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    <span className="mobile-nav-link-icon">›</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-divider" />

            <div className="mobile-cta-wrap">
              <Link
                href="/contactus"
                className="mobile-cta-btn"
                onClick={() => setIsOpen(false)}
              >
                Contact Now
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}