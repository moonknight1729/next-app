"use client";
import axios from "axios";

import { useState } from "react";

export default function BookingForm({
  setSlots,
  selectedSlot,
  setAvailability,
  setSelectedSlot,
  setShowDialog,
  setReservationDetails,
}) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.guests || isNaN(formData.guests) || formData.guests <= 0) {
      newErrors.guests = "Number of guests must be a positive number.";
    }
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit contact number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Add selected slot time to form data
        const updatedFormData = { ...formData, time: selectedSlot.time };
        setFormData(updatedFormData);

        // Send booking data to the bookings endpoint
        await axios.post("https://intern-itvb.onrender.com/api/slots/bookings", updatedFormData);

        // Update slot status to 'reserved'
        const updatedSlot = { ...selectedSlot, status: "reserved" };
        await axios.put(
          `http://https://intern-itvb.onrender.com/api/slots/${selectedSlot.id}`,
          updatedSlot
        );

        // Update the local state of slots (optional, for UI consistency)
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === selectedSlot.id ? { ...slot, status: "reserved" } : slot
          )
        );

        // Display success message

        console.log(updatedFormData);

        setReservationDetails(formData);
        setShowDialog(true);

        // Reset form
        setFormData({
          date: "",
          time: "",
          guests: "",
          name: "",
          contact: "",
        });
        setErrors({});
        setAvailability(null);
        setSelectedSlot(null);
      } catch (error) {
        console.error("Error submitting reservation:", error);
        alert("Failed to submit reservation. Please try again.");
      }
    }
  };

  const checkAvailability = async () => {
    if (!formData.date || !formData.time) {
      setAvailability("Please select a date and time first.");
      return;
    }

    try {
      const res = await axios.get("http://https://intern-itvb.onrender.com/api/slots");
      const result = res.data.filter(
        (slot) =>
          slot.date === formData.date &&
          slot.time.slice(0, 2) === formData.time.slice(0, 2)
      );
      setSlots(result);
      setAvailability(
        result.length > 0 ? "Slot available!" : "Slot not available."
      );
      console.log("Matching slots:", result);
    } catch (error) {
      console.error("Error checking availability:", error);
      setAvailability("Error fetching slots data. Please try again.");
    }
  };

  return (
    <div className="max-w-md p-4 bg-white text-black rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Book a Table</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

          {/* Check Availability Button */}
          <div className="mt-2">
            <button
              type="button"
              onClick={checkAvailability}
              className="border border-blue-500 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Check Availability
            </button>
          </div>
        </div>

        {/* Number of Guests */}
        <div>
          <label className="block text-sm font-medium">Number of Guests</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.guests && (
            <p className="text-red-500 text-sm">{errors.guests}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="border border-gray-500 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
