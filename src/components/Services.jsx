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
      <p className="text-sm text-gray-500">What we do</p>
      <h2 className="text-5xl font-bold mt-2 mb-10">Services</h2>

      <div className="border-y border-gray-300 divide-y divide-gray-300">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16 items-start md:items-center"
          >
            {/* LEFT COLUMN */}
            <div className="md:col-span-2 border-r border-gray-300 pr-6">
              <h3 className="text-customGold text-5xl md:text-6xl font-extrabold leading-tight pb-20">
                {service.title.split("/").map((line, idx) => (
                  <div key={idx}>
                    {line.trim()}
                    {idx < service.title.split("/").length - 1 && "/"}
                  </div>
                ))}
              </h3>

              {/* Description + Button */}
              <div className="flex justify-between items-center gap-4">
                <p className="text-sm text-gray-600 max-w-xl">
                  {service.description}
                </p>
                <button className="px-4 py-2 bg-white-400 border border-black-1 text-black rounded-full text-sm font-medium hover:bg-black hover:text-customGold transition whitespace-nowrap">
                  Explore more →
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN (ID number) */}
            <div className="text-right text-6xl md:text-9xl font-semibold text-customGold mt-4 md:mt-0">
              {service.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
