"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function PublicPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 MODAL STATES (replacement of prompt)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [message, setMessage] = useState("");

  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  useEffect(() => {
    const fetchPublicPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/public-pets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
        toast.error("Failed to load pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPets();
  }, []);

  // 🔥 OPEN MODAL (instead of prompt)
  const handleAdoptRequest = (pet) => {
    if (!loggedInUserEmail) {
      toast.error("Please login first.");
      return;
    }

    if (!pet.ownerEmail) {
      toast.error("Invalid listing (missing owner).");
      return;
    }

    if (loggedInUserEmail === pet.ownerEmail) {
      toast.error("You cannot adopt your own pet.");
      return;
    }

    setSelectedPet(pet);
    setMessage("");
    setIsModalOpen(true);
  };

  // 🔥 SUBMIT REQUEST
  const submitAdoptionRequest = async () => {
    if (!message.trim()) {
      toast.error("Please write a message.");
      return;
    }

    const loadingToast = toast.loading("Sending adoption request...");

    try {
      const res = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: selectedPet._id,
          requesterEmail: loggedInUserEmail,
          message,
        }),
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success(`Request sent for ${selectedPet.petName} ❤️`);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to send request");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Network error. Try again.");
    }
  };

  if (loading || sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Available Pets for Adoption
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          Browse companions looking for a forever home
        </p>

        {loggedInUserEmail && (
          <div className="mt-2 text-xs text-green-600 font-mono bg-green-50 inline-block px-3 py-1 rounded-full border border-green-200">
            Logged in as: {loggedInUserEmail}
          </div>
        )}
      </div>

      {/* PET GRID (UNCHANGED SAFE AREA) */}
      {pets.length === 0 ? (
        <div className="text-center p-12 border bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-600">
            No pets available right now
          </h3>
          <p className="text-gray-400 mt-1">
            Check back later or post your own listing!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {pets.map((pet) => (
            <div
              key={pet._id}
              className="card bg-white border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
            >

              {/* IMAGE (UNCHANGED) */}
              <figure className="relative h-56 bg-gray-100">
                <img
                  src={pet.image || "https://placehold.co/400x300"}
                  alt={pet.petName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300";
                  }}
                />

                <span className="absolute top-3 right-3 badge badge-primary text-white text-xs">
                  {pet.species}
                </span>
              </figure>

              {/* BODY */}
              <div className="card-body p-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {pet.petName}
                </h2>

                <p className="text-sm text-gray-500">
                  Breed: {pet.breed}
                </p>

                <p className="text-sm text-gray-500">
                  Location: {pet.location || "Not specified"}
                </p>

                {/* ACTIONS */}
                <div className="mt-4 flex gap-3">

                  <Link
                    href={`/pets/${pet._id}`}
                    className="btn btn-outline btn-primary flex-1"
                  >
                    View Details
                  </Link>

                  {loggedInUserEmail === pet.ownerEmail ? (
                    <button
                      disabled
                      className="btn flex-1 bg-gray-100 text-gray-400"
                    >
                      Your Listing
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdoptRequest(pet)}
                      className="btn btn-primary flex-1"
                    >
                      Request Adoption
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* 🔥 MODAL (ONLY NEW UI PART) */}
      {isModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-bold mb-2">
              Message for {selectedPet.petName}
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              Write a personal message to increase adoption chances
            </p>

            <textarea
              className="w-full border rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-primary"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I would love to adopt this pet and take care of it..."
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={submitAdoptionRequest}
              >
                Send Request
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}