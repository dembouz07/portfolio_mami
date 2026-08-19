import { useEffect } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { ScrollProgress } from "./components/common";
import { Footer, Navigation } from "./components/layout";
import { About, Contact, Education, Experience, Hero, Projects, Skills } from "./sections";

export function App() {
  useEffect(() => {
    const syncPageVisibility = () => {
      document.documentElement.dataset.pageVisibility = document.hidden ? "hidden" : "visible";
    };

    syncPageVisibility();
    document.addEventListener("visibilitychange", syncPageVisibility);

    return () => {
      document.removeEventListener("visibilitychange", syncPageVisibility);
      delete document.documentElement.dataset.pageVisibility;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <ScrollProgress />
        <Navigation />
        <main id="contenu-principal" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
