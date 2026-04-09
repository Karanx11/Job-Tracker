import { useEffect, useState } from "react";
import axios from "axios";
import AddApplication from "../components/AddApplication";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchApps = async () => {
    const res = await axios.get("http://localhost:5000/api/applications");
    setApps(res.data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const columns = [
    "Applied",
    "Phone Screen",
    "Interview",
    "Offer",
    "Rejected",
  ];

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // 🔥 Drag logic
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const id = result.draggableId;
    const newStatus = result.destination.droppableId;

    await axios.put(
      `http://localhost:5000/api/applications/${id}`,
      { status: newStatus }
    );

    fetchApps();
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/applications/${id}`);
    fetchApps();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center mb-6 bg-primary text-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold">
          Job Tracker Dashboard
        </h1>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Logout
        </button>
      </div>

      {/* ➕ Add Application */}
      <AddApplication refresh={fetchApps} />

      {/* 🔥 BOARD */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto mt-6 pb-2">
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  className="bg-white p-4 min-w-[260px] rounded-xl shadow-sm border"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-primary font-bold mb-3">
                    {col}
                  </h2>

                  {apps
                    .filter((a) => a.status === col)
                    .map((app, index) => (
                      <Draggable
                        key={app._id}
                        draggableId={app._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              setSelectedApp(app);
                              setEditData(app);
                              setEditMode(false);
                            }}
                            className="bg-white border-l-4 border-primary p-4 mb-3 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition transform hover:-translate-y-1"
                          >
                            <p className="font-semibold text-gray-800">
                              {app.company}
                            </p>

                            <p className="text-sm text-gray-600">
                              {app.role}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(
                                app.createdAt
                              ).toLocaleDateString()}
                            </p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(app._id);
                              }}
                              className="text-red-500 text-xs mt-2 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* 🔥 VIEW / EDIT MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h2 className="text-lg font-bold mb-3 text-primary">
              {selectedApp.company}
            </h2>

            {!editMode ? (
              <>
                <p><b>Role:</b> {selectedApp.role}</p>
                <p><b>Status:</b> {selectedApp.status}</p>
                <p><b>Location:</b> {selectedApp.location || "N/A"}</p>
                <p><b>Salary:</b> {selectedApp.salary_range || "N/A"}</p>

                <button
                  onClick={() => setEditMode(true)}
                  className="bg-primary text-white px-3 py-1 rounded mt-4 hover:bg-blue-900 transition"
                >
                  Edit
                </button>
              </>
            ) : (
              <>
                <input
                  value={editData.company}
                  onChange={(e) =>
                    setEditData({ ...editData, company: e.target.value })
                  }
                  className="w-full border p-2 mb-2 rounded focus:ring-2 focus:ring-primary outline-none"
                />

                <input
                  value={editData.role}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                  className="w-full border p-2 mb-2 rounded focus:ring-2 focus:ring-primary outline-none"
                />

                <textarea
                  value={editData.notes || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, notes: e.target.value })
                  }
                  className="w-full border p-2 mb-2 rounded focus:ring-2 focus:ring-primary outline-none"
                />

                <button
                  onClick={async () => {
                    await axios.put(
                      `http://localhost:5000/api/applications/${editData._id}`,
                      editData
                    );
                    setEditMode(false);
                    setSelectedApp(null);
                    fetchApps();
                  }}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-900 transition"
                >
                  Save
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedApp(null)}
              className="mt-4 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔥 LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
              >
                Yes, Logout
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}