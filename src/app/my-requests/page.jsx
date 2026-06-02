import { Eye, Clock3 } from "lucide-react";

export default function MyRequestsPage() {
  const requests = [
    {
      id: 1,
      petName: "Sky",
      requestDate: "May 31, 2026",
      pickupDate: "Jun 2, 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="badge badge-outline badge-secondary mb-3">
          My Requests
        </div>

        <h1 className="text-5xl font-bold">
          My{" "}
          <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Adoption Requests
          </span>
        </h1>

        <p className="text-gray-500 mt-2">
          Track the status of all your adoption requests here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-slate-900">1</h2>
            <p>Total</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-amber-500">1</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-green-500">0</h2>
            <p>Approved</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-red-500">0</h2>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 border rounded-2xl shadow-sm">
        <table className="table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Request Date</th>
              <th>Pickup Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.petName}</td>

                <td>{request.requestDate}</td>

                <td>{request.pickupDate}</td>

                <td>
                  <span className="badge badge-warning gap-1">
                    <Clock3 size={14} />
                    {request.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-sm btn-outline">
                      <Eye size={16} />
                      View
                    </button>

                    <button className="btn btn-sm btn-outline btn-error">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}