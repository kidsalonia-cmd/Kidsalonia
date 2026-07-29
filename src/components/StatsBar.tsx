const stats = [
  { value: "20K+", label: "Happy Customers" },
  { value: "5K+", label: "Kids & Adults Styled" },
  { value: "1K+", label: "Salon Visits" },
  { value: "4.8", label: "Customer Rating" },
];

const StatsBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-pink-500 to-orange-400 px-6 py-10 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`ks-stat-card flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 py-6 text-center backdrop-blur-sm ${
              i < stats.length - 1 ? "md:border-r md:border-primary-foreground/50" : ""
            }`}
          >
            <span className="text-4xl sm:text-5xl font-extrabold">{stat.value}</span>
            <p className="text-lg sm:text-xl mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
