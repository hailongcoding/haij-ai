"use client";

import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3 }}
        className="mb-2 flex items-center gap-3"
      >
        <span className="text-4xl">⚡</span>
        <span className="font-bold text-3xl text-primary md:text-4xl tracking-tight">
          hAIjacker
        </span>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.45 }}
        className="font-semibold text-xl md:text-2xl"
      >
        Elite AI for cybersecurity & code.
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="mt-1 text-muted-foreground text-base md:text-lg"
      >
        Uncensored. Direct. No restrictions.
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.75 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {["Penetration Testing", "CTF Challenges", "Exploit Dev", "OSINT", "Malware Analysis", "Red Team"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/30 bg-accent px-3 py-1 text-xs text-accent-foreground"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
