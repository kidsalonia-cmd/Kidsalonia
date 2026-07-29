import { Link } from "react-router-dom";

import { getBookingPath } from "@/lib/booking";

interface ServiceItemProps {
  name: string;
  description: string;
  price: string;
}

const ServiceItem = ({ name, description, price }: ServiceItemProps) => {
  return (
    <Link
      to={getBookingPath(name)}
      className="ks-service-card flex justify-between gap-6 border-b border-border px-3 py-4 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="max-w-[75%]">
        <h3 className="text-sm font-bold uppercase text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <span className="font-bold text-primary whitespace-nowrap text-sm">{price}</span>
    </Link>
  );
};

export default ServiceItem;
