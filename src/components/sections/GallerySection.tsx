import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import libraryImg from "@/assets/library.jpg";
import mootCourtImg from "@/assets/moot-court.jpg";
import convocationImg from "@/assets/convocation.jpg";
import heroCampus from "@/assets/hero-campus.jpg";

const galleryItems = [
  {
    image: heroCampus,
    title: "Campus Architecture",
    category: "Campus",
  },
  {
    image: libraryImg,
    title: "Central Library",
    category: "Facilities",
  },
  {
    image: mootCourtImg,
    title: "Moot Court Hall",
    category: "Academics",
  },
  {
    image: convocationImg,
    title: "Annual Convocation",
    category: "Events",
  },
];

export function GallerySection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <span className="mb-2 inline-block font-medium uppercase tracking-wider text-gold">
              Gallery
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Campus Life & Events
            </h2>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-ivory">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}