import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type * as MotionReact from "motion/react";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof MotionReact>();
  return { ...actual, useReducedMotion: () => true };
});

import { AnimatedReveal, HeroPortraitMotion } from "../components/common";

it("supprime translations et parallaxe avec prefers-reduced-motion: reduce", () => {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string): MediaQueryList =>
      ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        dispatchEvent: vi.fn(),
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
      }) as MediaQueryList,
  );

  const { rerender } = render(
    <AnimatedReveal data-testid="reveal">Contenu lisible</AnimatedReveal>,
  );

  const reveal = screen.getByTestId("reveal");
  expect(reveal.style.transform).toBe("");
  expect(reveal.style.opacity).not.toBe("0");

  rerender(
    <HeroPortraitMotion>
      <div data-testid="portrait">Portrait</div>
    </HeroPortraitMotion>,
  );

  const portrait = screen.getByTestId("portrait");
  const animatedLayer = portrait.parentElement;
  fireEvent.pointerMove(animatedLayer?.parentElement ?? portrait, { clientX: 80, clientY: 40 });
  expect(animatedLayer?.style.transform ?? "").not.toMatch(/rotate|translate/i);
});
