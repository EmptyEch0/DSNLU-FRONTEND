
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const NOTICES = [
  "Admissions Open for 2025–26 Batch – Apply Now",
  "Guest Lecture on Constitutional Law – 22 July 2025",
  "Three Day Residential Legal Programme – June 12–14",
  "NAAC Grade ‘A’ Accreditation Achieved",
  "Inter-University Sports Fest Registrations Open",
];

export function NotificationTicker() {
  return (
    <div className="sticky top-[80px] z-40 flex h-12 w-full items-center overflow-hidden border-b border-white/5 bg-gradient-to-r from-navy-dark via-navy to-navy-dark text-ivory shadow-md">
      {/* Label Section */}
      <div className="relative z-20 flex h-full min-w-[140px] items-center justify-center gap-2 bg-gold px-4 text-navy shadow-[4px_0_15px_rgba(0,0,0,0.3)] md:min-w-[180px]">
        <Bell className="h-4 w-4 animate-pulse md:h-5 md:w-5" />
        <span className="text-xs font-bold uppercase tracking-wider md:text-sm">
          Latest Notices
        </span>
        {/* Slanted Edge Effect */}
        <div className="absolute right-[-12px] top-0 h-full w-6 origin-bottom-left skew-x-[20deg] bg-gold" />
      </div>

      {/* Scrolling Content Container */}
      <div className="group relative flex h-full flex-1 items-center overflow-hidden">
        {/* Left Fade Overlay */}
        <div className="absolute left-0 z-10 h-full w-8 bg-gradient-to-r from-navy-dark to-transparent" />

        {/* Scrolling Ticker Track */}
        <div 
          className="flex animate-ticker items-center gap-12 whitespace-nowrap pl-4 hover:[animation-play-state:paused]"
        >
          {/* Duplicate content to ensure seamless loop */}
          {[...NOTICES, ...NOTICES, ...NOTICES].map((notice, index) => (
            <Link
              key={`${notice}-${index}`}
              to="#"
              className="flex items-center text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-gold hover:underline md:text-base"
            >
              <span className="mr-3 h-1.5 w-1.5 rounded-full bg-gold/70" />
              {notice}
            </Link>
          ))}
        </div>

        {/* Right Fade Overlay */}
        <div className="absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-navy-dark to-transparent" />
      </div>

      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          .animate-ticker {
            animation: ticker 40s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
