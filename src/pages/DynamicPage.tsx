import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, FileText, Download, ArrowRight, ChevronDown, Loader2, AlertCircle, Pencil, Plus, Trash2, X, GripVertical } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── Section Types ────────────────────────────────────────────────────────────

type SectionType = "richtext" | "table" | "filelist" | "cards" | "accordion" | "image_text";

interface Section {
  id: number;
  section_type: SectionType;
  title: string;
  content: any;
  display_order: number;
}

interface PageData {
  id: number;
  title: string;
  slug: string;
  meta_desc: string;
  hero_subtitle: string;
  sections: Section[];
}

// ─── Section Renderers ────────────────────────────────────────────────────────

function RichTextSection({ content }: { content: { html: string } }) {
  return (
    <div
      className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content.html || "" }}
    />
  );
}

function TableSection({ content }: { content: { headers: string[]; rows: string[][] } }) {
  const { headers = [], rows = [] } = content;
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#0f2d5c] text-white">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y text-muted-foreground">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-muted/30 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-6 py-4 ${ci === 0 ? "font-bold text-[#0f2d5c] bg-secondary/10" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={headers.length} className="px-6 py-8 text-center italic">No data available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function FileListSection({ content }: { content: { items: { title: string; url: string; date: string }[] } }) {
  const items = content.items || [];
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="group bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gold/30 transition-all flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground group-hover:text-gold transition-colors truncate">{item.title}</h4>
            {item.date && <p className="text-xs text-muted-foreground mt-1">Published on {item.date}</p>}
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm gap-2 group/btn">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              View File <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </Button>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="sm:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-full">
            <Download className="h-5 w-5" />
          </a>
        </div>
      ))}
      {items.length === 0 && <p className="text-muted-foreground italic text-center py-8">No files available.</p>}
    </div>
  );
}

function CardsSection({ content }: { content: { cards: { title: string; body: string }[] } }) {
  const cards = content.cards || [];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-md hover:border-gold/30 transition-all">
          <h4 className="font-serif font-bold text-[#0f2d5c] mb-3 text-lg">{card.title}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>
  );
}

function AccordionSection({ content }: { content: { items: { question: string; answer: string }[] } }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = content.items || [];
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border rounded-xl overflow-hidden bg-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
          >
            <span className="font-bold text-[#0f2d5c]">{item.question}</span>
            <ChevronDown className={`h-4 w-4 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t pt-3">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ImageTextSection({ content }: { content: { image_url: string; image_alt: string; text: string; layout: "left" | "right" } }) {
  const isRight = content.layout === "right";
  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
      {content.image_url && (
        <div className="w-full md:w-2/5 shrink-0">
          <img src={content.image_url} alt={content.image_alt || ""} className="w-full rounded-2xl shadow-md object-cover" />
        </div>
      )}
      <div
        className="flex-1 prose prose-lg max-w-none text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: content.text || "" }}
      />
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function SectionBlock({
  section,
  isAdmin,
  onEdit,
  onDelete,
}: {
  section: Section;
  isAdmin: boolean;
  onEdit: (s: Section) => void;
  onDelete: (id: number) => void;
}) {
  const renderContent = () => {
    switch (section.section_type) {
      case "richtext":   return <RichTextSection   content={section.content} />;
      case "table":      return <TableSection      content={section.content} />;
      case "filelist":   return <FileListSection   content={section.content} />;
      case "cards":      return <CardsSection      content={section.content} />;
      case "accordion":  return <AccordionSection  content={section.content} />;
      case "image_text": return <ImageTextSection  content={section.content} />;
      default:           return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative ${isAdmin ? "group/section" : ""}`}
    >
      {/* Admin overlay controls */}
      {isAdmin && (
        <div className="absolute -top-3 right-0 z-10 hidden group-hover/section:flex items-center gap-2 bg-white border rounded-xl shadow-lg px-3 py-1.5">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">{section.section_type}</span>
          <button onClick={() => onEdit(section)} className="p-1 text-gold hover:bg-gold/10 rounded-lg transition-colors">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onDelete(section.id)} className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {section.title && (
        <h2 className="font-serif text-2xl font-bold text-[#0f2d5c] border-l-4 border-gold pl-6 uppercase tracking-wider mb-6">
          {section.title}
        </h2>
      )}
      {renderContent()}
    </motion.div>
  );
}

// ─── Section Edit Modal ───────────────────────────────────────────────────────

const SECTION_TEMPLATES: Record<SectionType, any> = {
  richtext:   { html: "<p>Enter your content here...</p>" },
  table:      { headers: ["Column 1", "Column 2"], rows: [["Row 1 Col 1", "Row 1 Col 2"]] },
  filelist:   { items: [{ title: "Document Title", url: "https://example.com/file.pdf", date: "Jan 01, 2024" }] },
  cards:      { cards: [{ title: "Card Title", body: "Card description text." }] },
  accordion:  { items: [{ question: "Question here?", answer: "Answer here." }] },
  image_text: { image_url: "", image_alt: "", text: "<p>Text here</p>", layout: "left" },
};

function SectionModal({
  section,
  onClose,
  onSave,
}: {
  section: Partial<Section> | null;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const isNew = !section?.id;
  const [type, setType]       = useState<SectionType>(section?.section_type || "richtext");
  const [title, setTitle]     = useState(section?.title || "");
  const [order, setOrder]     = useState(section?.display_order ?? 0);
  const [contentStr, setContentStr] = useState(
    section?.content ? JSON.stringify(section.content, null, 2) : JSON.stringify(SECTION_TEMPLATES["richtext"], null, 2)
  );
  const [jsonError, setJsonError] = useState("");

  const handleTypeChange = (t: SectionType) => {
    setType(t);
    if (isNew) setContentStr(JSON.stringify(SECTION_TEMPLATES[t], null, 2));
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(contentStr);
      setJsonError("");
      onSave({ section_type: type, title, content: parsed, display_order: order });
    } catch {
      setJsonError("Invalid JSON – please fix before saving.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl border overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b bg-secondary/40 shrink-0">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {isNew ? "Add Section" : "Edit Section"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-4 overflow-y-auto flex-1">
          {/* Section Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Section Type</label>
            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as SectionType)}
              className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="richtext">Rich Text</option>
              <option value="table">Table</option>
              <option value="filelist">File List</option>
              <option value="cards">Cards Grid</option>
              <option value="accordion">Accordion / FAQ</option>
              <option value="image_text">Image + Text</option>
            </select>
          </div>

          {/* Title + Order */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Section Title</label>
              <input
                value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional heading shown above section"
                className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Order</label>
              <input
                type="number" min={0} value={order} onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
          </div>

          {/* Content JSON editor */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
              Content (JSON)
            </label>
            <div className="text-xs text-muted-foreground mb-2 bg-secondary/30 rounded-lg p-2 font-mono">
              Template: <code>{JSON.stringify(SECTION_TEMPLATES[type])}</code>
            </div>
            <textarea
              rows={10}
              value={contentStr}
              onChange={(e) => setContentStr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
              spellCheck={false}
            />
            {jsonError && <p className="mt-1 text-xs text-red-500 font-medium">{jsonError}</p>}
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-secondary/20 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-gold text-navy hover:bg-gold/90 font-bold">
            {isNew ? "Add Section" : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token, isAdminMode } = useAdmin();
  const isAdmin = !!token && isAdminMode;

  const [page, setPage]       = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [modalSection, setModalSection] = useState<Partial<Section> | null | false>(false);

  const fetchPage = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/dynamic-pages/${slug}`);
      const json = await res.json();
      if (!res.ok || !json.success) { setNotFound(true); return; }
      setPage(json.data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPage(); }, [slug]);

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm("Delete this section?")) return;
    try {
      await fetch(`${API}/api/dynamic-pages/sections/${sectionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Section deleted");
      fetchPage();
    } catch { toast.error("Delete failed"); }
  };

  const handleSaveSection = async (data: any) => {
    const editing = modalSection && (modalSection as Section).id;
    try {
      if (editing) {
        await fetch(`${API}/api/dynamic-pages/sections/${(modalSection as Section).id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toast.success("Section updated");
      } else {
        await fetch(`${API}/api/dynamic-pages/${page!.id}/sections`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toast.success("Section added");
      }
      setModalSection(false);
      fetchPage();
    } catch { toast.error("Save failed"); }
  };

  // ── Render states ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-gold" />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <AlertCircle className="h-12 w-12 text-gold/50" />
          <p className="font-serif text-2xl font-bold text-[#0f2d5c]">Page Not Found</p>
          <p className="text-sm">The page you're looking for doesn't exist or has been removed.</p>
          <Button asChild variant="outline"><Link to="/">Go Home</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-secondary/50">
          <div className="container flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {page.hero_subtitle && <><span>{page.hero_subtitle}</span><ChevronRight className="h-3.5 w-3.5" /></>}
            <span className="font-medium text-gold">{page.title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-[#0f2d5c] py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container relative z-10 text-center">
            {page.hero_subtitle && (
              <motion.span
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 inline-block font-medium uppercase tracking-widest text-gold text-sm"
              >
                {page.hero_subtitle}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl uppercase tracking-wider"
            >
              {page.title}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full bg-gold"
            />
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl space-y-16">
            {/* Admin toolbar */}
            {isAdmin && (
              <div className="flex items-center justify-between p-4 bg-gold/5 border border-gold/20 rounded-2xl">
                <span className="text-sm font-bold text-gold uppercase tracking-widest">Admin Mode — Editing: {page.slug}</span>
                <Button
                  onClick={() => setModalSection({})}
                  className="bg-gold text-navy hover:bg-gold/90 font-bold gap-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4" /> Add Section
                </Button>
              </div>
            )}

            {/* Sections */}
            {page.sections.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No content sections yet.</p>
                {isAdmin && <p className="text-sm mt-1">Use "Add Section" above to add content.</p>}
              </div>
            )}

            {page.sections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                isAdmin={isAdmin}
                onEdit={(s) => setModalSection(s)}
                onDelete={handleDeleteSection}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {/* Section modal */}
      <AnimatePresence>
        {modalSection !== false && (
          <SectionModal
            section={modalSection}
            onClose={() => setModalSection(false)}
            onSave={handleSaveSection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicPage;
