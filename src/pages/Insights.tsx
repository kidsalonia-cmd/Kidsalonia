import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import { blogs } from "@/data/blogs";
import SEO from "@/components/SEO";
import blogBgImg from "@/assets/blogbg.jpg";

const Insights = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Kids Care Blog & Insights | KidSalonia"
        description="Read expert tips on kids haircuts, nail art, skin care, and grooming. Practical advice for parents from Gurugram's premium kids salon."
        canonical="https://www.kidsalonia.com/insights"
      />
      <Header />
      <SocialSidebar />

      {/* Hero Section */}
      <section className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src={blogBgImg}
          alt="Kids care insights and blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <p className="text-primary-foreground text-lg font-semibold mb-2">KidSalonia</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">INSIGHTS</h1>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Kids Care Blog</h2>
          <p className="text-white/80 text-base">Practical advice for parents and children</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...blogs].filter((blog) => new Date(blog.date) <= new Date()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((blog) => (
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
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition text-lg">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{blog.excerpt}</p>
              <p className="text-xs text-muted-foreground">
                By {blog.author} · {blog.category} · {blog.readTime}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
