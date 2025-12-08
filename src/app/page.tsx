"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhyUs from "@/components/WhyUs";
import Youtube from "@/components/Youtube";

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Benefits />
      <TrustBar />
      <Services />
      <WhyUs />
      <Youtube />
      <Testimonials />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
}