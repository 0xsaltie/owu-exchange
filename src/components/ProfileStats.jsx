export default function ProfileStats({
  profile,
  listings,
}) {
  const exchangeListings = listings.filter(
    (listing) => listing.listingType === "exchange"
  ).length;

  const saleListings = listings.filter(
    (listing) => listing.listingType === "sale"
  ).length;

  const availableListings = listings.filter(
    (listing) => listing.status === "available"
  ).length;

  const stats = [
    {
      title: "Listings",
      value: listings.length,
      icon: "🧵",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Exchange Threads",
      value: exchangeListings,
      icon: "🔄",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "For Sale",
      value: saleListings,
      icon: "💰",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Available",
      value: availableListings,
      icon: "✅",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Completed Exchanges",
      value: profile.completedExchanges || 0,
      icon: "🤝",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Reviews",
      value: profile.totalReviews || 0,
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Rating",
      value:
        profile.rating && profile.rating > 0
          ? `${profile.rating.toFixed(1)} ★`
          : "N/A",
      icon: "🏆",
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Joined",
      value: profile.createdAt?.toDate
        ? profile.createdAt.toDate().getFullYear()
        : "2026",
      icon: "📅",
      color: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition duration-300"
        >
          <div
            className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl ${stat.color}`}
          >
            {stat.icon}
          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {stat.value}
          </h3>

          <p className="mt-2 text-gray-500 text-sm">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
}