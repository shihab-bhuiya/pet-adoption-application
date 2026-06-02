"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyListingsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Temporary hardcoded email until Better Auth session is mapped
  const loggedInUserEmail = "user@gmail.com"; 

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await fetch(`http://localhost:5000/pets/owner/${loggedInUserEmail}`);
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [loggedInUserEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">My Pet Listings</h1>
          <p className="text-gray-500 mt-2">Manage the pets you have put up for adoption.</p>
        </div>
        <Link href="/dashboard/add-pet" className="btn btn-primary">
          + Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="text-center bg-white rounded-2xl shadow border p-12 mt-6">
          <h2 className="text-xl font-semibold text-gray-600">No pets listed yet</h2>
          <p className="text-gray-400 mt-2">Any pets you submit via the Add Pet form will show up here.</p>
          <Link href="/dashboard/add-pet" className="btn btn-outline btn-primary mt-4">
            List Your First Pet
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow border">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th>Image</th>
                <th>Pet Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Adoption Fee</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {pets.map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img 
                          src={pet.image || "https://placehold.co/150"} 
                          alt={pet.petName} 
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-gray-800">{pet.petName}</span>
                  </td>
                  <td>{pet.species}</td>
                  <td>{pet.breed}</td>
                  <td>
                    {pet.adoptionFee === 0 ? (
                      <span className="badge badge-success gap-1 text-white font-medium">Free</span>
                    ) : (
                      <span className="font-medium text-gray-900">${pet.adoptionFee}</span>
                    )}
                  </td>
                  <td>
                    {pet.adopted ? (
                      <span className="badge badge-error text-white font-semibold">Adopted</span>
                    ) : (
                      <span className="badge badge-info text-white font-semibold">Available</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <Link 
                        href={`/dashboard/update-pet/${pet._id}`} 
                        className="btn btn-sm btn-outline btn-warning"
                      >
                        Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => alert("Delete functionality coming soon!")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}