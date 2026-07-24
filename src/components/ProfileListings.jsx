import { Link } from "react-router-dom";
import ListingCard from "./ListingCard";

export default function ProfileListings({
  listings,
  currentUser,
}) {
  const availableListings = listings.filter(
    (listing) => listing.status === "available"
  );

  const soldListings = listings.filter(
    (listing) => listing.status !== "available"
  );

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Weaver's Listings
          </h2>

          <p className="text-gray-500 mt-1">
            Browse threads currently offered by this seller.
          </p>
        </div>

        <div className="flex gap-3">
          <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
            {listings.length} Total
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {availableListings.length} Available
          </span>

          <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
            {soldListings.length} Sold/Exchanged
          </span>
        </div>
      </div>

      {/* Empty State */}
      {listings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="text-7xl mb-5">🧵</div>

          <h3 className="text-2xl font-bold">
            No Listings Yet
          </h3>

          <p className="text-gray-500 mt-3">
            This weaver hasn't posted any thread listings.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <div key={listing.id}>
              <Link to={`/listing/${listing.id}`}>
                <ListingCard
                  listing={listing}
                  user={currentUser}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}