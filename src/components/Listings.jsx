import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Listings = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch((err) => console.error("Failed to load listings", err));
  }, []);

  // Generate star icons based on rating
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
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold mb-10">Popular Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={biz.image}
              alt={biz.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{biz.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{biz.category}</p>
              <p className="text-gray-500 text-xs mb-2">{biz.location}</p>

              {/* Star Rating Badge */}
              <div className="flex items-center space-x-1 text-sm text-yellow-600">
                {renderStars(biz.rating)}
                <span className="ml-2 text-gray-600 font-medium">
                  {biz.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listings;
