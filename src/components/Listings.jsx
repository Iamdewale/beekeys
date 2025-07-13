import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Listings = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch((err) => console.error("Failed to load listings", err));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      {/* Section Title */}
      <h2 className="text-4xl font-bold mb-12">Popular Listings</h2>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {businesses.map((biz, index) => (
          <motion.div
            key={biz.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={biz.image}
              alt={biz.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {biz.name}
              </h3>
              <p className="text-sm text-gray-500">{biz.category}</p>
              <p className="text-xs text-gray-400">{biz.location}</p>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 text-yellow-500 text-sm mt-2">
                {renderStars(biz.rating)}
                <span className="ml-2 text-gray-600 font-medium">
                  {biz.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Listings;
