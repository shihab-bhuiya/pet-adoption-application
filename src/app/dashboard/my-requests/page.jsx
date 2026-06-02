"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Check, X, Clock, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function MyIncomingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get real logged-in user email from Better Auth session
  const { data: session } = authClient.useSession();
  const loggedInUserEmail = session?.user?.email;

  // Fetch incoming requests meant for pets owned by this user
  const fetchIncomingRequests = async () => {
    if (!loggedInUserEmail) return;
    try {
      const res = await fetch(`http://localhost:5000/adoptions/owner/${loggedInUserEmail}`);
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching incoming requests:", error);
      toast.error("Failed to load incoming requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomingRequests();
  }, [loggedInUserEmail]);

  // ✅ Handle Approve Action
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/adoptions/${id}/approve`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Request approved! Pet is now adopted.");
        fetchIncomingRequests(); // Refresh data to show updated statuses and auto-rejections
      } else {
        toast.error(data.message || "Failed to approve request.");
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Something went wrong during approval.");
    }
  };

  // ✅ Handle Reject Action
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/adoptions/${id}/reject`, {
        method: "PATCH",
      });
      
      if (res.ok) {
        toast.success("Request rejected.");
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status: "rejected" } : req))
        );
      } else {
        toast.error("Failed to reject request.");
      }
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error("Something went wrong during rejection.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ==========================================
  // 📊 DYNAMIC STATS CALCULATION
  // ==========================================
  const totalCount = requests.length;
  const pendingCount = requests.filter((req) => req.status === "pending").length;
  const approvedCount = requests.filter((req) => req.status === "approved").length;
  const rejectedCount = requests.filter((req) => req.status === "rejected").length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="badge badge-outline badge-primary mb-3">Dashboard</span>
        <h1 className="text-4xl font-bold text-slate-900">Incoming Adoption Requests</h1>
        <p className="text-gray-500 mt-1">
          Review and manage people who want to adopt the pets you have listed.
        </p>
      </div>

      {/* ========================================== */}
      {/* 📊 DYNAMIC STAT CARDS                      */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Card */}
        <div className="bg-white p-6 rounded-2xl border text-center flex flex-col justify-center min-h-[120px]">
          <span className="text-3xl font-bold text-slate-800">{totalCount}</span>
          <span className="text-gray-400 font-medium text-sm mt-1">Total</span>
        </div>

        {/* Pending Card */}
        <div className="bg-white p-6 rounded-2xl border text-center flex flex-col justify-center min-h-[120px]">
          <span className="text-3xl font-bold text-amber-500">{pendingCount}</span>
          <span className="text-gray-400 font-medium text-sm mt-1">Pending</span>
        </div>

        {/* Approved Card */}
        <div className="bg-white p-6 rounded-2xl border text-center flex flex-col justify-center min-h-[120px]">
          <span className="text-3xl font-bold text-emerald-600">{approvedCount}</span>
          <span className="text-gray-400 font-medium text-sm mt-1">Approved</span>
        </div>

        {/* Rejected Card */}
        <div className="bg-white p-6 rounded-2xl border text-center flex flex-col justify-center min-h-[120px]">
          <span className="text-3xl font-bold text-rose-600">{rejectedCount}</span>
          <span className="text-gray-400 font-medium text-sm mt-1">Rejected</span>
        </div>
      </div>

      {/* Table List */}
      {requests.length === 0 ? (
        <div className="text-center bg-white rounded-2xl shadow-sm border p-12">
          <HelpCircle className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-600">No requests received yet</h2>
          <p className="text-gray-400 mt-2">
            When users apply to adopt your listed pets, they will appear here for review.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-2xl shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th>Pet Name</th>
                <th>Applicant Email</th>
                <th>Message Note</th>
                <th>Status</th>
                <th className="text-center">Review Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="font-bold text-slate-800">{request.petName}</td>
                  <td className="text-gray-600">{request.requesterEmail}</td>
                  <td className="max-w-xs truncate text-gray-500" title={request.message}>
                    {request.message || "No message attached."}
                  </td>
                  <td>
                    <span className={`badge gap-1 text-white font-medium ${
                      request.status === "approved" ? "badge-success" : request.status === "rejected" ? "badge-error" : "badge-warning"
                    }`}>
                      {request.status === "pending" && <Clock size={12} />}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="text-center">
                    {request.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-success text-white gap-1 shadow-sm"
                          onClick={() => handleApprove(request._id)}
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error gap-1"
                          onClick={() => handleReject(request._id)}
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Decision Finalized</span>
                    )}
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