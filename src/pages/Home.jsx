import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Logos from "../components/Logos";
import Services from "../components/Services";
import HowWeWork from "../components/HowWeWorks";
import Listings from "../components/Listings";
import Testimonials from "../components/Testimonies";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : (
    <div>
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Services />
      <HowWeWork />
      <Listings />
      <Testimonials />
      <Footer />
    </div>
  );
}
