import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      text: `Finally, a directory that addresses the fake business listing problem! The trademark backing is genius. The clean interface makes it easy to understand what they’re offering. I can see this being really useful for local SEO and brand.`,
      name: "Esther Howard",
      role: "Small Business Owner",
    },
    {
      text: `I was surprised at how smooth and intuitive the platform felt. It’s refreshing to see a clean design that doesn't sacrifice clarity for style. I’ll definitely recommend this to my network.`,
      name: "Leslie Alexander",
      role: "Startup Founder",
    },
    {
      text: `The trademark validation is such a game-changer. I've been burned by fake listings before — this feels like a safer, smarter alternative.`,
      name: "Jacob Jones",
      role: "Digital Marketer",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  }, [index]);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <p className="text-1 font-semibold text-gray-500">
        What people are saying about us
      </p>
      <h2 className="text-5xl font-semibold mt-2 mb-6">Customer’s Feedbacks</h2>

      <div className="rounded-xl overflow-hidden">
        <div
          className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div
            ref={scrollRef}
            className="flex w-full max-w-5xl overflow-hidden scroll-smooth snap-x snap-mandatory"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-full flex justify-center items-center snap-start flex-shrink-0 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md text-white px-6 py-10 rounded-xl shadow-lg h-[410px] w-full max-w-xl text-center flex flex-col justify-center">
                  <p className="text-lg italic mb-6">“{t.text}”</p>
                  <p className="font-semibold text-white text-base">{t.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
