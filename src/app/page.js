"use client";

import { useState } from "react";
import BookingForm from "../components/BookingForm";
import SlotGrid from "@/components/SlotGrid";
import DialogBox from "../components/DialogBox";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Notice Message */}
      <div className="w-1/2 text-center bg-white border border-red-500 p-3 rounded-md mb-6">
        <p className="text-red-600 font-bold">
          Slots are available for dates from 3rd Jan to 5th Jan at 14:00-14:59, 16:00-16:59, and 18:00-18:59.
        </p>
      </div>

      {showDialog && (
        <DialogBox
          reservationDetails={reservationDetails}
          onClose={() => setShowDialog(false)}
        />
      )}
      <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-[200px] items-center justify-center w-full">
        <BookingForm
          setSlots={setSlots}
          slots={slots}
          selectedSlot={selectedSlot}
          availability={availability}
          setAvailability={setAvailability}
          setSelectedSlot={setSelectedSlot}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          reservationDetails={reservationDetails}
          setReservationDetails={setReservationDetails}
        />
        <SlotGrid
          slots={slots}
          setSlots={setSlots}
          setSelectedSlot={setSelectedSlot}
          selectedSlot={selectedSlot}
          availability={availability}
          setAvailability={setAvailability}
        />
      </div>
    </div>
  );
}
