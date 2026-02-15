import { useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { SubMenuGroup, SubMenuItem } from "./navData";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  groups: SubMenuGroup[];
}

export function MegaMenu({ groups }: MegaMenuProps) {
  const colCount = groups.length;
  const menuRef = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<"center" | "left" | "right">("center");
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal Alignment logic
      if (rect.right > viewportWidth - 20) {
        setAlign("right");
      } else if (rect.left < 20) {
        setAlign("left");
      }

      // Vertical Alignment logic (Viewport protection)
      const bottomSpacing = 20;
      if (rect.bottom > viewportHeight - bottomSpacing) {
        const overflow = rect.bottom - (viewportHeight - bottomSpacing);
        // Shift up by overflow, but don't go above navbar (roughly 2px from top)
        setVerticalOffset(-overflow);
      }
    }
  }, []);

  const alignmentClasses = {
    center: "left-1/2 -translate-x-1/2",
    left: "left-0",
    right: "right-0",
  };

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className={`absolute top-full z-[9999] pt-2 ${alignmentClasses[align]}`}
      style={{ y: verticalOffset }}
    >
      <div
        className={cn(
          "grid gap-6 rounded-xl border bg-card p-6 shadow-lg",
          colCount >= 3 ? "min-w-[680px] grid-cols-3" : colCount === 2 ? "min-w-[460px] grid-cols-2" : "min-w-[240px] grid-cols-1"
        )}
      >
        {groups.map((group) => (
          <div key={group.heading}>
            <h4 className="mb-3 border-b border-border pb-2 text-xs font-semibold uppercase tracking-wider text-gold">
              {group.heading}
            </h4>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const itemId = `${group.heading}-${item.label}`;
                return (
                  <li
                    key={item.label}
                    className="group/item relative"
                    onMouseEnter={() => item.subItems && setActiveSubmenuId(itemId)}
                    onMouseLeave={() => setActiveSubmenuId(null)}
                  >
                    {item.isHeader ? (
                      <div className="mb-1 mt-4 border-b border-border/40 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                        {item.label}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1 rounded-md transition-colors hover:bg-muted">
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex flex-1 items-center gap-2.5 px-2 py-2 text-sm text-foreground transition-colors group-hover/item:text-gold"
                        >
                          {item.icon && (
                            <item.icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover/item:text-gold" />
                          )}
                          <span>{item.label}</span>
                          {item.href.endsWith(".pdf") && (
                            <span className="text-[10px] font-bold text-gold/60 leading-none ml-1">(PDF)</span>
                          )}
                        </a>
                        {item.subItems && (
                          <ChevronRight className="mr-2 h-3 w-3 shrink-0 text-muted-foreground transition-colors group-hover/item:text-gold" />
                        )}
                        {item.secondaryAction && (
                          <a
                            href={item.secondaryAction.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2 rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-tight text-gold transition-colors hover:bg-gold hover:text-navy"
                          >
                            {item.secondaryAction.label}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Side Submenu */}
                    <AnimatePresence>
                      {activeSubmenuId === itemId && item.subItems && (
                        <SubMenu items={item.subItems} />
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SubMenu({ items }: { items: SubMenuItem[] }) {
  const submenuRef = useRef<HTMLDivElement>(null);
  const [vOffset, setVOffset] = useState(0);

  useLayoutEffect(() => {
    if (submenuRef.current) {
      const rect = submenuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const bottomSpacing = 20;

      if (rect.bottom > viewportHeight - bottomSpacing) {
        const overflow = rect.bottom - (viewportHeight - bottomSpacing);
        setVOffset(-overflow);
      }
    }
  }, []);

  return (
    <motion.div
      ref={submenuRef}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.15 }}
      className="absolute left-full top-0 z-[10000] ml-1 min-w-[240px]"
      style={{ y: vOffset }}
    >
      <div className="rounded-xl border bg-card p-2 shadow-xl">
        <ul className="space-y-0.5">
          {items.map((sub) => (
            <li key={sub.label}>
              <a
                href={sub.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-gold"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
