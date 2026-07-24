import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      try {
        const docRef = doc(db, "listings", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const listingData = {
            id: snap.id,
            ...snap.data(),
          };

          setListing(listingData);

          setSelectedImage(
            listingData.coverImage ||
              listingData.images?.[0] ||
              ""
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Listing...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Listing not found.
      </div>
    );
  }

          const handleRequestExchange = async () => {
          if (!user) {
            alert("Please login first.");
            return;
          }

          if (user.uid === listing.ownerId) {
            alert("This is your listing.");
            return;
          }

          try {
            // Prevent duplicate requests
            const q = query(
              collection(db, "exchangeRequests"),
              where("listingId", "==", listing.id),
              where("senderId", "==", user.uid)
            );

            const existing = await getDocs(q);

            if (!existing.empty) {
              alert("You have already requested this listing.");
              return;
            }

            // Create exchange request
            await addDoc(collection(db, "exchangeRequests"), {
              listingId: listing.id,

              senderId: user.uid,
              senderEmail: user.email,

              receiverId: listing.ownerId,

              listingType: listing.listingType,

              threadType: listing.threadType,
              color: listing.color,
              quantity: listing.quantity,
              unit: listing.unit,

              desiredThread: listing.desiredThread || null,
              price: listing.price || null,

              status: "pending",

              createdAt: serverTimestamp(),
            });

            // Notify owner
            await addDoc(collection(db, "notifications"), {
              userId: listing.ownerId,

              title: "New Exchange Request",

              message: `${user.email} requested your ${listing.threadType}.`,

              isRead: false,

              createdAt: serverTimestamp(),
            });

            alert("Exchange request sent successfully!");
          } catch (error) {
            console.error(error);
            alert(error.message);
          }
        };
  return (
    <div className="min-h-screen bg-stone-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/marketplace"
          className="text-amber-700 font-semibold hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mt-8">

          {/* LEFT SIDE */}
          <div>

            <img
              src={selectedImage}
              alt={listing.threadType}
              onDoubleClick={() =>
                setLightboxImage(selectedImage)
              }
              className="w-full h-96 object-cover rounded-2xl cursor-zoom-in shadow"
            />

            {listing.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">

                {listing.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`h-24 w-full rounded-lg object-cover cursor-pointer border-2 transition ${
                      selectedImage === image
                        ? "border-amber-700"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  />
                ))}

              </div>
            )}

          </div>

          {/* RIGHT SIDE */}
          <div>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                listing.listingType === "exchange"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {listing.listingType === "exchange"
                ? "Exchange"
                : "Sale"}
            </span>

            <h1 className="text-4xl font-bold mt-4">
              {listing.threadType}
            </h1>

            <div className="space-y-3 mt-6">

              <p>
                <strong>Color:</strong>{" "}
                {listing.color}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {listing.quantity} {listing.unit}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {listing.status}
              </p>

              {listing.listingType === "sale" && (
                <p className="text-3xl font-bold text-green-700">
                  ₦
                  {listing.price?.toLocaleString()}
                </p>
              )}

              {listing.listingType ===
                "exchange" && (
                <p>
                  <strong>Needs:</strong>{" "}
                  {listing.desiredThread}
                </p>
              )}

            </div>

            {/* Weaver */}
            <div className="border-t mt-8 pt-6">

              <h2 className="text-xl font-bold">
                Weaver Information
              </h2>

              <p className="mt-4">
                <Link
                  to={`/profile/${listing.ownerId}`}
                  className="font-semibold hover:text-amber-700"
              >
                      👤 {listing.ownerName}
                  </Link>
              </p>

              <p className="mt-2">
                📍{" "}
                {listing.ownerLocation ||
                  "Iseyin"}
              </p>

            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
        <button
          onClick={handleRequestExchange}
          disabled={listing.ownerId === user?.uid}
          className={`px-6 py-3 rounded-lg text-white ${
            listing.ownerId === user?.uid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-700 hover:bg-amber-800"
          }`}
        >
                Request Exchange
              </button>
              <button
                  onClick={() =>
                    navigate(`/chat/${listing.ownerId}`)
                  }
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
                >
                  Chat Weaver
                </button>

            </div>

          </div>

        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() =>
            setLightboxImage(null)
          }
        >
          <img
            src={lightboxImage}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

          <button
            onClick={() =>
              setLightboxImage(null)
            }
            className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}