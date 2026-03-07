import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicationsHeader } from "@/components/layout/PublicationsHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface Book {
  id: number;
  title: string;
  slug: string;
  cover_image_url: string;
  display_order: number;
}

const API = import.meta.env.VITE_API_URL;

export const PublicationsBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null);
  const { token } = useAdmin();

  // Admin modal state
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", cover_image_url: "" });

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API}/api/publications/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleNext = () => {
    if (selectedBookIndex !== null) {
      setSelectedBookIndex((selectedBookIndex + 1) % books.length);
    }
  };

  const handlePrev = () => {
    if (selectedBookIndex !== null) {
      setSelectedBookIndex((selectedBookIndex - 1 + books.length) % books.length);
    }
  };

  // --- Admin handlers ---
  const handleSave = async () => {
    const method = editBook ? "PUT" : "POST";
    const url = editBook
      ? `${API}/api/publications/books/${editBook.id}`
      : `${API}/api/publications/books`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
    setEditBook(null);
    resetForm();
    fetchBooks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this book?")) return;
    await fetch(`${API}/api/publications/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
  };

  const openEdit = (book: Book) => {
    setEditBook(book);
    setFormData({ title: book.title || "", slug: book.slug || "", cover_image_url: book.cover_image_url });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", cover_image_url: "" });
  };

  const saveOrder = async (updated: Book[]) => {
    const orders = updated.map((b, i) => ({ id: b.id, order: i + 1 }));
    await fetch(`${API}/api/publications/books/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orders }),
    });
  };

  const moveUp = (id: number) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === 0) return;
    const updated = [...books];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setBooks(updated);
    saveOrder(updated);
  };

  const moveDown = (id: number) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === books.length - 1) return;
    const updated = [...books];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setBooks(updated);
    saveOrder(updated);
  };

  if (loading) return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="books" />
      <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
      <Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <PublicationsHeader activeTab="books" />

      <main className="flex-1 py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-[#0f2d5c] uppercase mb-4 tracking-wide">
              BOOKS & SCHOLARLY PUBLICATIONS
            </h2>
            <div className="h-1 w-20 bg-[#c9a227]" />
          </motion.div>

          {/* Admin Add Button */}
          {token && (
            <div className="flex justify-end mb-8">
              <button
                onClick={() => { setEditBook(null); resetForm(); setShowModal(true); }}
                className="px-5 py-2.5 bg-navy text-gold rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                + Add Book
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {Array.isArray(books) && books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-3 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Admin controls */}
                {token && (
                  <div className="absolute top-1 right-1 z-20 flex gap-1">
                    <button onClick={() => openEdit(book)} title="Edit" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">✏️</button>
                    <button onClick={() => handleDelete(book.id)} title="Delete" className="bg-white/90 p-1 rounded shadow hover:bg-red-50 transition-colors text-xs">🗑️</button>
                    <button onClick={() => moveUp(book.id)} title="Move Up" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">⬆️</button>
                    <button onClick={() => moveDown(book.id)} title="Move Down" className="bg-white/90 p-1 rounded shadow hover:bg-gold/20 transition-colors text-xs">⬇️</button>
                  </div>
                )}

                <div
                  className="aspect-[3/4] overflow-hidden rounded-lg relative cursor-pointer"
                  onClick={() => setSelectedBookIndex(index)}
                >
                  <img
                    src={book.cover_image_url}
                    alt={book.title || `Publication ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0f2d5c]/0 group-hover:bg-[#0f2d5c]/5 transition-colors" />
                </div>
                {book.title && (
                  <p className="mt-2 text-sm font-medium text-[#0f2d5c] text-center truncate">{book.title}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* INTERACTIVE BOOK VIEWER (MODAL) */}
      <AnimatePresence>
        {selectedBookIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-8"
            >
              <button
                onClick={() => setSelectedBookIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative flex items-center justify-center w-full group">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="max-h-[70vh] md:max-h-[80vh] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1">
                  <img
                    src={books[selectedBookIndex]?.cover_image_url}
                    alt={books[selectedBookIndex]?.title || `Viewer ${selectedBookIndex + 1}`}
                    className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain"
                  />
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0f2d5c] border border-[#c9a227] text-white flex items-center justify-center hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all z-20"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <div className="bg-[#0f2d5c] px-6 py-2 rounded-full border border-[#c9a227]/30 text-white/80 font-bold uppercase tracking-widest text-xs">
                {selectedBookIndex + 1} / {books.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{editBook ? "Edit Book" : "Add Book"}</h2>
            <input className="w-full border p-2 rounded" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Title" />
            <input className="w-full border p-2 rounded" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="Slug (optional)" />
            <input className="w-full border p-2 rounded" value={formData.cover_image_url} onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })} placeholder="Cover Image URL" />
            <div className="flex justify-end gap-4 pt-2">
              <button onClick={() => { setShowModal(false); setEditBook(null); }} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-navy text-gold rounded font-bold">
                {editBook ? "Save Changes" : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationsBooks;
