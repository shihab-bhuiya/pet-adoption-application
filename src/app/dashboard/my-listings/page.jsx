"use client";



import { useEffect, useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";



export default function MyListingsPage() {

  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(true);



  // ✅ Get real logged-in user email from Better Auth session

  const { data: session } = authClient.useSession();

  const loggedInUserEmail = session?.user?.email;



  useEffect(() => {

    // ✅ Wait until session email is available before fetching

    if (!loggedInUserEmail) return;



    const fetchMyPets = async () => {

      try {

        const res = await fetch(`https://pet-adoption-application-server.vercel.app/pets/owner/${loggedInUserEmail}`);

        const data = await res.json();

        setPets(data);

      } catch (error) {

        console.error("Error fetching user listings:", error);

        toast.error("Failed to load your listings.");

      } finally {

        setLoading(false);

      }

    };



    fetchMyPets();

  }, [loggedInUserEmail]); // ✅ Re-runs when the session email loads



  // ✅ Handle Delete Pet

  const handleDelete = async (id) => {

    toast((t) => (

      <span>

        Are you sure you want to delete this pet?{" "}

        <button

          className="btn btn-xs btn-error ml-2"

          onClick={async () => {

            toast.dismiss(t.id);

            try {

              const res = await fetch(`https://pet-adoption-application-server.vercel.app/pets/${id}`, {

                method: "DELETE",

              });

              const data = await res.json();

              if (data.deletedCount > 0) {

                setPets(pets.filter((pet) => pet._id !== id));

                toast.success("Pet listing deleted successfully!");

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

                        onClick={() => handleDelete(pet._id)}

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