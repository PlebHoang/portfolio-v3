import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900 z-50 cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[580px] bg-[#F7F6F3] border-l border-[#d4d4d0] shadow-2xl z-50 flex flex-col overflow-hidden text-[#111111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4d4d0]">
              <span className="font-sans font-bold tracking-widest text-sm uppercase text-[#111111]">
                {title}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-[#d4d4d0] hover:border-black hover:text-black transition-colors group"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
