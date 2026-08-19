import type { Project, ProjectFilter } from "../types/portfolio";

export function filterProjects<T extends Project>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  if (filter === "all") {
    return [...projects];
  }

  return projects.filter((project) => project.categories.includes(filter));
}
