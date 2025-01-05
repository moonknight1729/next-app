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
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row-reverse gap-6 md:gap-[200px] items-center justify-center p-4">
      {showDialog && (
        <DialogBox
          reservationDetails={reservationDetails}
          onClose={() => setShowDialog(false)}
        />
      )}
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
  );
}
