import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import GalleryCarousel from "@/app/components/GalleryCarousel";
import BookingForm from "@/app/components/BookingForm";
import ServicesSection from "@/app/components/ServicesSection";
import React from "react";


export default function Home() {
  return (
    <div className="font-sans flex flex-col w-full">
      <Navbar />
      <Hero />
      <GalleryCarousel />
      <ServicesSection />
      <BookingForm />
      <footer id="contact" className="border-t border-border/50 py-10 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Heritage Wash Plus. All rights reserved.
      </footer>
    </div>
  );

}
