"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award, Clock, Globe } from "lucide-react";

import abraham from "@/assets/abraham.jpg";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };


export default function WhyUs() {
  const features = [
    {
      id: "proven",
      icon: <Target className="h-6 w-6" />,
      title: "Proven Methodologies",
      description:
        "Built on years of tested leadership frameworks that inspire real, measurable transformation.",
    },
    {
      id: "facilitators",
      icon: <Users className="h-6 w-6" />,
      title: "Expert Facilitators",
      description:
        "Guided by leaders who bring decades of global executive experience.",
    },
    {
      id: "customized",
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Customized Solutions",
      description:
        "Every program is tailored to your organization’s unique goals and challenges.",
    },
    {
      id: "measurable",
      icon: <Award className="h-6 w-6" />,
      title: "Measurable Results",
      description:
        "Clear KPIs and structured evaluation ensure long-term leadership growth.",
    },
    {
      id: "support",
      icon: <Clock className="h-6 w-6" />,
      title: "Ongoing Support",
      description:
        "Continuous mentorship and post-program follow-ups to cement leadership habits.",
    },
    {
      id: "global",
      icon: <Globe className="h-6 w-6" />,
      title: "Global Perspective",
      description:
        "Blending international best practices for modern teams and organizations.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section className="py-24 g-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-gold-400/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Founder */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-6 leading-tight">
            Why Leaders Choose{" "}
            <span className="text-gold">
              Reholife
            </span>
          </h2>

          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-2 ring-gold-400/60 backdrop-blur-sm md:mt-6">
              <Image
                src={abraham}
                alt="Founder — Abraham Shankar"
                width={380}
                height={380}
                className="object-cover md:grayscale md:hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </motion.div>

          <h3 className="text-3xl font-bold text-gray-100">Abraham Shankar</h3>
          <p className="text-xl text-gray-100/70 mb-8">(Founder)</p>

          <p className="text-xl md:text-2xl font-semibold bg-gold border border-gray-900/60 p-4 rounded-lg mx-auto max-w-3xl">
            “Together, In Every Generation, To Become and Raise Godly Elite
            Selfless Perennials (GESP).”
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={item} className="h-full">
              <Card className="h-full flex flex-col  bg-gray-900 border border-gold/20 rounded-lg hover:border-gold transition-all duration-300">
                <CardHeader className="px-6 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-gold-400/30 p-3 text-gold-400 shadow-sm flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-100">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-100 mt-1">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="mt-4 px-6 pb-6 flex-grow">
                  <p className="text-sm text-gray-100/70 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="md:text-4xl text-xl font-bold text-gray-100">Start Your Leadership Journey Now!</h3>

          <div className="inline-block mt-8">
            <Button className="bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold text-xl px-8 py-6 rounded-xl shadow-lg hover:shadow-gold-500/60 transition-all duration-300 hover:scale-105" 
            onClick={() => scrollToSection("contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
