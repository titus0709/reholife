"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export default function YouTubeChannelCard() {
  const [open, setOpen] = useState(false);

  const channelUrl = "https://www.youtube.com/@reholifetamil";
  const channelUrlEng = "https://www.youtube.com/@reholifeenglish";
  const videoId = "E8iouMaXpz0"; // extracted from https://youtu.be/E8iouMaXpz0
  const title = "Latest from Our Channel";
  const description = "Watch a glimpse of our latest project and explore more on our YouTube channel.";
  const channelName = "Reholife Church Leadership";
  const avatarUrl = "https://yt3.googleusercontent.com/3Qo_HY6Skh3sCkXxh8HCMei-xkia4lJ8KD1dM36DWRq0GglvnAgwYCNWoAbIcDpbEnTLyBh0=s160-c-k-c0x00ffffff-no-rj";

  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Watch Us on Youtube</h2>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-black rounded-2xl shadow-2xl overflow-hidden border border-transparent"
        style={{
          borderImage: "",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 8px 30px rgba(212,175,55,0.06)",
        }}
      >
        <div className="relative md:w-2/3 mx-auto">
          <div
            role="button"
            aria-label="Play preview"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => (e.key === "Enter" ? setOpen(true) : null)}
            className="cursor-pointer select-none"
          >
            <div
              className="aspect-video bg-center bg-cover"
              style={{ backgroundImage: `url(${thumbnail})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-sm bg-black/40 border border-yellow-400/20 hover:bg-black/30"
                  style={{ boxShadow: "0 8px 24px rgba(212,175,55,0.12)" }}
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-md">
                    <Play size={18} />
                  </div>
                  <span className="text-sm font-medium text-white">Watch preview</span>
                </motion.button>
              </motion.div>
              <div className="absolute left-4 bottom-4 rounded-md px-3 py-1 bg-black/50 backdrop-blur-sm border border-yellow-600/20">
                <p className="text-xs text-yellow-300 font-semibold">{channelName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: "0 6px 18px rgba(212,175,55,0.08)" }}>
              <img src={avatarUrl} alt={`${channelName} avatar`} className="w-full h-full object-cover" />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white">{title}</h4>
              <p className="text-sm text-gray-300 mt-1 max-w-xl">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium shadow hover:opacity-95"
              style={{
                background: "linear-gradient(90deg,#D4AF37,#F3D48A)",
                color: "#0b0b0b",
             
              }}
            >
              English Channel
            </a> */}
           
            <button
                onClick={() => window.open(channelUrlEng, "_blank", "noopener,noreferrer")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full  border-yellow-700/20 text-sm text-white/90 bg-black/50 hover:bg-black/40 border-gold border-2"
            >
              <Play size={16} />
              English Channel
            </button>

            <button
                onClick={() => window.open(channelUrl, "_blank", "noopener,noreferrer")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full  border-yellow-700/20 text-sm text-white/90 bg-black/50 hover:bg-black/40 border-gold border-2"
            >
              <Play size={16} />
              Tamil Channel
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-xl overflow-hidden bg-black"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-center justify-between p-3 border-b border-yellow-900/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={avatarUrl} alt={`${channelName} avatar`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{channelName}</p>
                    <p className="text-xs text-gray-300">Preview</p>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-white/5"
                  aria-label="Close preview"
                >
                  <X />
                </button>
              </div>

              <div className="w-full bg-black">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="YouTube preview"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>

              <div className="p-4 flex items-center justify-end gap-3 border-t border-yellow-900/10">
                <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-3 py-2 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,#F3D48A)", color: "#0b0b0b" }}>
                  Open on YouTube
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-12" /> {/* Spacer */}
      
    </div>
  );
}
