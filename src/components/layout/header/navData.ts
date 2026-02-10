import {
  Building2, BookOpen, Users, UserCheck, GraduationCap, FileText,
  Library, ClipboardList, Scale, FlaskConical, Landmark, Award,
  Briefcase, ShieldCheck, ScrollText, Globe, Newspaper, Archive,
  Eye, Target, BadgeCheck, Gavel, HandshakeIcon, BookMarked,
  Database, Monitor, Wifi, BookCopy, CalendarDays, Bell,
  UserPlus, HelpCircle, Home as HomeIcon, Phone, Heart,
  type LucideIcon,
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
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
  { label: "NIRF", href: "#nirf" },
  { label: "NAAC", href: "#naac" },
  { label: "Tender", href: "#tender" },
  { label: "RTI", href: "#rti" },
  { label: "Alumni", href: "#alumni" },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About DSNLU",
    href: "#about",
    groups: [
      {
        heading: "University",
        items: [
          { label: "About the University", href: "#about-university", icon: Building2 },
          { label: "Logo & Motto", href: "#logo-motto", icon: Award },
          { label: "DSNLU Act", href: "#dsnlu-act", icon: Scale },
          { label: "Vision & Mission", href: "#vision", icon: Eye },
          { label: "Objectives", href: "#objectives", icon: Target },
        ],
      },
      {
        heading: "Leadership",
        items: [
          { label: "Visitor", href: "#visitor", icon: Landmark },
          { label: "Chancellor", href: "#chancellor", icon: UserCheck },
          { label: "Vice-Chancellor", href: "/vice-chancellor", icon: UserCheck },
          { label: "Registrar", href: "#registrar", icon: ClipboardList },
          { label: "Authorities", href: "#authorities", icon: Gavel },
        ],
      },
      {
        heading: "Compliance & Media",
        items: [
          { label: "BCI Affiliation", href: "#bci", icon: BadgeCheck },
          { label: "IQAC", href: "#iqac", icon: ShieldCheck },
          { label: "RTI Act", href: "#rti-act", icon: ScrollText },
          { label: "DSNLU in News", href: "#news", icon: Newspaper },
          { label: "Archives", href: "#archives", icon: Archive },
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
          { label: "Administration", href: "#administration", icon: ClipboardList },
          { label: "Faculty", href: "#faculty", icon: Users },
          { label: "Professor Emeritus", href: "#emeritus", icon: Award },
          { label: "Officers & Staff", href: "#officers-staff", icon: Briefcase },
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
          { label: "B.A. LL.B. (Hons.)", href: "#ballb", icon: GraduationCap },
          { label: "3 Year LL.B.", href: "#3yr-llb", icon: GraduationCap },
          { label: "LL.M.", href: "#llm", icon: GraduationCap },
          { label: "Ph.D.", href: "#phd", icon: BookOpen },
          { label: "LL.D.", href: "#lld", icon: BookOpen },
        ],
      },
      {
        heading: "Academic Affairs",
        items: [
          { label: "Academic Calendar", href: "#calendar", icon: CalendarDays },
          { label: "Examinations", href: "#examinations", icon: FileText },
          { label: "Memberships", href: "#memberships", icon: HandshakeIcon },
        ],
      },
    ],
  },
  {
    label: "Admissions",
    href: "#admissions",
    groups: [
      {
        heading: "Admissions",
        items: [
          { label: "Undergraduate Admissions", href: "#ug-admissions", icon: UserPlus },
          { label: "Postgraduate Admissions", href: "#pg-admissions", icon: UserPlus },
          { label: "Ph.D Admissions", href: "#phd-admissions", icon: UserPlus },
          { label: "Notifications", href: "#admission-notifications", icon: Bell },
          { label: "Regulations", href: "#admission-regulations", icon: ScrollText },
          { label: "Application Process", href: "#application-process", icon: FileText },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "#research",
    groups: [
      {
        heading: "Research",
        items: [
          { label: "Research Centres", href: "#research-centres", icon: FlaskConical },
          { label: "Publications", href: "#publications", icon: BookMarked },
          { label: "Journals", href: "#journals", icon: Newspaper },
          { label: "Projects", href: "#projects", icon: Briefcase },
          { label: "MoUs & Collaborations", href: "#mous", icon: HandshakeIcon },
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
          { label: "About Library", href: "#about-library", icon: Library },
          { label: "Library Regulations", href: "#library-regulations", icon: ScrollText },
          { label: "Anti-Plagiarism Software", href: "#plagiarism", icon: ShieldCheck },
          { label: "OPAC", href: "#opac", icon: Monitor },
          { label: "Remote Access (Knimbus)", href: "#knimbus", icon: Wifi },
        ],
      },
      {
        heading: "Resources",
        items: [
          { label: "Print Resources", href: "#print-resources", icon: BookCopy },
          { label: "Digital Resources", href: "#digital-resources", icon: Database },
          { label: "E-Journals", href: "#ejournals", icon: Globe },
          { label: "E-Books", href: "#ebooks", icon: BookOpen },
          { label: "Databases", href: "#databases", icon: Database },
        ],
      },
    ],
  },
  {
    label: "Students",
    href: "#students",
    groups: [
      {
        heading: "Student Life",
        items: [
          { label: "Placement & Internship", href: "#placements", icon: Briefcase },
          { label: "Student Code of Conduct", href: "#code-of-conduct", icon: ScrollText },
          { label: "Student Welfare Cell", href: "#welfare", icon: Heart },
          { label: "Hostels", href: "#hostels", icon: HomeIcon },
          { label: "Student Activities", href: "#student-activities", icon: Users },
        ],
      },
      {
        heading: "Committees & Support",
        items: [
          { label: "SC/ST Cell", href: "#scst-cell", icon: ShieldCheck },
          { label: "Grievance Redressal", href: "#grievance", icon: HelpCircle },
          { label: "Statutory Committees", href: "#statutory-committees", icon: Gavel },
          { label: "Committees & Societies", href: "#committees-societies", icon: Users },
          { label: "Alumni", href: "#alumni", icon: Award },
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
];
