export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
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
          {/* GLASSMORPHISM BOX */}
          <div className="bg-white/20 backdrop-blur-md text-white px-4 pb-10 rounded-xl max-w-xl text-center shadow-lg min-h-[410px] flex flex-col justify-center">
            <p className="text-lg italic mb-6">
              "Finally, a directory that addresses the fake business listing
              problem! The trademark backing is genius. The clean interface
              makes it easy to understand what they’re offering. I can see this
              being really useful for local SEO and brand"
            </p>
            <p className="font-semibold text-white text-base">Esther Howard</p>
            <p className="text-sm text-gray-300 mt-1">Small Business Owner</p>
          </div>
        </div>
      </div>
    </section>
  );
}
