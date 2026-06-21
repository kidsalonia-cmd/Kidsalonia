const stats = [
  { value: "20K+", label: "Happy Customers" },
  { value: "5K+", label: "Kids & Adults Styled" },
  { value: "1K+", label: "Salon Visits" },
  { value: "4.8", label: "Customer Rating" },
];

const StatsBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-10 px-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center py-6 ${
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
