import { useEffect, useState } from "react";
import { navItems as staticNavItems, type NavItem, type SubMenuGroup } from "@/components/layout/header/navData";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface NavAddition {
  id: number;
  nav_parent: string;
  group_heading: string;
  item_label: string;
  page_slug: string;
  display_order: number;
}

/**
 * Returns a merged navItems array:
 * static hardcoded items  +  DB-driven dynamic page links
 *
 * Dynamic items are injected into the correct group under the correct
 * top-level nav entry. If the group heading doesn't exist yet it is created.
 */
export function useNavAdditions(): NavItem[] {
  const [additions, setAdditions] = useState<NavAddition[]>([]);

  useEffect(() => {
    fetch(`${API}/api/dynamic-pages/nav-additions`)
      .then((r) => r.json())
      .then((j) => { if (j.success) setAdditions(j.data); })
      .catch(() => {}); // silent – nav falls back to static
  }, []);

  if (additions.length === 0) return staticNavItems;

  // Deep-clone static items so we don't mutate the module export
  const merged: NavItem[] = JSON.parse(JSON.stringify(staticNavItems));

  for (const addition of additions) {
    const navEntry = merged.find(
      (n) => n.label.toLowerCase() === addition.nav_parent.toLowerCase()
    );

    const newItem = {
      label: addition.item_label,
      href: `/pages/${addition.page_slug}`,
    };

    if (navEntry) {
      if (!navEntry.groups) navEntry.groups = [];

      const group = navEntry.groups.find(
        (g: SubMenuGroup) =>
          g.heading.toLowerCase() === addition.group_heading.toLowerCase()
      );

      if (group) {
        // Insert at the right display_order position
        const insertAt = group.items.findIndex(
          (_, i) => (group.items[i] as any)._dynamic_order > addition.display_order
        );
        const itemWithOrder = { ...newItem, _dynamic_order: addition.display_order };
        if (insertAt === -1) group.items.push(itemWithOrder);
        else group.items.splice(insertAt, 0, itemWithOrder);
      } else {
        // Create a new group for the DB-driven heading
        navEntry.groups.push({
          heading: addition.group_heading,
          items: [newItem],
        });
      }
    }
  }

  return merged;
}
