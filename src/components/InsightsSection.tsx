import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";

const sortByDateDesc = (a: typeof blogs[0], b: typeof blogs[0]) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const InsightsSection = () => {
  const today = new Date();
  const displayBlogs = [...blogs]
    .filter((blog) => new Date(blog.date) <= today)
    .sort(sortByDateDesc)
    .slice(0, 3);

  return (
    <section id="insights" className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
          KidSalonia Insights
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Expert salon services delivered with comfort, trust, and attention to detail.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <Link
              key={blog.slug}
              to={`/insights/${blog.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{blog.date}</p>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{blog.excerpt}</p>
              <p className="text-xs text-muted-foreground">
                By {blog.author} · Category: {blog.category} · {blog.readTime}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/insights"
            className="inline-block rounded-md bg-primary px-8 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
