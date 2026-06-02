"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdatePetPage({ params: paramsPromise }) {
  // Unwrap params using React.use() hook as required by newer Next.js versions
  const params = use(paramsPromise);
  const petId = params.id;
  
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the pet's current data when the page loads
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/pets/${petId}`);
        if (!res.ok) throw new Error("Failed to fetch pet details");
        const data = await res.json();
        setPet(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load pet data.");
      } finally {
        setLoading(false);
      }
    };

    if (petId) fetchPetDetails();
  }, [petId]);

  // Handle form submission to update the database
  const handleUpdatePet = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success("Pet profile updated successfully! 🎉");
        router.push("/dashboard/my-listings"); // Redirect back to listings table
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!pet) {
    return <div className="text-center p-6 text-red-500 font-bold">Pet details not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Edit Pet Profile</h1>
        <p className="text-gray-500 mt-2">Modify the fields below to update your {"pet's"} listing details.</p>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6">
        <form onSubmit={handleUpdatePet} className="grid md:grid-cols-2 gap-5">
          
          {/* Pet Name */}
          <div>
            <label className="label"><span className="label-text">Pet Name</span></label>
            <input
              type="text"
              name="petName"
              defaultValue={pet.petName}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Species */}
          <div>
            <label className="label"><span className="label-text">Species</span></label>
            <select
              name="species"
              defaultValue={pet.species}
              className="select select-bordered w-full"
              required
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Fish">Fish</option>
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="label"><span className="label-text">Breed</span></label>
            <input
              type="text"
              name="breed"
              defaultValue={pet.breed}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="label"><span className="label-text">Age</span></label>
            <input
              type="number"
              name="age"
              defaultValue={pet.age}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label"><span className="label-text">Gender</span></label>
            <select
              name="gender"
              defaultValue={pet.gender}
              className="select select-bordered w-full"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="label"><span className="label-text">Image URL</span></label>
            <input
              type="text"
              name="image"
              defaultValue={pet.image}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="label"><span className="label-text">Health Status</span></label>
            <input
              type="text"
              name="healthStatus"
              defaultValue={pet.healthStatus}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="label"><span className="label-text">Vaccination Status</span></label>
            <select
              name="vaccinationStatus"
              defaultValue={pet.vaccinationStatus}
              className="select select-bordered w-full"
              required
            >
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="label"><span className="label-text">Location</span></label>
            <input
              type="text"
              name="location"
              defaultValue={pet.location}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="label"><span className="label-text">Adoption Fee</span></label>
            <input
              type="number"
              name="adoptionFee"
              defaultValue={pet.adoptionFee}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea
              name="description"
              rows="5"
              defaultValue={pet.description}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="md:col-span-2 flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary flex-1">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => router.push("/dashboard/my-listings")} 
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}