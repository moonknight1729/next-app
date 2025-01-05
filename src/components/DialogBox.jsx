

export default function DialogBox ({ reservationDetails, onClose })  {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-lg text-black font-semibold mb-4 text-center">Reservation Successful!</h2>
          <div className="text-sm text-black mb-4">
            <p><strong>Date:</strong> {reservationDetails.date}</p>
            <p><strong>Time:</strong> {reservationDetails.time}</p>
            <p><strong>Guests:</strong> {reservationDetails.guests}</p>
            <p><strong>Name:</strong> {reservationDetails.name}</p>
            <p><strong>Contact:</strong> {reservationDetails.contact}</p>
          </div>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  