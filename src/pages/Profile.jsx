import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileListings from "../components/ProfileListings";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch User
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile({
            id: userSnap.id,
            ...userSnap.data(),
          });
        }

        // Fetch Listings
        const listingsQuery = query(
          collection(db, "listings"),
          where("ownerId", "==", id)
        );

        const listingsSnapshot = await getDocs(listingsQuery);

        const listingsData = listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListings(listingsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found.
      </div>
    );
  }

  const availableListings = listings.filter(
    (item) => item.status === "available"
  ).length;

  const soldListings = listings.filter(
    (item) => item.status === "sold"
  ).length;

  const exchangedListings = listings.filter(
    (item) => item.status === "exchanged"
  ).length;

  return (
    <div className="min-h-screen bg-stone-100">

      {/* Cover */}
      <div className="h-60 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500"></div>

      <div className="max-w-6xl mx-auto px-6 -mt-24">

        {/* Header */}
        <ProfileHeader profile={profile} />

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            About Weaver
          </h2>

          <p className="text-gray-600">
            {profile.bio ||
              "This weaver hasn't added a bio yet."}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <p>
              📍 <strong>Location:</strong>{" "}
              {profile.location || "Iseyin"}
            </p>

            <p>
              📞 <strong>Phone:</strong>{" "}
              {profile.phone || "Not Provided"}
            </p>

            <p>
              📧 <strong>Email:</strong>{" "}
              {profile.email}
            </p>

            <p>
              📅 <strong>Joined:</strong>{" "}
              {profile.createdAt?.toDate?.().toLocaleDateString() ||
                "Recently"}
            </p>

          </div>

          {profile.phone && (
            <a
              href={`https://wa.me/${profile.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Chat on WhatsApp
            </a>
          )}

        </div>

        {/* Statistics */}
        <div className="mt-8">

          <ProfileStats
            total={listings.length}
            available={availableListings}
            sold={soldListings}
            exchanged={exchangedListings}
          />

        </div>

        {/* Listings */}
        <div className="mt-10">

          <ProfileListings
            listings={listings}
            currentUser={user}
          />

        </div>

      </div>
    </div>
  );
}