"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, PawPrint, Heart, Calendar, ShieldCheck, Mail, MessageSquare, Edit3, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // ✅ Import Better Auth

export default function PetDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const petId = params.id;
  const router = useRouter();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Get real logged-in user email from Better Auth session
  const { data: session } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const res = await fetch(`https://pet-adoption-application-server.vercel.app/pets/${petId}`);
        if (!res.ok) throw new Error("Pet not found");
        const data = await res.json();
        setPet(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load pet details.");
      } finally {
        setLoading(false);
      }
    };

    if (petId) fetchPetDetails();
  }, [petId]);

  // ✅ Handle Delete Action (Protected: Double checks ownership before executing)
  const handleDelete = async () => {
    if (!loggedInUserEmail || loggedInUserEmail !== pet.ownerEmail) {
      toast.error("Unauthorized: Only the pet owner can delete this listing.");
      return;
    }

    toast((t) => (
      <span>
        Are you sure you want to delete this pet listing?{" "}
        <button
          className="btn btn-xs btn-error ml-2 text-white"
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              const res = await fetch(`https://pet-adoption-application-server.vercel.app/pets/${pet._id}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (data.deletedCount > 0) {
                toast.success("Pet listing deleted successfully!");
                router.push("/dashboard/my-listings"); // Redirect back to owner listings page
              } else {
                toast.error("Could not delete. Try again.");
              }
            } catch (error) {
              console.error("Error deleting pet:", error);
              toast.error("Something went wrong. Try again.");
            }
          }}
        >
          Yes, Delete
        </button>
        <button
          className="btn btn-xs btn-outline ml-1"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </span>
    ), { duration: 6000 });
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();

    // ✅ Block submission if user is not logged in
    if (!loggedInUserEmail) {
      toast.error("You must be logged in to adopt a pet.");
      return;
    }

    // ✅ Block owner from adopting their own pet
    if (loggedInUserEmail === pet.ownerEmail) {
      toast.error("You cannot adopt your own pet! 😅");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const pickupDate = formData.get("pickupDate");
    const userMessage = formData.get("message");

    const adoptionRequest = {
      petId: pet._id,
      requesterEmail: loggedInUserEmail,
      pickupDate: pickupDate,
      message: userMessage || "I promise to give this sweet pet a loving home!",
    };

    try {
      const res = await fetch("https://pet-adoption-application-server.vercel.app/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionRequest),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Adoption application submitted successfully! 🎉");
        document.getElementById("adoption_modal").close();
        router.push("/dashboard/my-requests");
      } else {
        toast.error(data.message || "Could not submit request. Try again.");
      }
    } catch (error) {
      console.error("Error submitting adoption:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center p-12 text-red-500 font-bold">
        Pet profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      {/* Back Button */}
      <button onClick={() => router.back()} className="btn btn-ghost mb-6">
        ← Back to Catalog
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-white border rounded-3xl p-6 shadow-sm">
        {/* Left Side: Image Banner */}
        <div className="h-[450px] w-full rounded-2xl overflow-hidden bg-gray-50 border">
          <img
            src={pet.image || "https://placehold.co/600x450"}
            alt={pet.petName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Profile Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex gap-2 items-center mb-3">
              <span className="badge badge-secondary text-white font-semibold p-3 shadow-sm">
                {pet.adoptionFee === 0 ? "Free Adoption" : `Fee: $${pet.adoptionFee}`}
              </span>
              <span className="badge badge-outline">{pet.species}</span>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">{pet.petName}</h1>
            <p className="text-gray-500 text-lg font-medium mb-6">{pet.breed}</p>

            {/* Quick Spec Grid */}
            <div className="grid grid-cols-2 gap-4 bg-base-50 p-4 rounded-2xl border mb-6">
              <div className="flex items-center gap-3">
                <Heart className="text-pink-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Age</p>
                  <p className="font-bold text-slate-700">{pet.age} Years</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PawPrint className="text-cyan-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Gender</p>
                  <p className="font-bold text-slate-700">{pet.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Vaccination</p>
                  <p className="font-bold text-slate-700">{pet.vaccinationStatus}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-amber-500" size={20} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="font-bold text-slate-700 truncate max-w-[150px]">
                    {pet.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Health Status */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 mb-1">Health Status:</h3>
              <p className="text-gray-600 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 inline-block text-sm font-medium">
                {pet.healthStatus || "Healthy & Energetic"}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 mb-1">About {pet.petName}:</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{pet.description}</p>
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="border-t pt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 max-w-[180px]">
              <Mail size={16} className="shrink-0" />
              <span className="truncate">Listed by: {pet.ownerEmail}</span>
            </div>

            {/* ✅ STRICT PROTECTION: Show Edit/Delete ONLY if the current logged-in user is the pet owner */}
            {loggedInUserEmail && loggedInUserEmail === pet.ownerEmail ? (
              <div className="flex gap-2 flex-1">
                <Link
                  href={`/dashboard/update-pet/${pet._id}`}
                  className="btn btn-warning text-white font-bold flex-1 gap-1 shadow"
                >
                  <Edit3 size={16} /> Edit Listing
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-error text-white font-bold flex-1 gap-1 shadow"
                >
                  <Trash2 size={16} /> Delete Listing
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!loggedInUserEmail) {
                    toast.error("Please log in to adopt a pet.");
                    return;
                  }
                  document.getElementById("adoption_modal").showModal();
                }}
                className="btn btn-secondary text-white font-bold px-8 flex-1 shadow"
              >
                Adopt {pet.petName} Now 🐾
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DAISYUI POPUP MODAL DIALOG */}
      <dialog id="adoption_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-2xl p-6">
          <h3 className="font-extrabold text-2xl text-slate-800 mb-2">Request Adoption</h3>
          <p className="text-gray-500 text-sm mb-4">
            You are applying to adopt{" "}
            <strong className="text-secondary">{pet.petName}</strong>. Please
            provide your configuration options to the owner below.
          </p>

          <form onSubmit={handleAdoptSubmit}>
            {/* Input 1: Pickup Date Selection */}
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-bold text-gray-600 flex items-center gap-1">
                  <Calendar size={16} /> Choose a Pickup Date
                </span>
              </label>
              <input
                type="date"
                name="pickupDate"
                className="input input-bordered w-full text-slate-700 bg-white"
                required
              />
            </div>

            {/* Input 2: Message Note TextArea */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text font-bold text-gray-600 flex items-center gap-1">
                  <MessageSquare size={16} /> Note to Pet Owner
                </span>
              </label>
              <textarea
                name="message"
                className="textarea textarea-bordered h-24 w-full text-slate-700 bg-white"
                placeholder="Tell the owner why you are a great fit for this pet..."
                defaultValue="I promise to give this sweet pet a loving home!"
                required
              ></textarea>
            </div>

            {/* Action Buttons inside Form */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("adoption_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-secondary text-white font-bold px-6"
              >
                {submitting ? "Submitting..." : "Confirm Request 🚀"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}