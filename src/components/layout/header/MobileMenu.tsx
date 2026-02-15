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
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

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
                          <div key={sub.label} className="flex flex-col border-l border-border/50 py-1 pl-4">
                            {sub.isHeader ? (
                              <span className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-widest text-gold/60">
                                {sub.label}
                              </span>
                            ) : sub.subItems ? (
                              <div className="flex flex-col">
                                <button
                                  onClick={() => setExpandedSub(expandedSub === sub.label ? null : sub.label)}
                                  className="flex w-full items-center justify-between py-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                                >
                                  <div className="flex items-center gap-2">
                                    {sub.icon && <sub.icon className="h-3.5 w-3.5" />}
                                    {sub.label}
                                  </div>
                                  <ChevronDown
                                    className={`h-3 w-3 transition-transform ${expandedSub === sub.label ? "rotate-180" : ""}`}
                                  />
                                </button>
                                {expandedSub === sub.label && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    className="overflow-hidden flex flex-col gap-1 pl-4 pb-1"
                                  >
                                    {sub.subItems.map((s3) => (
                                      <a
                                        key={s3.label}
                                        href={s3.href}
                                        onClick={onClose}
                                        className="block border-l border-border/30 pl-3 py-1 text-xs text-muted-foreground/70 transition-colors hover:text-gold"
                                      >
                                        {s3.label}
                                      </a>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <a
                                  href={sub.href}
                                  onClick={onClose}
                                  target={sub.href.startsWith("http") ? "_blank" : undefined}
                                  rel={sub.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="flex items-center gap-2 py-1 text-sm text-muted-foreground transition-colors hover:text-gold"
                                >
                                  {sub.icon && <sub.icon className="h-3.5 w-3.5" />}
                                  {sub.label}
                                  {sub.href.endsWith(".pdf") && (
                                    <span className="text-[10px] font-bold text-gold/60 ml-1">(PDF)</span>
                                  )}
                                </a>
                                {sub.secondaryAction && (
                                  <a
                                    href={sub.secondaryAction.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mr-2 text-[10px] font-bold uppercase text-gold"
                                  >
                                    {sub.secondaryAction.label}
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
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
