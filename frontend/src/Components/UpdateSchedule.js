import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function UpdateSchedule() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    departure: "",
    designation: "",
    stations: "",
    days: "",
    startingTimes: "",
  });

  useEffect(() => {
    // Parse query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const departure = searchParams.get("departure");
    const designation = searchParams.get("designation");
    const stations = searchParams.get("stations");
    const days = searchParams.get("days");
    const startingTimes = searchParams.get("startingTimes");

    // Set the form data with the retrieved values
    setFormData({
      departure: departure || "",
      designation: designation || "",
      stations: stations || "",
      days: days || "",
      startingTimes: startingTimes || "",
    });
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the update logic when the "Update" button is clicked
  const handleUpdate = () => {
    // Implement your update logic here with formData
    // You can send a request to your backend or update the data as needed
    // For this example, we'll just log the updated data
    console.log("Updated Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Update Schedule</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Departure:
            </label>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Designation:
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Stations:
            </label>
            <input
              type="text"
              name="stations"
              value={formData.stations}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Available Days:
            </label>
            <input
              type="text"
              name="days"
              value={formData.days}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Starting Times:
            </label>
            <input
              type="text"
              name="startingTimes"
              value={formData.startingTimes}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600 cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
