"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function PublicPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch real logged-in user details from Better Auth session
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  useEffect(() => {
    const fetchPublicPets = async () => {
      try {
        console.log("Attempting to fetch public pets from backend...");
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
        console.log("Successfully fetched pets data:", data);
        setPets(data);
      } catch (error) {
        console.error("CRITICAL error fetching public listings:", error);
        toast.error(`Backend Unreachable: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPets();
  }, []);

  // ✅ Submit adoption request handling logic
  const handleAdoptRequest = async (pet) => {
    console.log("Request Adoption clicked for pet:", pet);
    console.log("Current Logged In User Email:", loggedInUserEmail);

    if (!loggedInUserEmail) {
      toast.error("Authentication required! Please login to submit a request.");
      return;
    }

    // Protection check to make sure the pet record actually has an owner email field
    if (!pet.ownerEmail) {
      console.error("Error: This pet document is missing the 'ownerEmail' property in MongoDB!", pet);
      toast.error("This listing is misconfigured in the database (Missing owner email).");
      return;
    }

    // Quick structural window prompt fallback for adding custom message notes
    const userMessage = prompt(
      `Write a message to the owner of ${pet.petName}:`, 
      "I promise to give this sweet pet a loving home!"
    );
    
    if (userMessage === null) {
      console.log("User cancelled the prompt modal.");
      return; 
    }

    const payload = {
      petId: pet._id,
      requesterEmail: loggedInUserEmail,
      message: userMessage,
    };

    console.log("Sending adoption request payload to backend:", payload);

    try {
      const res = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend response for adoption request:", data);

      if (res.ok) {
        toast.success(`Application for ${pet.petName} submitted successfully! 🎉`);
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Adoption apply network error:", error);
      toast.error("Network error! Could not connect to backend server.");
    }
  };

  // Keep showing spinner while either the backend data OR auth session is loading
  if (loading || sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Available Pets for Adoption
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Browse companions looking for a forever home. Click request to contact their current owner.
        </p>
        {loggedInUserEmail && (
          <div className="mt-2 text-xs text-green-600 font-mono bg-green-50 inline-block px-3 py-1 rounded-full border border-green-200">
            Logged in as: {loggedInUserEmail}
          </div>
        )}
      </div>

      {pets.length === 0 ? (
        <div className="text-center p-12 border bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-600">No pets available right now</h3>
          <p className="text-gray-400 mt-1">Check back later or post your own listing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div key={pet._id} className="card bg-white border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
              <figure className="relative h-56 bg-gray-100">
                <img
                  src={pet.image || "https://placehold.co/400x300"}
                  alt={pet.petName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300";
                  }}
                />
                <span className="absolute top-3 right-3 badge badge-primary text-white font-semibold px-3 py-2 text-xs uppercase shadow-sm">
                  {pet.species}
                </span>
              </figure>
              
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="card-title text-2xl font-bold text-slate-800">{pet.petName}</h2>
                  <span className="text-lg font-extrabold text-success">
                    {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 font-medium mb-1">Breed: <span className="text-gray-700">{pet.breed}</span></p>
                <p className="text-sm text-gray-500 font-medium mb-4">Location: <span className="text-gray-700">{pet.location || "Not specified"}</span></p>
                
                <div className="card-actions mt-2 w-full">
                  {loggedInUserEmail && loggedInUserEmail === pet.ownerEmail ? (
                    <button className="btn btn-disabled w-full bg-gray-100 border-gray-200 text-gray-400" disabled>
                      Your Own Listing
                    </button>
                  ) : (
                    <div className="flex gap-3 w-full">
                      <Link 
                        href={`/pets/${pet._id}`} 
                        className="btn btn-outline btn-primary flex-1 text-center"
                      >
                        View Details
                      </Link>

                      <button 
                        className="btn btn-primary flex-1 text-white font-semibold tracking-wide shadow-sm"
                        onClick={() => handleAdoptRequest(pet)}
                      >
                        Request Adoption
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}