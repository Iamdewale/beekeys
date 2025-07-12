const Logos = () => {
  const logos = [
    "/assets/logos/Logo6.png",
    "/assets/logos/Logo5.png",
    "/assets/logos/Logo4.png",
    "/assets/logos/Logo3.png",
    "/assets/logos/Logo2.png",
    "/assets/logos/Logo1.png",
  ];

  return (
    <section className="bg-heroBg py-8 overflow-hidden">
      <div className="w-full whitespace-nowrap">
        <div className="flex gap-12 animate-scroll">
          {logos.concat(logos).map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Brand Logo ${idx + 1}`}
              className="h-10 opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
