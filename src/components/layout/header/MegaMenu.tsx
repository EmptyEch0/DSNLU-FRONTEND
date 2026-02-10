import { motion } from "framer-motion";
import type { SubMenuGroup } from "./navData";

interface MegaMenuProps {
  groups: SubMenuGroup[];
}

export function MegaMenu({ groups }: MegaMenuProps) {
  const colCount = groups.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
    >
      <div
        className={`grid gap-6 rounded-xl border bg-card p-6 shadow-lg ${
          colCount >= 3 ? "min-w-[680px] grid-cols-3" : colCount === 2 ? "min-w-[460px] grid-cols-2" : "min-w-[240px] grid-cols-1"
        }`}
      >
        {groups.map((group) => (
          <div key={group.heading}>
            <h4 className="mb-3 border-b border-border pb-2 text-xs font-semibold uppercase tracking-wider text-gold">
              {group.heading}
            </h4>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-gold"
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
                    )}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
