import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const steps = [
  {
    id: "1",
    title: "Search or Browse",
    description:
      "Find businesses by category, location, or search directly with their Beekey handle like @coffeeshop",
  },
  {
    id: "2",
    title: "Verify Trust",
    description:
      "Look for our verification badges every business is manually reviewed and owner-approved.",
  },
  {
    id: "3",
    title: "Connect & Share",
    description:
      "Get verified contact info, directions, and easily share the Beekey handle with friends.",
  },
];

const HowWeWork = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-gray-500 mb-2">Get started with us</p>
        <h2 className="text-5xl font-semibold mb-12">How we work</h2>

        {/* Mobile Swiper */}
        <div className="md:hidden -mx-4 px-4">
          <Swiper spaceBetween={16} slidesPerView={1.1}>
            {steps.map((step) => (
              <SwiperSlide key={step.id}>
                <div className="bg-white min-h-[250px] p-6 rounded-xl border border-gray-200 text-left shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-customGold text-white font-bold text-3xl mb-6">
                      {step.id}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-700">{step.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white min-h-[250px] p-6 rounded-xl border border-gray-200 text-left shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-customGold text-white font-bold text-3xl mb-6">
                  {step.id}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
