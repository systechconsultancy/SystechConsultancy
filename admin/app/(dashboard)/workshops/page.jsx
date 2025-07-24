"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserIcon, CalendarDaysIcon, CurrencyRupeeIcon, ClockIcon, PencilSquareIcon, TrashIcon, UsersIcon, } from "@heroicons/react/24/solid";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const WorkshopCard = ({ workshop, onDelete }) => {
  const { _id, title, date, time, thumbnailUrl, status, mentor, maxParticipants, fee, duration } = workshop;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded-md shadow-sm">
          {status}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2 text-blue-500" />
            <span>{mentor}</span>
          </div>
          <div className="flex items-center">
            <CurrencyRupeeIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>{fee}</span>
          </div>
          <div className="flex items-center">
            <CalendarDaysIcon className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{new Date(date).toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="w-4 h-4 mr-2 text-purple-500" />
            <span>Max: {maxParticipants}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-teal-500" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          {/* Only render the buttons if the status is NOT completed */}
          {status.toLowerCase() !== 'completed' && (
            <>
              <Link
                href={`/workshops/edit/${_id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              >
                <PencilSquareIcon className="w-4 h-4 mr-1" />
                Edit
              </Link>
              <button
                onClick={() => onDelete(_id, title)}
                className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div >
  );
};


export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workshopToDelete, setWorkshopToDelete] = useState(null);
  const openDeleteModal = (id, title) => setWorkshopToDelete({
    id,
    title
  });
  const closeDeleteModal = () => setWorkshopToDelete(null);
  const handleConfirmDelete = () => {
    if (!workshopToDelete?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/workshops/${workshopToDelete.id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete");
        setWorkshops(prev => prev.filter(w => w._id !== workshopToDelete.id));
        closeDeleteModal(); // Close modal on success
      })
      .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete workshop.");
        closeDeleteModal(); // Close modal on error
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/workshops`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setWorkshops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workshops", err);
        setLoading(false);
      });
  }, []);

  const filterByStatus = (status) =>
    workshops.filter((w) => w.status.toLowerCase() === status);

  if (loading) return <div className="p-6">Loading workshops...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workshops Admin Panel</h1>

      {["published", "draft", "completed"].map((status) => (
        <div key={status} className="mb-10">
          <h2 className="text-xl font-semibold capitalize mb-4">
            {status} Workshops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterByStatus(status).map((workshop) => (
              <WorkshopCard key={workshop._id} workshop={workshop} onDelete={openDeleteModal} />
            ))}
            {filterByStatus(status).length === 0 && (
              <p className="text-gray-400 text-sm">No {status} workshops.</p>
            )}
          </div>
        </div>
      ))}
      <ConfirmationModal
        isOpen={!!workshopToDelete}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Workshop"
        message={
          <>
            Are you sure you want to delete the workshop <span className="font-bold text-black">{workshopToDelete?.title}</span>
            "? This action cannot be undone."
          </>
        }
      />
    </div>
  );
}
