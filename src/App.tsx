import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Index from "./pages/Index";
import ViceChancellor from "./pages/ViceChancellor";
import AboutDSNLU from "./pages/AboutDSNLU";
import Visitor from "./pages/Visitor";
import Chancellor from "./pages/Chancellor";
import Registrar from "./pages/Registrar";
import BCIAffiliation from "./pages/BCIAffiliation";
import IQAC from "./pages/IQAC";
import RTIAct from "./pages/RTIAct";
import News from "./pages/News";
import ComplaintsCaste from "./pages/ComplaintsCaste";
import UGCGrievance from "./pages/UGCGrievance";
import AntiRagging from "./pages/AntiRagging";
import AntiRaggingContact from "./pages/AntiRaggingContact";
import Archives from "./pages/Archives";
import GeneralCouncil from "./pages/GeneralCouncilPage";
import ExecutiveCouncil from "./pages/ExecutiveCouncil";
import AcademicCouncil from "./pages/AcademicCouncil";
import PlanningBoard from "./pages/PlanningBoard";
import FinanceCommittee from "./pages/FinanceCommittee";
import InfrastructureCommittee from "./pages/InfrastructureCommittee";
import Infrastructure from "./pages/Infrastructure";
import ProfessorEmeritusListing from "./pages/ProfessorEmeritusListing";
import ProfessorEmeritusBio from "./pages/ProfessorEmeritusBio";
import Membership from "./pages/Membership";
import ContactUs from "./pages/ContactUs";
import ExaminationResults from "./pages/ExaminationResults";
import ExaminationResultsDetail from "./pages/ExaminationResultsDetail";
import CertificateVerification from "./pages/CertificateVerification";
import PlacementInternship from "./pages/PlacementInternship";
import StudentCodeOfConduct from "./pages/StudentCodeOfConduct";
import StudentWelfareCell from "./pages/StudentWelfareCell";
import HostelRules from "./pages/HostelRules";
import GirlsHostelManual from "./pages/GirlsHostelManual";
import SCSTAbout from "./pages/SCSTAbout";
import SCSTCommittee from "./pages/SCSTCommittee";
import SCSTActivities from "./pages/SCSTActivities";
import SCSTSafeguards from "./pages/SCSTSafeguards";
import SCSTGrievanceContact from "./pages/SCSTGrievanceContact";
import ICCAbout from "./pages/ICCAbout";
import ICCMembers from "./pages/ICCMembers";
import ICCRules from "./pages/ICCRules";
import StatutoryCommittees from "./pages/StatutoryCommittees";
import LSCAbout from "./pages/LSCAbout";
import LSCActivities from "./pages/LSCActivities";
import LSCMembers from "./pages/LSCMembers";
import LSCContact from "./pages/LSCContact";
import SportsAbout from "./pages/SportsAbout";
import SportsActivities from "./pages/SportsActivities";
import SportsMembers from "./pages/SportsMembers";
import SportsAchievements from "./pages/SportsAchievements";
import SportsContact from "./pages/SportsContact";
import CulturalCommittee from "./pages/CulturalCommittee";
import MootAdvocacySociety from "./pages/MootAdvocacySociety";
import AlumniRelationsCommittee from "./pages/AlumniRelationsCommittee";
import DSNLUAlumni from "./pages/DSNLUAlumni";
import LibraryInfo from "./pages/LibraryInfo";
import LibraryAbout from "./pages/LibraryAbout";
import LibraryRegulations from "./pages/LibraryRegulations";
import LibraryTurnitin from "./pages/LibraryTurnitin";
import LibraryOPAC from "./pages/LibraryOPAC";
import LibraryKnimbus from "./pages/LibraryKnimbus";
import LibraryEDatabases from "./pages/LibraryEDatabases";
import LibraryPrintResources from "./pages/LibraryPrintResources";
import LibraryEJournals from "./pages/LibraryEJournals";
import LibraryEBooks from "./pages/LibraryEBooks";
import LibraryResources from "./pages/LibraryResources";
import GuestLectures from "./pages/GuestLectures";
import SeminarsConferences from "./pages/SeminarsConferences";
import NationalMediationCompetition from "./pages/NationalMediationCompetition";
import PublicationsOverview from "./pages/PublicationsOverview";
import PublicationsBooks from "./pages/PublicationsBooks";
import WavesNewsletter from "./pages/WavesNewsletter";
import JournalScienceTechLaw from "./pages/JournalScienceTechLaw";
import GuestHouse from "./pages/GuestHouse";
import CADRAbout from "./pages/CADRAbout";
import CADRBlog from "./pages/CADRBlog";
import CWCLAbout from "./pages/CWCLAbout";
import CWCLEvents from "./pages/CWCLEvents";
import CLRAbout from "./pages/CLRAbout";
import CLRResearch from "./pages/CLRResearch";
import LICAbout from "./pages/LICAbout";
import LICEvents from "./pages/LICEvents";
import CIPRAbout from "./pages/CIPRAbout";
import CIPRJournal from "./pages/CIPRJournal";
import CIPRBoard from "./pages/CIPRBoard";
import AmbedkarCentre from "./pages/AmbedkarCentre";
import CriminalJusticeCentre from "./pages/CriminalJusticeCentre";
import CManAbout from "./pages/CManAbout";
import CManEvents from "./pages/CManEvents";
import EnvironmentCentre from "./pages/EnvironmentCentre";
import PublicPolicyCentre from "./pages/PublicPolicyCentre";
import LawLiteratureCentre from "./pages/LawLiteratureCentre";
import HumanRightsCentre from "./pages/HumanRightsCentre";
import FashionMediaCentre from "./pages/FashionMediaCentre";
import BankingFinanceCentre from "./pages/BankingFinanceCentre";
import SportsLawCentre from "./pages/SportsLawCentre";
import CTRIALCentre from "./pages/CTRIALCentre";
import FacultyProfile from "./pages/FacultyProfile";
import CASLCentre from "./pages/CASLCentre";
import ICMSMECentre from "./pages/ICMSMECentre";
import CILADAbout from "./pages/CILADAbout";
import CILADInitiatives from "./pages/CILADInitiatives";
import CILADBlog from "./pages/CILADBlog";
import Faculty from "./pages/Faculty";
import OfficersStaff from "./pages/OfficersStaff";
import DynamicPage from "./pages/DynamicPage";
import AdminPageBuilder from "./pages/AdminPageBuilder";
import NotFound from "./pages/NotFound";
import AdminCampusLife from "./pages/AdminCampusLife";
import AdminVisitingFaculty from "./pages/AdminVisitingFaculty";
import BALLB from "./pages/BALLB";
import LLB from "./pages/LLB";
import LLM from "./pages/LLM";

const queryClient = new QueryClient();

const App = () => (
  <AdminProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/general-council" element={<GeneralCouncil />} />
          <Route path="/executive-council" element={<ExecutiveCouncil />} />
          <Route path="/academic-council" element={<AcademicCouncil />} />
          <Route path="/planning-board" element={<PlanningBoard />} />
          <Route path="/finance-committee" element={<FinanceCommittee />} />
          <Route path="/infrastructure-committee" element={<InfrastructureCommittee />} />
          <Route path="/people/professor-emeritus" element={<ProfessorEmeritusListing />} />
          <Route path="/people/professor-emeritus/:slug" element={<ProfessorEmeritusBio />} />
          <Route path="/people/faculty" element={<Faculty />} />
          <Route path="/people/officers-staff" element={<OfficersStaff />} />
          <Route path="/academics/membership" element={<Membership />} />
          <Route path="/courses/ba-llb" element={<BALLB />} />
          <Route path="/courses/llb" element={<LLB />} />
          <Route path="/courses/llm" element={<LLM />} />
          <Route path="/vice-chancellor" element={<ViceChancellor />} />
          <Route path="/chancellor" element={<Chancellor />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/bci-affiliation" element={<BCIAffiliation />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/rti-act" element={<RTIAct />} />
          <Route path="/news" element={<News />} />
          <Route path="/compliance-infrastructure/complaints" element={<ComplaintsCaste />} />
          <Route path="/compliance-infrastructure/ugc-grievance" element={<UGCGrievance />} />
          <Route path="/compliance-infrastructure/anti-ragging" element={<AntiRagging />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/about" element={<AboutDSNLU />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/academics/examination-results" element={<ExaminationResults />} />
          <Route path="/academics/examination-results/:slug" element={<ExaminationResultsDetail />} />
          <Route path="/academics/certificate-verification" element={<CertificateVerification />} />
          <Route path="/students/placement-internship" element={<PlacementInternship />} />
          <Route path="/students/student-code-of-conduct" element={<StudentCodeOfConduct />} />
          <Route path="/students/student-welfare-cell" element={<StudentWelfareCell />} />
          <Route path="/students/hostel-rules" element={<HostelRules />} />
          <Route path="/students/girls-hostel-manual" element={<GirlsHostelManual />} />
          <Route path="/students/sc-st-cell/about" element={<SCSTAbout />} />
          <Route path="/students/sc-st-cell/committee" element={<SCSTCommittee />} />
          <Route path="/students/sc-st-cell/activities" element={<SCSTActivities />} />
          <Route path="/students/sc-st-cell/safeguards" element={<SCSTSafeguards />} />
          <Route path="/students/sc-st-cell/grievance" element={<SCSTGrievanceContact />} />
          <Route path="/students/icc/about" element={<ICCAbout />} />
          <Route path="/students/icc/members" element={<ICCMembers />} />
          <Route path="/students/icc/rules" element={<ICCRules />} />
          <Route path="/students/legal-services-committee/about" element={<LSCAbout />} />
          <Route path="/students/legal-services-committee/activities" element={<LSCActivities />} />
          <Route path="/students/legal-services-committee/members" element={<LSCMembers />} />
          <Route path="/students/legal-services-committee/contact" element={<LSCContact />} />
          <Route path="/students/sports-committee/about" element={<SportsAbout />} />
          <Route path="/students/sports-committee/activities" element={<SportsActivities />} />
          <Route path="/students/sports-committee/members" element={<SportsMembers />} />
          <Route path="/students/sports-committee/achievements" element={<SportsAchievements />} />
          <Route path="/students/sports-committee/contact" element={<SportsContact />} />
          <Route path="/students/cultural-committee" element={<CulturalCommittee />} />
          <Route path="/students/moot-advocacy-society" element={<MootAdvocacySociety />} />
          <Route path="/students/alumni-relations-committee" element={<AlumniRelationsCommittee />} />
          <Route path="/students/alumni-portal" element={<DSNLUAlumni />} />
          <Route path="/students/cells-committees/statutory" element={<StatutoryCommittees />} />
          
          {/* Library Routes */}
          <Route path="/library/info" element={<LibraryInfo />} />
          <Route path="/library/about" element={<LibraryAbout />} />
          <Route path="/library/regulations" element={<LibraryRegulations />} />
          <Route path="/library/turnitin" element={<LibraryTurnitin />} />
          <Route path="/library/opac" element={<LibraryOPAC />} />
          <Route path="/library/knimbus" element={<LibraryKnimbus />} />
          
          <Route path="/library/resources/print" element={<LibraryPrintResources />} />
          <Route path="/library/resources/journals" element={<LibraryEJournals />} />
          <Route path="/library/resources/books" element={<LibraryEBooks />} />
          <Route path="/library/resources/databases" element={<LibraryEDatabases />} />
          <Route path="/library/resources" element={<LibraryResources />} />
          
          {/* Programs Routes */}
          <Route path="/programs/guest-lectures" element={<GuestLectures />} />
          <Route path="/programs/seminars-conferences" element={<SeminarsConferences />} />
          <Route path="/programs/national-mediation-competition" element={<NationalMediationCompetition />} />
          <Route path="/academics/publications/overview" element={<PublicationsOverview />} />
          <Route path="/academics/publications/books" element={<PublicationsBooks />} />
          <Route path="/academics/publications/waves" element={<WavesNewsletter />} />
          <Route path="/academics/journals/science-technology-law" element={<JournalScienceTechLaw />} />
          <Route path="/compliance-infrastructure/infrastructure/guest-house" element={<GuestHouse />} />
          <Route path="/compliance-infrastructure/infrastructure" element={<Infrastructure />} />

          {/* Centres Routes */}
          <Route path="/centres/adr/about" element={<CADRAbout />} />
          <Route path="/centres/adr/blog" element={<CADRBlog />} />
          <Route path="/centres/cwcl/about" element={<CWCLAbout />} />
          <Route path="/centres/cwcl/events" element={<CWCLEvents />} />
          <Route path="/centres/clr/about" element={<CLRAbout />} />
          <Route path="/centres/clr/research" element={<CLRResearch />} />
          <Route path="/centres/lic/about" element={<LICAbout />} />
          <Route path="/centres/lic/events" element={<LICEvents />} />
          <Route path="/centres/cipr/about" element={<CIPRAbout />} />
          <Route path="/centres/cipr/journal" element={<CIPRJournal />} />
          <Route path="/centres/cipr/board" element={<CIPRBoard />} />
          <Route path="/centres/ambedkar/about" element={<AmbedkarCentre />} />
          <Route path="/centres/criminal-justice/about" element={<CriminalJusticeCentre />} />
          <Route path="/centres/cman/about" element={<CManAbout />} />
          <Route path="/centres/cman/events" element={<CManEvents />} />
          <Route path="/centres/environment/about" element={<EnvironmentCentre />} />
          <Route path="/centres/public-policy/about" element={<PublicPolicyCentre />} />
          <Route path="/centres/law-literature/about" element={<LawLiteratureCentre />} />
          <Route path="/centres/human-rights/about" element={<HumanRightsCentre />} />
          <Route path="/centres/fashion-media/about" element={<FashionMediaCentre />} />
          <Route path="/centres/banking-finance/about" element={<BankingFinanceCentre />} />
          <Route path="/centres/sports-law/about" element={<SportsLawCentre />} />
          <Route path="/centres/c-trial/about" element={<CTRIALCentre />} />
          <Route path="/centres/cas-l/about" element={<CASLCentre />} />
          <Route path="/centres/icmsme/about" element={<ICMSMECentre />} />
          <Route path="/people/faculty/:slug" element={<FacultyProfile />} />
          <Route path="/centres/cilad/about" element={<CILADAbout />} />
          <Route path="/centres/cilad/initiatives" element={<CILADInitiatives />} />
          <Route path="/centres/cilad/blog" element={<CILADBlog />} />


          <Route path="/admin/campus-life" element={<AdminCampusLife />} />
          <Route path="/admin/visiting-faculty" element={<AdminVisitingFaculty />} />
          <Route path="/pages/:slug" element={<DynamicPage />} />
          <Route path="/admin/page-builder" element={<AdminPageBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </AdminProvider>
);

export default App;
