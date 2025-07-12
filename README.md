# 🐝 BEEKEYS - Verified Business Directory

**BEEKEYS** is a modern, trust-backed business listing platform that lets users browse, verify, and connect with local businesses—each uniquely identified by a Beekey handle (e.g., `@coffeeshop`). Built with React, Tailwind CSS, and SwiperJS.

---

## 🚀 Features

- 🔎 **Search or Browse** businesses by category or location.
- ✅ **Verified Listings** with trust badges and manual review.
- 📍 **Location-aware listings** and sharing options.
- 💬 **Customer Testimonials** with glassmorphism UI.
- 📱 **Responsive Swiper carousel** for mobile experiences.
- 🌐 **Fast and lightweight** frontend using TailwindCSS.

---

## 🛠️ Tech Stack

| Frontend         | UI Framework       | Carousel         | State/Data     |
|------------------|--------------------|------------------|----------------|
| React (Vite/CRA) | Tailwind CSS       | SwiperJS         | JSON + useEffect |

---

## 📁 Folder Structure

/public
└── assets
└── data.json # Business listings
/src
├── assets/images # Static images
├── components # Modular React components
│ ├── Hero.jsx
│ ├── Features.jsx
│ ├── Listings.jsx
│ ├── HowWeWork.jsx
│ ├── Testimonials.jsx
│ ├── Services.jsx
│ └── Navbar/Footer.jsx
├── App.js # Main App wrapper
├── index.js # React root rendering
└── tailwind.config.js # Tailwind theme config

 **Clone the repository**

   ```bash
   git clone https://github.com/your-username/beekeys.git
   cd beekeys

   Install dependencies

npm install
Run the project

npm run dev   # or npm start (if using CRA)
Open in browser
Visit http://localhost:5173 (or your local port) to view the app.

🧩 Components Breakdown
🔸 Hero.jsx
Catchy landing hero with call-to-action.

Includes an animated header and tagline.

🔸 Listings.jsx
Loads businesses dynamically from data.json.

Cards include image, category, location, and rating badge.

🔸 HowWeWork.jsx
Step-by-step user onboarding flow.

Uses Swiper for mobile + Grid for desktop.

🔸 Testimonials.jsx
Customer quote in a glassmorphic card overlaying a custom background image.

Styled using backdrop-blur-md and bg-white/20.

🖼️ Sample Listings (data.json)
[
  {
    "id": 1,
    "name": "Coffee Central",
    "category": "Cafe",
    "location": "Lagos",
    "image": "https://source.unsplash.com/coffee",
    "rating": 4.5
  }
]


🎨 Tailwind Customization
bg-customGold defined in tailwind.config.js as:

colors: {
  customGold: '#D4AF37'}

📦 Dependencies
React

Tailwind CSS

Swiper (swiper/react)

Vite / CRA

Icons (e.g. Heroicons or FontAwesome - optional)

📌 To-Do
 Add backend API integration

 Business claim flow

 Pagination for listings

 Admin panel for approval

 Auth integration (OAuth or Firebase)


 🌐 Demo
🔗 Live Preview — replace with your deployed site