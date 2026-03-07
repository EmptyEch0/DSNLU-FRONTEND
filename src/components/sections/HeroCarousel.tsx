import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "@/hooks/use-toast";

interface CarouselItem {
  id: number;
  image_url: string;
  title: string | null;
  subtitle: string | null;
}


const API = import.meta.env.VITE_API_URL;

export function HeroCarousel() {
  const { token } = useAdmin();
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/carousel`)
      .then((res) => res.json())
      .then(setCarouselData);
  }, []);

  useEffect(() => {
    if (isPaused || carouselData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, carouselData]);

  const handleAdd = async () => {
    const newSlide = {
      image_url: prompt("Enter Image URL"),
      title: prompt("Enter Title"),
      subtitle: prompt("Enter Subtitle"),
    };

    if (!newSlide.image_url) return;

    await fetch(`${API}/api/carousel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSlide),
    });

    toast({
      title: "Success",
      description: "Slide added successfully",
    });

    window.location.reload();
  };

  const handleEdit = async () => {
    const current = carouselData[currentIndex];

    const updated = {
      image_url: prompt("Edit Image URL", current.image_url),
      title: prompt("Edit Title", current.title || ""),
      subtitle: prompt("Edit Subtitle", current.subtitle || ""),
    };

    await fetch(
      `${API}/api/carousel/${current.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      }
    );

    toast({
      title: "Success",
      description: "Slide updated successfully",
    });

    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this slide?")) return;

    await fetch(`${API}/api/carousel/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCarouselData((prev) => prev.filter((item) => item.id !== id));
    
    toast({
      title: "Deleted",
      description: "Slide deleted successfully",
    });

    if (currentIndex >= carouselData.length - 1) {
      setCurrentIndex(Math.max(0, carouselData.length - 2));
    }
  };

  if (carouselData.length === 0) return null;

  return (
    <div
      className="group relative mx-auto h-[350px] md:h-[450px] w-full max-w-[1200px] overflow-hidden rounded-[18px] shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {token && (
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button
            onClick={handleAdd}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white shadow hover:bg-blue-700 transition-colors"
          >
            + Add
          </button>

          <button
            onClick={handleEdit}
            className="rounded bg-gray-200 px-3 py-1 text-sm text-black shadow hover:bg-gray-300 transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(carouselData[currentIndex].id)}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white shadow hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img
            src={carouselData[currentIndex].image_url}
            className="h-full w-full object-cover"
            alt={carouselData[currentIndex].title || ""}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
