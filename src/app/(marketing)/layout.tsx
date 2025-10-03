import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        {children}
        <Navbar />
        <Hero />
        <Features />
        <Benefits />
        <Footer />
      </div>
    </div>
  );
}
