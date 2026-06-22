import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-green-100 to-blue-100 py-20 px-6">

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Find Your Perfect <span className="text-green-600">Furry Friend</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Adopt loving pets and give them a second chance at life.
            Browse dogs, cats, birds, and more from trusted owners and shelters.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <Link
              href="/pets"
              className="btn btn-primary px-6 py-3 text-white"
            >
              Adopt Now
            </Link>

            <Link
              href="/dashboard/add-pet"
              className="btn btn-outline btn-success px-6 py-3"
            >
              Add a Pet
            </Link>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
            alt="happy pets"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}