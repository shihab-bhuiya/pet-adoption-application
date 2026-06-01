export default function StatsSection() {
  const stats = [
    {
      value: "2,500+",
      label: "Pets Adopted",
    },
    {
      value: "1,800+",
      label: "Happy Families",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
    },
    {
      value: "24/7",
      label: "Support Available",
    },
  ];

  return (
    <section className="py-16 bg-base-100">

      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Our Impact in Numbers
          </h2>

          <p className="text-gray-500 mt-2">
            We are proud of the love and trust our community has given us.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition"
            >
              <h3 className="text-4xl font-bold text-green-600">
                {item.value}
              </h3>

              <p className="mt-2 text-gray-600 font-medium">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}