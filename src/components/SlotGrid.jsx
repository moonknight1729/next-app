"use client"; // Ensure client-side interactivity

import { useState } from "react";

export default function SlotGrid({ slots, selectedSlot,setSelectedSlot,availability }) {


  const handleSlotClick = (slot) => {
    if (slot.status !== "reserved") {
      setSelectedSlot(slot);
      // if (onSlotSelect) onSlotSelect(slot); // Pass the selected slot to the parent
    }
  };

  return (
    <div className="max-w-md text-black p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-center mb-4">Select a Slot</h2>
      <div className="grid grid-cols-3 gap-4">
        {availability && slots.map((slot, index) => (
          <div
            key={index}
            onClick={() => handleSlotClick(slot)}
            className={`p-4 border rounded-md text-center cursor-pointer ${
              selectedSlot === slot
                ? "bg-blue-500 text-white"
                : slot.status === "reserved"
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-gray-100"
            }`}
          >
            <div>{slot.time}</div>
            <div className="text-sm">
              {slot.status === "reserved" ? "Reserved" : "Available"}
            </div>
          </div>
        ))}
      </div>
      {selectedSlot && (
        <div className="mt-4 p-2 text-center bg-green-100 text-green-700 rounded">
          Selected Slot: {selectedSlot.time} on {selectedSlot.date}
        </div>
      )}
    </div>
  );
}
