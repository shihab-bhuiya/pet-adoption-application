export default function WhyPetHeaven() {
  const features = [
    {
      title: "Adopt with Confidence",
      desc: "We make the adoption process simple, safe, and rewarding for both you and your new companion.",
    },
    {
      title: "Save a Life",
      desc: "Every adoption gives a pet a second chance. You become a hero in their story.",
    },
    {
      title: "Join Our Community",
      desc: "Connect with thousands of happy pet owners who share tips, stories and support.",
    },
    {
      title: "Verified & Safe",
      desc: "All pets are health-checked, vaccinated and verified before being listed.",
    },
    {
      title: "Lifelong Support",
      desc: "Get expert guidance on pet care, training and wellness throughout your journey.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why PetNest?
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            Adopt with Confidence
          </p>

          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            We make the adoption process simple, safe, and rewarding for both you and your new companion.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-green-600">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}