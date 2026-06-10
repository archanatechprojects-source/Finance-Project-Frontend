"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AddCustomerModal from "@/components/customers/AddCustomerModal";
import { hasPermission } from "@/lib/permissions";
import EditCustomerModal from "@/components/customers/EditCustomerModal";
import { Search, Plus, User, Mail, Wallet, ShieldAlert, Eye, Edit, Power, X } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (customerId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/customers/${customerId}/status`, {
        active: !currentStatus,
      });
      loadCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Customers
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage accounts, control system access, and view client portfolios.
            </p>
          </div>

          {hasPermission("CUSTOMER_CREATE") && (
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-600/10 transition-all active:scale-[0.98] w-full sm:w-auto"
            >
              <Plus size={18} />
              Add Customer
            </button>
          )}
        </div>

        {/* Search Control */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search custom database by name or email account..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
          />
        </div>

        {/* Responsive Table & Card Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Desktop Table: Shown from large/desktop breakpoints */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 lg:p-5">Name</th>
                  <th className="p-4 lg:p-5">Email Address</th>
                  <th className="p-4 lg:p-5">Invested Portfolio</th>
                  <th className="p-4 lg:p-5">Status</th>
                  <th className="p-4 lg:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 lg:p-5 text-slate-900 font-semibold">{customer.name}</td>
                      <td className="p-4 lg:p-5 text-slate-600 font-normal">{customer.email}</td>
                      <td className="p-4 lg:p-5 text-slate-900 font-mono">
                        ₹{customer.investedAmount?.toLocaleString() || 0}
                      </td>
                      <td className="p-4 lg:p-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                            customer.active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {customer.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4 lg:p-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {hasPermission("CUSTOMER_EDIT") && (
                            <>
                              <button
                                onClick={() => {
                                  setEditCustomer(customer);
                                  setShowEdit(true);
                                }}
                                className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                                title="Edit Customer"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => toggleStatus(customer.id, customer.active)}
                                className={`p-2 rounded-lg transition ${
                                  customer.active
                                    ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                }`}
                                title={customer.active ? "Deactivate Account" : "Activate Account"}
                              >
                                <Power size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400 font-normal">
                      No customer files match your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Display Stack: Responsive Cards displayed under md display sizes */}
          <div className="block md:hidden divide-y divide-slate-100">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div key={customer.id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{customer.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{customer.email}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        customer.active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {customer.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-semibold">Total Invested</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{customer.investedAmount?.toLocaleString() || 0}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    {hasPermission("CUSTOMER_EDIT") && (
                      <>
                        <button
                          onClick={() => {
                            setEditCustomer(customer);
                            setShowEdit(true);
                          }}
                          className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-xl transition"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => toggleStatus(customer.id, customer.active)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition ${
                            customer.active
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                        >
                          <Power size={14} />
                          {customer.active ? "Halt" : "Start"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No customer files match your criteria.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Customer Full Data Drawer/Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {/* Form Action Components */}
      <AddCustomerModal open={showAdd} onClose={() => setShowAdd(false)} onSuccess={loadCustomers} />
      <EditCustomerModal
        open={showEdit}
        customer={editCustomer}
        onClose={() => {
          setShowEdit(false);
          setEditCustomer(null);
        }}
        onSuccess={loadCustomers}
      />
    </>
  );
}

function CustomerDetailsModal({ customer, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-all animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-100">
        
        {/* Modal Top Control Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <User size={16} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Customer Profile
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Data Elements Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Identity Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Legal Client Name</span>
              <p className="text-sm font-semibold text-slate-900">{customer.name}</p>
            </div>
            <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Contact Handshake</span>
              <p className="text-sm font-semibold text-slate-900">{customer.phone || "Not Disclosed"}</p>
            </div>
            <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-100 sm:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Communication Email</span>
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 truncate">
                <Mail size={14} className="text-slate-400 shrink-0" />
                {customer.email}
              </p>
            </div>
          </div>

          {/* Capital Investments Panel Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wallet size={16} className="text-slate-500" />
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                Linked Portfolios
              </h3>
            </div>

            <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
              {customer.investments && customer.investments.length > 0 ? (
                customer.investments.map((investment: any) => (
                  <div
                    key={investment.id}
                    className="border border-slate-100 rounded-xl p-4 bg-white hover:border-slate-200 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{investment.name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">Asset Type: {investment.type}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-mono font-bold text-slate-900">
                        ₹{investment.amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <ShieldAlert size={24} className="text-slate-300 mb-1.5" />
                  <p className="text-xs text-slate-500 font-medium">
                    This account holds no active financial asset investments.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer Panel */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition shadow-xs"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}