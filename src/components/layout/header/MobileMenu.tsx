import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "./navData";

interface MobileMenuProps {
  items: NavItem[];
  onClose: () => void;
}

export function MobileMenu({ items, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden border-t lg:hidden"
    >
      <div className="container max-h-[70vh] overflow-y-auto py-4">
        {items.map((item) => (
          <div key={item.label} className="border-b border-border/50">
            {item.groups ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-gold"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                {expanded === item.label && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="overflow-hidden pb-3 pl-4"
                  >
                    {item.groups.map((group) => (
                      <div key={group.heading} className="mb-3">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gold">
                          {group.heading}
                        </span>
                        {group.items.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
                          >
                            {sub.icon && <sub.icon className="h-3.5 w-3.5" />}
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                onClick={onClose}
                className="block py-3 text-sm font-medium text-foreground transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
