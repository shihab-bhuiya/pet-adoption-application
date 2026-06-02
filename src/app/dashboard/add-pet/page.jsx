"use client";

export default function AddPetPage() {

  const handleAddPet = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());

    console.log(petData);

    // API Call Here
    // await fetch(...)
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Add New Pet
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the information below to list a pet for adoption.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6">

        <form
          onSubmit={handleAddPet}
          className="grid md:grid-cols-2 gap-5"
        >

          {/* Pet Name */}
          <div>
            <label className="label">
              <span className="label-text">Pet Name</span>
            </label>

            <input
              type="text"
              name="petName"
              placeholder="Enter pet name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Species */}
          <div>
            <label className="label">
              <span className="label-text">Species</span>
            </label>

            <select
              name="species"
              className="select select-bordered w-full"
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
              <span className="label-text">Breed</span>
            </label>

            <input
              type="text"
              name="breed"
              placeholder="Breed"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>

            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>

            <select
              name="gender"
              className="select select-bordered w-full"
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
              <span className="label-text">Image URL</span>
            </label>

            <input
              type="text"
              name="image"
              placeholder="https://..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="label">
              <span className="label-text">Health Status</span>
            </label>

            <input
              type="text"
              name="healthStatus"
              placeholder="Healthy"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Vaccination */}
          <div>
            <label className="label">
              <span className="label-text">Vaccination Status</span>
            </label>

            <select
              name="vaccinationStatus"
              className="select select-bordered w-full"
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
              <span className="label-text">Location</span>
            </label>

            <input
              type="text"
              name="location"
              placeholder="Dhaka"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="label">
              <span className="label-text">Adoption Fee</span>
            </label>

            <input
              type="number"
              name="adoptionFee"
              placeholder="1000"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Owner Email */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Owner Email</span>
            </label>

            <input
              type="email"
              name="ownerEmail"
              value="user@gmail.com"
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Write details about the pet..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Add Pet
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}