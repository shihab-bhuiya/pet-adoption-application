"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, PawPrint } from "lucide-react";

export default function PublicPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/public-pets");
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching public pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      {/* Header Banner */}
      <div className="text-center my-12">
        <h1 className="text-5xl font-extrabold mb-4">
          Find Your New <span className="text-secondary">Best Friend</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Browse through hundreds of pets looking for a loving home. Your perfect companion is just a click away.
        </p>
      </div>

      {/* Grid Layout */}
      {pets.length === 0 ? (
        <div className="text-center p-12 bg-base-100 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-700">No pets available right now</h2>
          <p className="text-gray-400 mt-2">Check back later or listing your own pet!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200">
              <figure className="relative h-48 w-full bg-gray-100">
                <img
                  src={pet.image || "https://placehold.co/400x300"}
                  alt={pet.petName}
                  className="object-cover h-full w-full"
                />
                <span className="absolute top-3 right-3 badge badge-secondary font-semibold p-3 text-white shadow">
                  {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                </span>
              </figure>
              
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl text-slate-800 font-bold">{pet.petName}</h2>
                  <span className="badge badge-outline text-xs">{pet.species}</span>
                </div>
                
                <p className="text-gray-500 text-sm font-medium mt-1">{pet.breed}</p>
                
                <div className="divider my-2"></div>
                
                <div className="flex flex-col gap-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <PawPrint size={16} className="text-pink-500" />
                    <span>Age: <strong className="text-slate-700">{pet.age} years</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-cyan-500" />
                    <span className="truncate">{pet.location}</span>
                  </div>
                </div>

                <div className="card-actions mt-5">
                  <Link href={`/pets/${pet._id}`} className="btn btn-secondary btn-block text-white font-bold">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}