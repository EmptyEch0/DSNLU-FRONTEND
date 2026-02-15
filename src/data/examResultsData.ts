export interface ExamResult {
  id: string;
  title: string;
  date: string;
  type: 'pdf' | 'internal' | 'url';
  link?: string;
  slug?: string;
  files?: { label: string; href: string }[];
}

export const examResultsData: ExamResult[] = [
  {
    id: "phd-dec-2025",
    title: "Ph.D. Course Work Examination Results – December, 2025",
    date: "24 Jan, 2026",
    type: 'pdf',
    link: "https://dsnlu.ac.in/storage/2026/01/Ph.D.-Course-Work-Examination-Results-December-2025.pdf"
  },
  {
    id: "ballb-odd-2025",
    title: "B.A.,LL.B End Semester Examination Results (Odd Semester), November – 2025",
    date: "11 Dec, 2025",
    type: 'internal',
    slug: "ba-llb-odd-semester-nov-2025",
    files: [
      { label: "B.A., LL.B. Semester-I", href: "https://dsnlu.ac.in/storage/2025/12/B.A.-LL.B.-Semester-I.pdf" },
      { label: "B.A., LL.B. Semester-III", href: "https://dsnlu.ac.in/storage/2025/12/B.A.-LL.B.-Semester-III.pdf" },
      { label: "B.A., LL.B. Semester-V", href: "https://dsnlu.ac.in/storage/2025/12/B.A.-LL.B.-Semester-V-1.pdf" },
      { label: "B.A., LL.B. Semester-VII", href: "https://dsnlu.ac.in/storage/2025/12/B.A.-LL.B.-Semester-VII-1.pdf" },
      { label: "B.A., LL.B. Semester-IX", href: "https://dsnlu.ac.in/storage/2025/12/B.A.-LL.B.-Semester-IX-1.pdf" },
    ]
  },
  {
    id: "3llb-odd-2025",
    title: "3 Year LL.B End Semester Examination Results (Odd Semester), November – 2025",
    date: "10 Dec, 2025",
    type: 'internal',
    slug: "3-year-llb-odd-semester-nov-2025",
    files: [
      { label: "3 Year LL.B. Semester-I", href: "https://dsnlu.ac.in/storage/2025/12/3-Year-LL.B.-Semester-I-3.pdf" },
      { label: "3 Year LL.B. Semester-III", href: "https://dsnlu.ac.in/storage/2025/12/3-Year-LL.B.-Semester-III-3.pdf" },
    ]
  },
  {
    id: "ballb-even-reval-2025",
    title: "B.A., LL.B. Even Semester Examination Revaluation Results (Semester-II, IV, VI, and VIII), April 2025",
    date: "25 Oct, 2025",
    type: 'internal',
    slug: "ba-llb-even-semester-revaluation-april-2025",
    files: [
      { label: "SEMESTER-II", href: "https://dsnlu.ac.in/storage/2025/10/SEMESTER-II.pdf" },
      { label: "SEMESTER-IV", href: "https://dsnlu.ac.in/storage/2025/10/SEMESTER-IV.pdf" },
      { label: "SEMESTER-VI", href: "https://dsnlu.ac.in/storage/2025/10/SEMESTER-VI.pdf" },
      { label: "SEMESTER-VIII", href: "https://dsnlu.ac.in/storage/2025/10/SEMESTER-VIII.pdf" },
    ]
  },
  {
    id: "llm-even-2025",
    title: "LL.M. Even Semester Examination Results, July-August 2025",
    date: "21 Aug, 2025",
    type: 'pdf',
    link: "https://dsnlu.ac.in/storage/2025/08/LL.M.-Even-Semester-Result-July-August-2025.pdf"
  },
  {
    id: "3llb-odd-reval-2025",
    title: "3 Year LL.B. Odd Semester Examination Revaluation Results (Semester-I), February 2025",
    date: "08 Jul, 2025",
    type: 'pdf',
    link: "https://dsnlu.ac.in/storage/2025/07/3YLL.B.-Odd-Semester-Revaluation-Feb-2025.pdf"
  },
  {
    id: "ballb-even-reval-x-2025",
    title: "B.A., LL.B. Even Semester Examinations Revaluation Results (Semester-X), April 2025",
    date: "16 Jun, 2025",
    type: 'pdf',
    link: "https://dsnlu.ac.in/storage/2025/06/SEM-X-RV-April-2025.pdf"
  },
  {
    id: "repeat-mid-end-2025",
    title: "Repeat Mid and End Semester Examination Results (Odd Semester), March – 2025",
    date: "10 May, 2025",
    type: 'pdf',
    link: "https://dsnlu.ac.in/storage/2025/05/Repeat-Mid-and-End-Semester-Results-Odd-Semester-March-2025.pdf"
  },
  {
    id: "ballb-odd-nov-2024",
    title: "B.A., LL.B. Odd Semester Examinations Results, November-2024",
    date: "12 Dec, 2024",
    type: 'url',
    link: "https://dsnlu.ac.in/all-examinations/b-a-ll-b-odd-semester-examinations-results-november-2024/"
  }
];
