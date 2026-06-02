"use client";

import { useEffect, useState } from "react";
import { Eye, Clock3, CheckCircle, XCircle } from "lucide-react";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Temporary hardcoded email until Better Auth session is connected
  const loggedInUserEmail = "user@gmail.com"; 

  // Fetch Requests from Backend
  const fetchMyRequests = async () => {
    try {
      const res = await fetch(`http://localhost:5000/adoptions/user/${loggedInUserEmail}`);
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching adoption requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, [loggedInUserEmail]);

  // Handle Request Cancellation (Live Delete)
  const handleCancel = async (id) => {
    const proceed = window.confirm("Are you sure you want to cancel this adoption request? 😢");
    if (!proceed) return;

    try {
      const res = await fetch(`http://localhost:5000/adoptions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        // Instantly remove the cancelled request from your UI state array
        setRequests(requests.filter((req) => req._id !== id));
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Could not cancel request. Try again.");
    }
  };

  // Dynamic Stats Calculations
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status?.toLowerCase() === "pending").length;
  const approvedRequests = requests.filter((r) => r.status?.toLowerCase() === "approved").length;
  const rejectedRequests = requests.filter((r) => r.status?.toLowerCase() === "rejected").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

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

      {/* Dynamic Stats Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-slate-900">{totalRequests}</h2>
            <p className="text-gray-500 font-medium">Total</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-amber-500">{pendingRequests}</h2>
            <p className="text-gray-500 font-medium">Pending</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-green-500">{approvedRequests}</h2>
            <p className="text-gray-500 font-medium">Approved</p>
          </div>
        </div>

        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body items-center">
            <h2 className="text-4xl font-bold text-red-500">{rejectedRequests}</h2>
            <p className="text-gray-500 font-medium">Rejected</p>
          </div>
        </div>
      </div>

      {/* Table Interface */}
      {requests.length === 0 ? (
        <div className="text-center bg-base-100 rounded-2xl shadow-sm border p-12">
          <h2 className="text-xl font-semibold text-gray-600">No applications sent</h2>
          <p className="text-gray-400 mt-2">Your submitted adoption applications will show up here.</p>
        </div>
      ) : (
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
                <tr key={request._id}>
                  <td className="font-semibold text-slate-800">{request.petName}</td>
                  <td>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td>{request.pickupDate || "Not Specified"}</td>

                  <td>
                    {request.status?.toLowerCase() === "approved" && (
                      <span className="badge badge-success gap-1 text-white font-medium">
                        <CheckCircle size={14} />
                        Approved
                      </span>
                    )}
                    {request.status?.toLowerCase() === "rejected" && (
                      <span className="badge badge-error gap-1 text-white font-medium">
                        <XCircle size={14} />
                        Rejected
                      </span>
                    )}
                    {request.status?.toLowerCase() !== "approved" && request.status?.toLowerCase() !== "rejected" && (
                      <span className="badge badge-warning gap-1 text-white font-medium">
                        <Clock3 size={14} />
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-sm btn-outline">
                        <Eye size={16} />
                        View
                      </button>

                      <button 
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleCancel(request._id)}
                      >
                        Cancel
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