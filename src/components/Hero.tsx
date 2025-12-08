"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import goldenChess from "@/assets/goldenChess.jpg";

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  const heading = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sub = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.8 } } };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — Transform your leadership journey"
    >
      {/* Background image layer (blurred) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover transform-gpu"
        style={{
          backgroundImage: `url(${goldenChess.src})`,
          filter: "blur(4px) saturate(0.95)",
          transform: "scale(1.06)",
        }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      {/* Subtle gold vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/40 mix-blend-overlay" />

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            initial="hidden"
            animate="show"
            
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            Transform Your{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-gold"
              aria-hidden={false}
            >
              Leadership Journey
            </motion.span>
          </motion.h1>

          <motion.p initial="hidden" animate="show" variants={sub} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Empowering leaders in churches, schools, colleges, and workplaces with proven strategies for lasting impact.
          </motion.p>

          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { delayChildren: 0.6 } } }} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {/* Primary CTA */}
            <motion.div whileHover={prefersReduced ? {} : { scale: 1.03 }} whileTap={prefersReduced ? {} : { scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="flex items-center gap-3 bg-gold text-black hover:bg-yellow-400/80 text-lg px-8 py-6 rounded-lg shadow-lg"
                aria-label="Book a session"
              >
                <span className="font-semibold">Book a Session</span>

                {/* icon animates on parent hover using framer-motion */}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={prefersReduced ? {} : { x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center"
                >
                  <ArrowRight />
                </motion.span>
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={prefersReduced ? {} : { scale: 1.03 }} whileTap={prefersReduced ? {} : { scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection("newsletter")}
                size="lg"
                variant="outline"
                className="border-2 border-gold text-gold bg-white/8 hover:bg-gold hover:text-black text-lg px-8 py-6 rounded-lg"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
