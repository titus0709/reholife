"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Using Brevo (formerly Sendinblue) - Free tier: 300 emails/day
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY || "YOUR_BREVO_API_KEY",
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // Replace with your list ID
          updateEnabled: true,
        }),
      });

      if (response.ok || response.status === 204) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-black border border-gold/20 rounded-lg p-8 md:p-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Download className="w-16 h-16 text-gold mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Leadership Framework
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to our newsletter and receive our comprehensive Leadership Framework PDF, plus weekly insights and exclusive resources.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-gray-900 border-gray-800 text-white focus:border-gold focus:ring-gold"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-gold text-black hover:bg-gold/90 hover-gold-glow px-8"
              >
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            
            {status === "success" && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold mt-4"
              >
                Success! Check your email for the free PDF.
              </motion.p>
            )}
            
            {status === "error" && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 mt-4"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}