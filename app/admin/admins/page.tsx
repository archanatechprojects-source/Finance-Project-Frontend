// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import AddAdminModal from "@/components/admin/AddAdminModal";
// import {
//   hasPermission
// } from "@/lib/permissions";
// import { useRouter } from "next/navigation";
// import EditAdminModal from "@/components/admin/EditAdminModal";

// export default function AdminsPage() {
//   const [admins, setAdmins] =
//     useState<any[]>([]);

//   const [search, setSearch] =
//     useState("");

//   const [showAdd, setShowAdd] =
//     useState(false);

//   const [selectedAdmin, setSelectedAdmin] =
//     useState<any>(null);

//   const [showEdit, setShowEdit] = useState(false);

//   const loadAdmins = async () => {
//     try {
//       const res =
//         await api.get("/admin/admins");

//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredAdmins =
//     admins.filter((admin) =>
//       `${admin.name} ${admin.email}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
  
//   const router = useRouter();

//     useEffect(() => {
//       if (!hasPermission("ADMIN_VIEW")) {
//         router.push("/admin");
//         return;
//       }

//       loadAdmins();
//     }, []);

//   const toggleStatus = async (
//     id: string,
//     active: boolean
//   ) => {
//     try {
//       await api.patch(
//         `/admin/admins/${id}/status`,
//         {
//           active: !active,
//         }
//       );

//       loadAdmins();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="space-y-6">

//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Admin Management
//             </h1>

//             <p className="text-slate-600">
//               Manage platform admins
//             </p>
//           </div>

//           {hasPermission("ADMIN_CREATE") && (
//             <button
//               onClick={() => setShowAdd(true)}
//               className="bg-blue-600 text-white px-5 py-3 rounded-xl"
//             >
//               Add Admin
//             </button>
//           )}
//         </div>

//         <input
//           type="text"
//           placeholder="Search admin..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//           className="w-full p-4 rounded-xl border bg-white text-slate-900"
//         />

//         <div className="bg-white rounded-3xl shadow overflow-hidden">

//           <table className="w-full text-slate-900">

//             <thead className="bg-slate-100">
//               <tr>
//                 <th className="p-4 text-left">
//                   Name
//                 </th>

//                 <th className="p-4 text-left">
//                   Email
//                 </th>

//                 <th className="p-4 text-left">
//                   Role
//                 </th>

//                 <th className="p-4 text-left">
//                   Status
//                 </th>

//                 <th className="p-4 text-left">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>

//               {filteredAdmins.map(
//                 (admin) => (
//                   <tr
//                     key={admin.id}
//                     className="border-t"
//                   >
//                     <td className="p-4">
//                       {admin.name}
//                     </td>

//                     <td className="p-4">
//                       {admin.email}
//                     </td>

//                     <td className="p-4">
//                       {admin.role}
//                     </td>

//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs ${
//                           admin.active
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {admin.active
//                           ? "Active"
//                           : "Inactive"}
//                       </span>
//                     </td>

//                     <td className="p-4 flex gap-2">

//                       {hasPermission("ADMIN_VIEW") && (
//                         <button
//                           onClick={() =>
//                             setSelectedAdmin(
//                               admin
//                             )
//                           }
//                         className="bg-slate-200 px-3 py-2 rounded-lg"
//                       >
//                         View
//                       </button>
//                       )}

//                       {hasPermission("ADMIN_EDIT") && (
//                         <button
//                           onClick={() => {
//                             setSelectedAdmin(admin);
//                             setShowEdit(true);
//                           }}
//                           className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//                         >
//                           Edit
//                         </button>
//                       )}

//                       {hasPermission("ADMIN_EDIT") && (
//                         <button
//                           onClick={() =>
//                             toggleStatus(
//                               admin.id,
//                               admin.active
//                             )
//                           }
//                           className="bg-orange-500 text-white px-3 py-2 rounded-lg"
//                         >
//                           {admin.active
//                             ? "Deactivate"
//                             : "Activate"}
//                         </button>
//                       )}

//                     </td>
//                   </tr>
//                 )
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {selectedAdmin && !showEdit && (
//         <AdminDetailsModal
//           admin={selectedAdmin}
//           onClose={() =>
//             setSelectedAdmin(null)
//           }
//         />
//       )}

//       <AddAdminModal
//         open={showAdd}
//         onClose={() =>
//           setShowAdd(false)
//         }
//         onSuccess={loadAdmins}
//       />

//       <EditAdminModal
//         open={showEdit}
//         admin={selectedAdmin}
//         onClose={() => {
//           setShowEdit(false);
//           setSelectedAdmin(null);
//         }}
//         onSuccess={loadAdmins}
//       />
//     </>
//   );
// }

// function AdminDetailsModal({
//   admin,
//   onClose,
// }: any) {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="bg-white rounded-3xl w-[700px] p-8">

//         <div className="flex justify-between items-center">

//           <h2 className="text-2xl font-bold text-slate-900">
//             Admin Details
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-slate-700"
//           >
//             ✕
//           </button>

//         </div>

//         <div className="mt-6 space-y-4 text-slate-900">

//           <p>
//             <strong>Name:</strong>{" "}
//             {admin.name}
//           </p>

//           <p>
//             <strong>Email:</strong>{" "}
//             {admin.email}
//           </p>

//           <p>
//             <strong>Role:</strong>{" "}
//             {admin.role}
//           </p>

//         </div>

//         <div className="mt-8">

//           <h3 className="font-semibold text-xl text-slate-900 mb-4">
//             Permissions
//           </h3>

//           <div className="flex flex-wrap gap-2">

//             {admin.permissions?.map(
//               (permission: any) => (
//                 <span
//                   key={permission.id}
//                   className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700"
//                 >
//                   {permission.code}
//                 </span>
//               )
//             )}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import AddAdminModal from "@/components/admin/AddAdminModal";
import EditAdminModal from "@/components/admin/EditAdminModal";
import { hasPermission } from "@/lib/permissions";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Plus, 
  User, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Power, 
  X,
  ShieldAlert
} from "lucide-react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);

  const router = useRouter();

  const loadAdmins = async () => {
    try {
      const res = await api.get("/admin/admins");
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!hasPermission("ADMIN_VIEW")) {
      router.push("/admin");
      return;
    }
    loadAdmins();
  }, [router]);

  const toggleStatus = async (id: string, active: boolean) => {
    try {
      await api.patch(`/admin/admins/${id}/status`, {
        active: !active,
      });
      loadAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    `${admin.name || ""} ${admin.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusBadge = (active: boolean) => {
    const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border";
    return active
      ? `${base} bg-emerald-50 text-emerald-700 border-emerald-200`
      : `${base} bg-rose-50 text-rose-700 border-rose-200`;
  };

  return (
    <>
      <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Configure system operators, assign access privileges, and manage security parameters.
            </p>
          </div>

          {hasPermission("ADMIN_CREATE") && (
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-600/10 transition active:scale-[0.98] w-full sm:w-auto"
            >
              <Plus size={18} />
              Add Admin
            </button>
          )}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search administration logs by name or registration email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
          />
        </div>

        {/* Desktop Structural Table Layout */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 lg:p-5">Operator Profile</th>
                  <th className="p-4 lg:p-5">Email Address</th>
                  <th className="p-4 lg:p-5">Assigned Title/Role</th>
                  <th className="p-4 lg:p-5">Security Status</th>
                  <th className="p-4 lg:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 lg:p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 font-bold text-sm border border-slate-200">
                            {admin.name?.charAt(0).toUpperCase() || <User size={16} />}
                          </div>
                          <div className="font-bold text-slate-900 text-base">{admin.name}</div>
                        </div>
                      </td>
                      <td className="p-4 lg:p-5 text-slate-600">
                        <div className="flex items-center gap-1.5 font-normal">
                          <Mail size={14} className="text-slate-400" />
                          {admin.email}
                        </div>
                      </td>
                      <td className="p-4 lg:p-5">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-800 border border-slate-200">
                          <Shield size={12} className="text-slate-500" />
                          {admin.role}
                        </span>
                      </td>
                      <td className="p-4 lg:p-5">
                        <span className={getStatusBadge(admin.active)}>
                          {admin.active ? (
                            <>
                              <CheckCircle size={12} /> Active
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4 lg:p-5">
                        <div className="flex items-center justify-end gap-2">
                          {hasPermission("ADMIN_VIEW") && (
                            <button
                              onClick={() => setSelectedAdmin(admin)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-lg transition"
                              title="View Security Access"
                            >
                              <Eye size={14} />
                            </button>
                          )}

                          {hasPermission("ADMIN_EDIT") && (
                            <button
                              onClick={() => {
                                setSelectedAdmin(admin);
                                setShowEdit(true);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg transition"
                            >
                              <Edit size={14} />
                            </button>
                          )}

                          {hasPermission("ADMIN_EDIT") && (
                            <button
                              onClick={() => toggleStatus(admin.id, admin.active)}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                                admin.active
                                  ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
                                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              <Power size={14} />
                              {/* {admin.active ? "Deactivate" : "Activate"} */}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400 font-normal">
                      No matching system administrators found matching your filter parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile + Tablet Responsive Stack Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <div key={admin.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">{admin.name}</h3>
                    <p className="text-xs text-slate-500 font-normal flex items-center gap-1 break-all">
                      <Mail size={12} className="text-slate-400 shrink-0" />
                      {admin.email}
                    </p>
                  </div>
                  <span className={getStatusBadge(admin.active)}>
                    {admin.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Assigned Privilege:</span>
                  <span className="inline-flex items-center gap-1 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    <Shield size={11} />
                    {admin.role}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {hasPermission("ADMIN_VIEW") && (
                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="flex-1 min-w-[75px] inline-flex items-center justify-center gap-1 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition"
                    >
                      <Eye size={13} /> 
                    </button>
                  )}

                  {hasPermission("ADMIN_EDIT") && (
                    <button
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowEdit(true);
                      }}
                      className="flex-1 min-w-[75px] inline-flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-100 transition"
                    >
                      <Edit size={13} /> 
                    </button>
                  )}

                  {hasPermission("ADMIN_EDIT") && (
                    <button
                      onClick={() => toggleStatus(admin.id, admin.active)}
                      className={`flex-1 min-w-[110px] inline-flex items-center justify-center gap-1 py-2 text-xs font-bold rounded-xl border transition ${
                        admin.active
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}
                    >
                      <Power size={13} />
                      {/* {admin.active ? "Deactivate" : "Activate"} */}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-400 text-sm col-span-full">
              No matching system administrators found matching your filter parameters.
            </div>
          )}
        </div>
      </div>

      {/* Control Action Modal Flow Components */}
      {selectedAdmin && !showEdit && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}

      <AddAdminModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSuccess={loadAdmins}
      />

      <EditAdminModal
        open={showEdit}
        admin={selectedAdmin}
        onClose={() => {
          setShowEdit(false);
          setSelectedAdmin(null);
        }}
        onSuccess={loadAdmins}
      />
    </>
  );
}

/* Modulated Details/Permission Overlay Container Screen View */
function AdminDetailsModal({ admin, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col border border-slate-100 max-h-[90vh] my-auto">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldAlert size={16} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Admin Access Log Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Info Field Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-6 custom-scrollbar">
          
          {/* Metadata Layout Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Operator</span>
              <p className="text-sm font-bold text-slate-900 truncate">{admin.name}</p>
            </div>
            <div className="space-y-0.5 sm:col-span-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secure Email Address</span>
              <p className="text-sm font-semibold text-slate-900 break-all">{admin.email}</p>
            </div>
            <div className="space-y-0.5 mt-2 sm:mt-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Group Core</span>
              <p className="text-sm font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                <Shield size={14} className="text-blue-500" />
                {admin.role}
              </p>
            </div>
          </div>

          {/* Module Explicit Permission Nodes Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              Authorized System Permissions ({admin.permissions?.length || 0})
            </h3>
            
            {admin.permissions && admin.permissions.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto p-0.5">
                {admin.permissions.map((permission: any) => (
                  <span
                    key={permission.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-xs font-mono font-bold uppercase tracking-wide shadow-2xs"
                  >
                    {permission.code}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-medium text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                This administrator profile holds zero active specific permission tokens. Use Edit to attach scopes.
              </p>
            )}
          </div>
        </div>

        {/* Modal Action Footer Control Panel */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-xl transition w-full sm:w-auto text-center shadow-xs"
          >
            Close Profile View
          </button>
        </div>

      </div>
    </div>
  );
}