"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
  
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>

  );
};

export default PageWrapper;
