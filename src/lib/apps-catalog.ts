import type { Section } from "../data/apps";

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

export function buildAppsTocHeadings(sections: Section[]): TocHeading[] {
  return [
    ...sections.map((section) => ({ depth: 2, slug: section.id, text: section.title })),
    { depth: 2, slug: "good-to-know", text: "Good to Know" },
  ];
}

export function countUniqueAppNames(sections: Section[]): number {
  const uniqueAppNames = new Set<string>();

  sections.forEach((section) => {
    if (section.kind === "groups") {
      section.groups.forEach((group) => group.apps.forEach((app) => uniqueAppNames.add(app.name)));
    } else {
      section.apps.forEach((app) => uniqueAppNames.add(app.name));
    }
  });

  return uniqueAppNames.size;
}
