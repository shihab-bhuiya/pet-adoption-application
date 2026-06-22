"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // ✅ Import Better Auth

export default function AddPetPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // ✅ Read active logged-in account details dynamically from Better Auth session
  const { data: session, isPending } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  const handleAddPet = async (e) => {
    e.preventDefault();

    if (!loggedInUserEmail) {
      toast.error("You must be logged in to list a pet.");
      return;
    }

    // 1. Capture the form reference immediately before any async await!
    const form = e.currentTarget;
    setSubmitting(true);

    const formData = new FormData(form);
    const petData = Object.fromEntries(formData.entries());

    // Convert age and adoptionFee to numbers
    petData.age = Number(petData.age);
    petData.adoptionFee = Number(petData.adoptionFee);

    // ✅ Overwrite/ensure payload points exactly to your active authenticated email account
    petData.ownerEmail = loggedInUserEmail;

    try {
      const res = await fetch("https://pet-adoption-application-server.vercel.app//pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Pet added successfully! 🎉");

        // 2. Use the stored form reference here instead of e.currentTarget
        form.reset();

        // ✅ Redirect to My Listings page so the user sees their new addition instantly
        router.push("/dashboard/my-listings");
      } else {
        toast.error(data.message || "Failed to add pet listing.");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Add New Pet</h1>
        <p className="text-gray-500 mt-2">
          Fill in the information below to list a pet for adoption.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6">
        <form onSubmit={handleAddPet} className="grid md:grid-cols-2 gap-5">
          {/* Pet Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Pet Name</span>
            </label>
            <input
              type="text"
              name="petName"
              placeholder="Enter pet name"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Species */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Species</span>
            </label>
            <select
              name="species"
              className="select select-bordered w-full bg-white text-slate-800"
              required
            >
              <option value="">Select Species</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Rabbit</option>
              <option>Fish</option>
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Breed</span>
            </label>
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Age</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered w-full bg-white text-slate-800"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Health Status</span>
            </label>
            <input
              type="text"
              name="healthStatus"
              placeholder="Healthy & Energetic"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Vaccination */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Vaccination Status</span>
            </label>
            <select
              name="vaccinationStatus"
              className="select select-bordered w-full bg-white text-slate-800"
              required
            >
              <option value="">Select Status</option>
              <option>Vaccinated</option>
              <option>Not Vaccinated</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Dhaka"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Adoption Fee ($)</span>
            </label>
            <input
              type="number"
              name="adoptionFee"
              placeholder="1000"
              className="input input-bordered w-full bg-white text-slate-800"
              required
            />
          </div>

          {/* Owner Email (Dynamically populated by session context wrapper) */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Owner Email</span>
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={loggedInUserEmail || "Not logged in"}
              readOnly
              className="input input-bordered w-full bg-slate-50 text-slate-500 font-medium cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Description</span>
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write details about the pet behavior traits..."
              className="textarea textarea-bordered w-full bg-white text-slate-800"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting || !loggedInUserEmail}
              className="btn btn-primary w-full text-white font-bold"
            >
              {submitting ? "Adding Pet to Catalog..." : "Add Pet 🐾"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}