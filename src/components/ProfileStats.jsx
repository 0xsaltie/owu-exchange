export default function ProfileStats({
  total,
  available,
  sold,
  exchanged,
}) {
  const stats = [
    {
      title: "Total Listings",
      value: total,
      icon: "🧵",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Available",
      value: available,
      icon: "✅",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Sold",
      value: sold,
      icon: "💰",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Exchanged",
      value: exchanged,
      icon: "🤝",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition"
        >
          <div
            className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl ${stat.color}`}
          >
            {stat.icon}
          </div>

          <h3 className="mt-4 text-3xl font-bold">
            {stat.value}
          </h3>

          <p className="mt-2 text-gray-500">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
}