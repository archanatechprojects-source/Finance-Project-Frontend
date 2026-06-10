"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Search, Plus, Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, RotateCcw, Edit, ClipboardList } from "lucide-react";
import EditDemoRequestModal from "@/components/demo-request/EditDemoRequestModal";
import AddDemoRequestModal from "@/components/demo-request/AddDemoRequestModal";

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);

  const loadRequests = async () => {
    try {
      const res = await api.get("/customers/bookings");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      await api.patch(`/customers/bookings/${id}/approve`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelRequest = async (id: string) => {
    try {
      await api.patch(`/customers/bookings/${id}/cancel`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const completeRequest = async (id: string) => {
    try {
      await api.patch(`/customers/bookings/${id}/complete`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const restoreRequest = async (id: string) => {
    try {
      await api.patch(`/customers/bookings/${id}/restore`);
      loadRequests();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filtered = requests.filter((r) =>
    `${r.name || ""} ${r.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Helper mapping to stylize badges based on application state
  const getStatusBadge = (status: string) => {
    const base = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border";
    switch (status) {
      case "PENDING":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "CONFIRMED":
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
      case "COMPLETED":
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case "CANCELED":
        return `${base} bg-slate-100 text-slate-600 border-slate-200`;
      default:
        return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Demo Requests
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review, assign dates, approve, and complete incoming fleet pilot demonstrations.
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-600/10 transition-all active:scale-[0.98] w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Demo Request
          </button>
        </div>

        {/* Search Control */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search demo logs by customer name or email info..."
            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
          />
        </div>

        {/* Responsive Table & Card Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Desktop Layout View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 lg:p-5">Customer Info</th>
                  <th className="p-4 lg:p-5">Requested Date/Time</th>
                  <th className="p-4 lg:p-5">Status</th>
                  <th className="p-4 lg:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {filtered.length > 0 ? (
                  filtered.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 lg:p-5">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 text-base">{request.name}</div>
                          <div className="text-xs text-slate-500 font-normal flex items-center gap-1">
                            <Mail size={12} className="text-slate-400" />
                            {request.email}
                          </div>
                          {request.phone && (
                            <div className="text-xs text-slate-400 font-normal flex items-center gap-1">
                              <Phone size={12} className="text-slate-400" />
                              {request.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 lg:p-5">
                        <div className="flex flex-col gap-1 text-slate-700">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-800 w-fit">
                            <Calendar size={12} />
                            {new Date(request.scheduledAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-normal pl-0.5">
                            <Clock size={12} />
                            {new Date(request.scheduledAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 lg:p-5">
                        <span className={getStatusBadge(request.status)}>
                          {request.status}
                        </span>
                      </td>
                      <td className="p-4 lg:p-5">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Conditional Actions per Status Type */}
                          {request.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => approveRequest(request.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg transition"
                              >
                                <CheckCircle size={14} /> Approve
                              </button>
                              <button
                                onClick={() => cancelRequest(request.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition"
                              >
                                <XCircle size={14} /> Cancel
                              </button>
                            </>
                          )}

                          {request.status === "CONFIRMED" && (
                            <>
                              <button
                                onClick={() => completeRequest(request.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition shadow-sm"
                              >
                                <CheckCircle size={14} /> Complete
                              </button>
                              <button
                                onClick={() => cancelRequest(request.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition"
                              >
                                <XCircle size={14} /> Cancel
                              </button>
                            </>
                          )}

                          {request.status === "CANCELED" && (
                            <button
                              onClick={() => restoreRequest(request.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-lg transition"
                            >
                              <RotateCcw size={14} /> Restore Logs
                            </button>
                          )}

                          {request.status === "COMPLETED" && (
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 cursor-not-allowed">
                              Archived
                            </span>
                          )}

                          {/* Standard Edit Option Component Trigger */}
                          {request.status !== "CANCELED" && request.status !== "COMPLETED" && (
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowEdit(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition"
                              title="Edit Schedule"
                            >
                              <Edit size={16} />
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-slate-400 font-normal">
                      No demo logs or bookings fit your profile filter parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Display Stack: Displayed under lg responsive breakpoints */}
          <div className="block lg:hidden divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((request) => (
                <div key={request.id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-slate-900 text-base">{request.name}</h3>
                      <p className="text-xs text-slate-500 font-normal flex items-center gap-1">
                        <Mail size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[180px] sm:max-w-none">{request.email}</span>
                      </p>
                      {request.phone && (
                        <p className="text-xs text-slate-400 font-normal flex items-center gap-1">
                          <Phone size={12} className="text-slate-400 shrink-0" />
                          {request.phone}
                        </p>
                      )}
                    </div>
                    <span className={getStatusBadge(request.status)}>
                      {request.status}
                    </span>
                  </div>

                  {/* Scheduled Frame Meta Box */}
                  <div className="bg-slate-50 rounded-xl p-3 flex flex-wrap justify-between items-center gap-2 text-xs">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <ClipboardList size={13} /> Demo Appointment
                    </span>
                    <div className="text-right font-medium text-slate-900 flex items-center gap-2">
                      <span className="bg-white border px-1.5 py-0.5 rounded text-slate-700">{new Date(request.scheduledAt).toLocaleDateString()}</span>
                      <span className="text-slate-400">{new Date(request.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {/* Operational Mobile Action Grid */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                    
                    {request.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => approveRequest(request.id)}
                          className="flex-1 min-w-[100px] flex items-center justify-center gap-1 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => cancelRequest(request.id)}
                          className="flex-1 min-w-[100px] flex items-center justify-center gap-1 py-2 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-100 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {request.status === "CONFIRMED" && (
                      <>
                        <button
                          onClick={() => completeRequest(request.id)}
                          className="flex-1 min-w-[100px] flex items-center justify-center gap-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl transition"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => cancelRequest(request.id)}
                          className="flex-1 min-w-[100px] flex items-center justify-center gap-1 py-2 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-100 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {request.status === "CANCELED" && (
                      <button
                        onClick={() => restoreRequest(request.id)}
                        className="w-full flex items-center justify-center gap-1 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl border border-amber-100 transition"
                      >
                        <RotateCcw size={14} /> Restore Log Entry
                      </button>
                    )}

                    {/* Quick Access Floating Edit Trigger Element */}
                    {request.status !== "CANCELED" && request.status !== "COMPLETED" && (
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowEdit(true);
                        }}
                        className="p-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 px-3"
                      >
                        <Edit size={14} /> Edit
                      </button>
                    )}

                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No demo logs or bookings fit your profile filter parameters.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Control Action Modal Flow Components */}
      <EditDemoRequestModal
        open={showEdit}
        booking={selectedRequest}
        onClose={() => {
          setShowEdit(false);
          setSelectedRequest(null);
        }}
        onSuccess={loadRequests}
      />

      <AddDemoRequestModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSuccess={loadRequests}
      />
    </>
  );
}