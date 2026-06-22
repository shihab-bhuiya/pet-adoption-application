"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function FeaturedPets() {
  const [topPets, setTopPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPets = async () => {
      try {
        const res = await fetch(`https://pet-adoption-application-server.vercel.app/public-pets`);
        if (!res.ok) throw new Error("Failed to load listings");

        const data = await res.json();
        // ✅ Get exactly the top 5 pets
        setTopPets(data.slice(0, 5));
      } catch (error) {
        console.error("Error loading top pets:", error);
        toast.error("Could not load featured pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopPets();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="badge badge-accent badge-soft font-bold px-4 py-3 uppercase tracking-wide text-xs mb-2">
          Meet Our Cutest Companions
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Top Featured Pets
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-md">
          These sweet souls are looking for a warm bed and a loving family. Take a look at who just arrived!
        </p>
      </div>

      {/* Grid Content */}
      {loading ? (
        /* Loading Skeletons */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 w-full bg-white p-4 border rounded-2xl">
              <div className="skeleton h-40 w-full rounded-xl"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-8 w-full mt-2"></div>
            </div>
          ))}
        </div>
      ) : topPets.length === 0 ? (
        <div className="text-center p-12 bg-white border rounded-2xl shadow-sm max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-600">No pets available right now</h3>
          <p className="text-gray-400 mt-1">Check back soon to see updated profiles!</p>
        </div>
      ) : (
        /* Pet Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {topPets.map((pet) => (
            <div
              key={pet._id}
              className="card bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <figure className="relative h-44 w-full bg-slate-100 shrink-0">
                <img
                  src={pet.image || "https://placehold.co/400x300"}
                  alt={pet.petName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 badge badge-accent text-white font-bold text-[10px] uppercase px-2 py-1.5 shadow-sm">
                  {pet.species}
                </span>
              </figure>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-slate-800 truncate pr-1">{pet.petName}</h3>
                    <span className="text-sm font-extrabold text-success shrink-0">
                      {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 font-medium mb-1 truncate">
                    Breed: <span className="text-slate-700 font-semibold">{pet.breed}</span>
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-4">
                    <MapPin size={12} className="text-slate-400 shrink-0" />
                    <span className="truncate text-slate-600">{pet.location || "Earth"}</span>
                  </div>
                </div>

                <Link
                  href={`/pets/${pet._id}`}
                  className="btn btn-sm btn-outline btn-accent w-full text-xs font-bold rounded-xl shadow-2xs group"
                >
                  View Profile
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Center Action Button */}
      <div className="flex justify-center mt-12">
        <Link
          href="/pets"
          className="btn btn-wide btn-lg bg-slate-900 hover:bg-slate-800 text-white border-none font-bold shadow-lg transition-transform hover:scale-[1.02] rounded-2xl flex items-center gap-2"
        >
          Browse All Pets 🐾
        </Link>
      </div>
    </section>
  );
}