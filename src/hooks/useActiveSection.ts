import { useEffect, useMemo, useState } from "react";

export interface UseActiveSectionOptions {
  readonly rootMargin?: string;
  readonly threshold?: number | readonly number[];
}

const DEFAULT_THRESHOLDS = [0, 0.1, 0.25, 0.5, 0.75] as const;

function normalizeThresholds(
  threshold: number | readonly number[] | undefined,
): readonly number[] {
  if (typeof threshold === "number") {
    return [threshold];
  }

  return threshold ?? DEFAULT_THRESHOLDS;
}

export function useActiveSection(
  sectionIds: readonly string[],
  options: UseActiveSectionOptions = {},
): string {
  const sectionKey = sectionIds.join("\u001f");
  const thresholdKey = normalizeThresholds(options.threshold).join(",");
  const rootMargin = options.rootMargin ?? "-35% 0px -55% 0px";
  const initialSection = sectionIds[0] ?? "";
  const [activeSection, setActiveSection] = useState(initialSection);

  const thresholds = useMemo(() => {
    const parsed = thresholdKey
      .split(",")
      .map(Number)
      .filter((value) => Number.isFinite(value) && value >= 0 && value <= 1);

    return parsed.length > 0 ? parsed : [0];
  }, [thresholdKey]);

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split("\u001f") : [];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observedEntries = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          observedEntries.set(entry.target, entry);
        }

        const visible = [...observedEntries.values()]
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => {
            const ratioDifference = right.intersectionRatio - left.intersectionRatio;
            if (ratioDifference !== 0) {
              return ratioDifference;
            }

            return (
              Math.abs(left.boundingClientRect.top) -
              Math.abs(right.boundingClientRect.top)
            );
          });

        const nextSection = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (nextSection) {
          setActiveSection(nextSection);
        }
      },
      { rootMargin, threshold: thresholds },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [rootMargin, sectionKey, thresholds]);

  return activeSection;
}
