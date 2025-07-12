import arrowImage from "../assets/images/service-arrow.png";

const services = [
  {
    id: "01",
    title: "Business/Service/Brand Owner",
    description:
      "Small, Medium and Large enterprises can now represent their brand and contact information in simple effective ways across all locations. Both on and offline.",
  },
  {
    id: "02",
    title: "Contributor",
    description:
      "The best source of information is YOU, the Users. Local Contributors are chosen from all over to provide the local information to make the service work better for everyone.",
  },
  {
    id: "03",
    title: "Registrar",
    description:
      "This is the Affiliate Earnings Program that allows approved Registrars to earn commissions from providing leads to paying listings. For registered users only.",
  },
];

const Services = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      {/* Top Text */}
      <p className="text-sm text-gray-500">What we do</p>

      {/* Heading with Arrow */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-5xl font-bold">Services</h2>
        <img
          src={arrowImage}
          alt="Arrow"
          className="h-[2.8rem] w-auto object-contain"
        />
      </div>

      {/* Services List */}
      <div className="border-y border-gray-300 divide-y divide-gray-300">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col md:flex-row gap-6 py-16 items-start md:items-center"
          >
            {/* Left Side with Title and Description */}
            <div className="md:w-2/3 border-r border-gray-300 pr-6">
              {/* Title and ID in the same line */}
              <div className="flex justify-between items-start md:items-center flex-wrap gap-y-4 pb-20">
                <h3 className="text-customGold text-5xl md:text-6xl font-extrabold leading-tight">
                  {service.title.split("/").map((part, idx, arr) => (
                    <div key={idx}>
                      {part.trim()}
                      {idx < arr.length - 1 && "/"}
                    </div>
                  ))}
                </h3>
              </div>

              {/* Description + Button */}
              <div className="flex justify-between items-center flex-wrap gap-4 mt-8">
                <p className="text-sm text-gray-600 max-w-xl">
                  {service.description}
                </p>
                <button className="px-4 py-2 border border-black text-black rounded-full text-sm font-medium hover:bg-black hover:text-customGold transition whitespace-nowrap">
                  Explore more →
                </button>
              </div>
            </div>

            {/* Right Side with ID */}
            <div className="md:w-1/3 text-right text-5xl md:text-9xl font-semibold text-customGold mt-6 md:mt-0 pl-6">
              {service.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
