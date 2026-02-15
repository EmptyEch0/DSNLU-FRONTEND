import {
  Building2, BookOpen, Users, UserCheck, GraduationCap, FileText,
  Library, ClipboardList, Scale, FlaskConical, Landmark, Award,
  Briefcase, ShieldCheck, ScrollText, Globe, Newspaper, Archive,
  Eye, Target, BadgeCheck, Gavel, HandshakeIcon, BookMarked,
  Database, Monitor, Wifi, BookCopy, CalendarDays, Bell,
  UserPlus, HelpCircle, Home as HomeIcon, Phone, Heart,
  AlertTriangle, Home, Info, Lightbulb, Microscope, Ship, Leaf,
  type LucideIcon,
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  secondaryAction?: {
    label: string;
    href: string;
  };
  isHeader?: boolean;
  subItems?: SubMenuItem[];
}

export interface SubMenuGroup {
  heading: string;
  items: SubMenuItem[];
}

export interface NavItem {
  label: string;
  href: string;
  groups?: SubMenuGroup[];
}

export const utilityLinks = [
  { label: "Tender", href: "https://dsnlu.ac.in/storage/2024/06/Mess-Tender-Document-2024.pdf" },
  { label: "NIRF", href: "#nirf" },
  { label: "CLAT 2024", href: "https://consortiumofnlus.ac.in/clat-2024/" },
  { label: "Contact", href: "/contact-us" },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About DSNLU",
    href: "/about",
    groups: [
      {
        heading: "University",
        items: [
          { label: "About the University", href: "/about?tab=overview", icon: Building2 },
          { label: "Logo & Motto", href: "/about?tab=logo-motto", icon: Award },
          { label: "DSNLU Act", href: "/about?tab=dsnlu-act", icon: Scale },
          { label: "DSNLU Service Regulations", href: "/about?tab=service-regulations", icon: ScrollText },
          { label: "Vision & Mission", href: "/about?tab=vision", icon: Eye },
          { label: "Objectives", href: "/about?tab=objectives", icon: Target },
        ],
      },
      {
        heading: "Leadership & Governance",
        items: [
          { label: "Visitor", href: "/visitor", icon: Landmark },
          { label: "Chancellor", href: "/chancellor", icon: UserCheck },
          { label: "Vice-Chancellor", href: "/vice-chancellor", icon: UserCheck },
          { label: "Registrar", href: "/registrar", icon: ClipboardList },
          { label: "Authorities", href: "#", isHeader: true },
          { label: "General Council", href: "/general-council" },
           { label: "Executive Council", href: "/executive-council" },
           { label: "Academic Council", href: "/academic-council" },
           { label: "Planning & Monitoring Board", href: "/planning-board" },
           { label: "Finance Committee", href: "/finance-committee" },
           { label: "Infrastructure Monitoring & Development Committee", href: "/infrastructure-committee" },
        ],
      },
      {
        heading: "Compliance & Media",
        items: [
          { label: "BCI Affiliation", href: "/bci-affiliation", icon: BadgeCheck },
          { label: "IQAC", href: "/iqac", icon: ShieldCheck },
          { label: "RTI Act", href: "/rti-act", icon: ScrollText },
          { label: "DSNLU in News", href: "/news", icon: Newspaper },
          { label: "Archives", href: "/archives", icon: Archive },
        ],
      },
    ],
  },
  {
    label: "People",
    href: "#people",
    groups: [
      {
        heading: "Our People",
        items: [
          { label: "Administration", href: "/about#leadership-governance", icon: ClipboardList },
          { label: "Faculty", href: "/people/faculty", icon: Users },
          { label: "Professor Emeritus", href: "/people/professor-emeritus", icon: Award },
          { label: "Officers & Staff", href: "/people/officers-staff", icon: Briefcase },
        ],
      },
    ],
  },
  {
    label: "Academics",
    href: "#academics",
    groups: [
      {
        heading: "Courses",
        items: [
          {
            label: "B.A. LL.B. (Hons.)",
            href: "/courses/ba-llb",
            icon: GraduationCap,
            secondaryAction: { label: "Regulations", href: "https://dsnlu.ac.in/storage/2023/12/Ph.D-Regulations_.pdf" } // Assuming generic for now or specific if provided
          },
          {
            label: "3 Year LL.B.",
            href: "/courses/llb",
            icon: GraduationCap,
            secondaryAction: { label: "Regulations", href: "#" }
          },
          {
            label: "LL.M.",
            href: "/courses/llm",
            icon: GraduationCap,
            secondaryAction: { label: "Regulations", href: "#" }
          },
          {
            label: "Ph.D.",
            href: "https://dsnlu.ac.in/storage/2023/12/Ph.D-Regulations_.pdf",
            icon: BookOpen,
            secondaryAction: { label: "Regulations", href: "https://dsnlu.ac.in/storage/2023/12/Ph.D-Regulations_.pdf" }
          },
          {
            label: "LL.D.",
            href: "https://dsnlu.ac.in/storage/2023/12/LL.D.-Regulations_.pdf",
            icon: BookOpen,
            secondaryAction: { label: "Regulations", href: "https://dsnlu.ac.in/storage/2023/12/LL.D.-Regulations_.pdf" }
          },
          {
            label: "Membership",
            href: "/academics/membership",
            icon: Users,
          },
        ],
      },
      {
        heading: "Affairs & Examinations",
        items: [
          { label: "5 Year B.A. LL.B. (Hons.) Calendar", href: "https://dsnlu.ac.in/storage/2025/06/Academic-Calendar-5Year-BA-LLB-Hons-2025-26.pdf", icon: CalendarDays },
          { label: "3 Year LL.B. Calendar", href: "https://dsnlu.ac.in/storage/2025/07/3-LL.B.-Academic-Calendar-2025-26.pdf", icon: CalendarDays },
          { label: "One Year LL.M. Calendar", href: "https://dsnlu.ac.in/storage/2025/07/One-Year-LL.M.-Academic-Calendar-2025-26.pdf", icon: CalendarDays },
          { label: "Examination Rules", href: "https://dsnlu.ac.in/storage/2023/01/2.EXAM-RULES-DSNLU-2018.pdf", icon: FileText },
          { label: "Examination Regulations", href: "https://dsnlu.ac.in/storage/2022/12/EXAMINATION-regulations-Final-1.pdf", icon: FileText },
          { label: "Examination Results", href: "/academics/examination-results", icon: FileText },
          { label: "Certificate Verification", href: "/academics/certificate-verification", icon: BadgeCheck },
        ],
      },
    ],
  },
  {
    label: "Centres",
    href: "#research",
    groups: [
      {
        heading: "Specialized Centres I",
        items: [
          {
            label: "Centre for ADR",
            href: "#adr",
            icon: FlaskConical,
            subItems: [
              { label: "About Centre", href: "/centres/adr/about" },
              { label: "Blog", href: "/centres/adr/blog" },
            ],
          },
          {
            label: "Centre for Women and Child Law",
            href: "#women-child-law",
            icon: Scale,
            subItems: [
              { label: "About Centre", href: "/centres/cwcl/about" },
              { label: "CWCL Events", href: "/centres/cwcl/events" },
            ],
          },
          {
            label: "Corporate Legal Research",
            href: "#corporate-legal",
            icon: Briefcase,
            subItems: [
              { label: "About Centre", href: "/centres/clr/about" },
              { label: "Research Activities", href: "/centres/clr/research" },
            ],
          },
          {
            label: "Legal Incubation Centre (LIC)",
            href: "#lic",
            icon: Lightbulb,
            subItems: [
              { label: "About Centre", href: "/centres/lic/about" },
              { label: "Events", href: "/centres/lic/events" },
            ],
          },
          {
            label: "Centre for Intellectual Property Rights & Technology (CIPR&T)",
            href: "#ipr-tech",
            icon: Microscope,
            subItems: [
              { label: "About CIPR", href: "/centres/cipr/about" },
              { label: "Journal & Publications", href: "/centres/cipr/journal" },
              { label: "IPR Editorial & Advisory Board", href: "/centres/cipr/board" },
            ],
          },
          {
            label: "Ambedkar Centre",
            href: "#ambedkar-centre",
            icon: Scale,
            subItems: [{ label: "About Centre", href: "/centres/ambedkar/about" }],
          },
          {
            label: "Criminal Justice and Administration",
            href: "#criminal-justice",
            icon: Gavel,
            subItems: [{ label: "About Centre", href: "/centres/criminal-justice/about" }],
          },
        ],
      },
      {
        heading: "Specialized Centres II",
        items: [
          {
            label: "Centre for Maritime, Admiralty & Navigation Laws (C-MAN)",
            href: "#c-man",
            icon: Ship,
            subItems: [
              { label: "About Centre", href: "/centres/cman/about" },
              { label: "Recent Events", href: "/centres/cman/events" },
            ],
          },
          {
            label: "Environmental Law and Climate Justice",
            href: "#environmental-law",
            icon: Leaf,
            subItems: [{ label: "About Centre", href: "/centres/environment/about" }],
          },
          {
            label: "Law and Public Policy",
            href: "#law-public-policy",
            icon: Landmark,
            subItems: [
              { label: "About Centre", href: "/centres/public-policy/about" },
              { label: "Brochure", href: "/centres/public-policy/about" },
            ],
          },
          {
            label: "Law and Literature",
            href: "#law-literature",
            icon: BookOpen,
            subItems: [{ label: "About Centre", href: "/centres/law-literature/about" }],
          },
          {
            label: "Human Rights & Duties",
            href: "#human-rights",
            icon: Scale,
            subItems: [{ label: "About Centre", href: "/centres/human-rights/about" }],
          },
          {
            label: "Centre for International Law and Allied Disciplines (CILAD)",
            href: "#cilad",
            icon: Globe,
            subItems: [
              { label: "About CILAD", href: "/centres/cilad/about" },
              { label: "Current Initiatives", href: "/centres/cilad/initiatives" },
              { label: "Blog Submission", href: "/centres/cilad/blog" },
            ],
          },
          {
            label: "Fashion, Media and Entertainment Laws",
            href: "#fashion-media-laws",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
          {
            label: "Banking and Finance Law & Policy",
            href: "#banking-finance",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
          {
            label: "Sports Law & Policy Centre",
            href: "#sports-law",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
          {
            label: "Training, Research and Innovation in Advocacy & Litigation (C-TRIAL)",
            href: "#c-trial",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
          {
            label: "Centre for Aviation and Space Laws (CAS-L)",
            href: "#cas-l",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
          {
            label: "International Centre for MSMEs (ICMSME)",
            href: "#icmsme",
            icon: FlaskConical,
            subItems: [{ label: "About Centre", href: "#about" }],
          },
        ],
      },
    ],
  },
  {
    label: "Publications",
    href: "#publications",
    groups: [
      {
        heading: "PUBLICATIONS",
        items: [
          { label: "Publications", href: "/academics/publications/overview", icon: BookMarked },
          {
            label: "Journals",
            href: "#",
            icon: Newspaper,
            subItems: [
              { label: "DSNLU Journal of Science, Technology and Law", href: "/academics/journals/science-technology-law" },
              { label: "We the People DSNLU Journal of Social Sciences", href: "#" },
              { label: "Damodaram Sanjivayya National Law Journal (DSNLJ)", href: "#" },
              { label: "JALAF- CADR", href: "#" },
            ],
          },
          { label: "WAVES News-Letter", href: "/academics/publications/waves", icon: Newspaper },
        ],
      },
    ],
  },
  {
    label: "Compliance & Infrastructure",
    href: "#compliance-infrastructure",
    groups: [
      {
        heading: "Complaints",
        items: [
          { label: "Complaints", href: "/compliance-infrastructure/complaints", icon: AlertTriangle },
          { label: "UGC-Grievance Redressal", href: "/compliance-infrastructure/ugc-grievance", icon: ShieldCheck },
          { label: "Anti Ragging Contact Details", href: "/compliance-infrastructure/anti-ragging", icon: ShieldCheck },
        ],
      },
      {
        heading: "Infrastructure",
        items: [
          { label: "Infrastructure", href: "/compliance-infrastructure/infrastructure", icon: Building2 },
          { label: "Guest House", href: "/compliance-infrastructure/infrastructure/guest-house", icon: Home },
        ],
      },
    ],
  },
  {
    label: "Library",
    href: "#library",
    groups: [
      {
        heading: "Library Info",
        items: [
          { label: "Library Info", href: "/library/info", icon: Info },
          { label: "About Library", href: "/library/about", icon: Library },
          { label: "Library Regulations", href: "/library/regulations", icon: ScrollText },
          { label: "Anti-Plagiarism Software (Turnitin)", href: "/library/turnitin", icon: ShieldCheck },
          { label: "OPAC", href: "/library/opac", icon: Monitor },
          { label: "Remote Access (Knimbus)", href: "/library/knimbus", icon: Wifi },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "Print Resources", href: "/library/resources/print", icon: BookCopy },
          { label: "E-Journals", href: "/library/resources/journals", icon: Globe },
          { label: "E-Books", href: "/library/resources/books", icon: BookOpen },
          { label: "Databases", href: "/library/resources/databases", icon: Database },
        ],
      },
    ],
  },
  {
    label: "Students",
    href: "#students",
    groups: [
      {
        heading: "Student Services",
        items: [
          { label: "Placement & Internship", href: "/students/placement-internship", icon: Briefcase },
          { label: "Student Code of Conduct", href: "/students/student-code-of-conduct", icon: ScrollText },
          { label: "Student Welfare Cell", href: "/students/student-welfare-cell", icon: Heart },
        ],
      },
      {
        heading: "Cells & Committees",
        items: [
          { label: "SC / ST Cell", href: "#", isHeader: true },
          { label: "About Cell", href: "/students/sc-st-cell/about" },
          { label: "Committee", href: "/students/sc-st-cell/committee" },
          { label: "Activities", href: "/students/sc-st-cell/activities" },
          { label: "Safeguards", href: "/students/sc-st-cell/safeguards" },
          { label: "Grievance & Contact", href: "/students/sc-st-cell/grievance" },
          { label: "Internal Complaints Committee", href: "#", isHeader: true },
          { label: "About ICC", href: "/students/icc/about" },
          { label: "Committee Members", href: "/students/icc/members" },
          { label: "Rules", href: "/students/icc/rules" },
          { label: "Statutory Committees & Centres (PDF)", href: "/students/cells-committees/statutory" },
        ],
      },
      {
        heading: "Campus Life & Alumni",
        items: [
          { label: "Hostels", href: "#", isHeader: true },
          { label: "Hostel Rules", href: "/students/hostel-rules", icon: ShieldCheck },
          { label: "Girls Hostel Manual", href: "/students/girls-hostel-manual", icon: BookCopy },
          { label: "Committees & Societies", href: "#", isHeader: true },
          { 
            label: "Legal Services Committee", 
            href: "#",
            subItems: [
              { label: "About LSC", href: "/students/legal-services-committee/about" },
              { label: "Activities", href: "/students/legal-services-committee/activities" },
              { label: "Members", href: "/students/legal-services-committee/members" },
              { label: "Contact", href: "/students/legal-services-committee/contact" },
            ]
          },
          { 
            label: "Sports Committee", 
            href: "#",
            subItems: [
              { label: "About Committee", href: "/students/sports-committee/about" },
              { label: "Activities", href: "/students/sports-committee/activities" },
              { label: "Members", href: "/students/sports-committee/members" },
              { label: "Achievements", href: "/students/sports-committee/achievements" },
              { label: "Contact", href: "/students/sports-committee/contact" },
            ]
          },
          { label: "Cultural Committee", href: "/students/cultural-committee" },
          { label: "Moot & Advocacy Society (MAS)", href: "/students/moot-advocacy-society" },
          { label: "Alumni Relations Committee", href: "/students/alumni-relations-committee" },
          { label: "Student Activities", href: "#", isHeader: true },
          { label: "Student Newsletter / Drishtikon", href: "#notices" },
          { label: "SNL-DSNLU", href: "#snl" },
          { label: "SFPP Blog", href: "https://sfppdsnlu.wordpress.com/" },
          { label: "Alumni", href: "#", isHeader: true },
          { label: "Alumni Relations Committee", href: "/students/alumni-relations-committee" },
          { label: "DSNLU Alumni", href: "/students/alumni-portal" },
        ],
      },
    ],
  },
  {
    label: "Programs",
    href: "#programs",
    groups: [
      {
        heading: "Academic & Institutional Programs",
        items: [
          { label: "Guest Lectures", href: "/programs/guest-lectures", icon: Users },
          { label: "Seminars & Conferences", href: "/programs/seminars-conferences", icon: Globe },
          { label: "Events Gallery", href: "#gallery", icon: Archive },
        ],
      },
      {
        heading: "Flagship Programs & Competitions",
        items: [
          { label: "Shri D. V. Subba Rao National Mediation Competition", href: "/programs/national-mediation-competition", isHeader: true },
          { label: "About NMC", href: "/programs/national-mediation-competition#nmc-about" },
          { label: "1st NMC – 2024", href: "/programs/national-mediation-competition#nmc-2024" },
          { label: "2nd NMC – 2025–26", href: "/programs/national-mediation-competition#nmc-2025" },
        ],
      },
    ],
  },
  {
    label: "Examination",
    href: "#examination",
    groups: [
      {
        heading: "Examination",
        items: [
          { label: "Examination Notifications", href: "#exam-notifications", icon: Bell },
          { label: "Results", href: "#results", icon: FileText },
          { label: "Regulations", href: "#exam-regulations", icon: ScrollText },
          { label: "Timetables", href: "#timetables", icon: CalendarDays },
        ],
      },
    ],
  },
  {
    label: "Notices",
    href: "#notices",
    groups: [
      {
        heading: "Notices & Updates",
        items: [
          { label: "Important Notices", href: "#important-notices", icon: Bell },
          { label: "Tenders", href: "#tenders", icon: FileText },
          { label: "Recruitments", href: "#recruitments", icon: UserPlus },
          { label: "Announcements", href: "#announcements", icon: Newspaper },
        ],
      },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];
