import { useParams, Link } from "react-router-dom";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import { blogs } from "@/data/blogs";
import SEO, { createBlogPostSchema } from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);
  const isFuturePost = blog && new Date(blog.date) > new Date();

  if (!blog || isFuturePost) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <SEO
          title="Blog Not Found | KidSalonia"
          description="The blog post you're looking for could not be found."
          noIndex
        />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog Not Found</h1>
            <Link to="/insights" className="text-primary hover:underline">
              ← Back to Insights
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render inline markdown: bold and [link](url)
  const renderInline = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        if (url.startsWith("/") || url.startsWith("#")) {
          return <Link key={j} to={url} className="text-primary hover:underline font-medium">{linkText}</Link>;
        }
        return <a key={j} href={url} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">{linkText}</a>;
      }
      return <span key={j}>{part}</span>;
    });
  };

  // Parse markdown-like content into HTML
  const renderContent = (content: string) => {
    // Pre-process: split blocks that have a heading followed by list items
    const rawBlocks = content.split("\n\n");
    const blocks: string[] = [];
    for (const block of rawBlocks) {
      // If block starts with ### and also contains list items, split them
      if ((block.startsWith("### ") || block.startsWith("## ")) && block.includes("\n- ")) {
        const firstNewline = block.indexOf("\n");
        blocks.push(block.slice(0, firstNewline));
        blocks.push(block.slice(firstNewline + 1));
      } else {
        blocks.push(block);
      }
    }

    return blocks.map((block, index) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-foreground mt-6 mb-3">
            {renderInline(block.replace("### ", ""))}
          </h3>
        );
      }

      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {renderInline(block.replace("## ", ""))}
          </h2>
        );
      }

      if (block.includes("\n- ") || block.startsWith("- ")) {
        const items = block.split("\n- ").filter(Boolean);
        const intro = items[0].startsWith("- ") ? null : items.shift();
        return (
          <div key={index}>
            {intro && <p className="text-foreground/80 leading-relaxed mb-2">{renderInline(intro)}</p>}
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              {(intro ? items : block.split("\n- ").filter(Boolean)).map((item, i) => {
                const cleanItem = item.startsWith("- ") ? item.slice(2) : item;
                return (
                  <li key={i}>{renderInline(cleanItem)}</li>
                );
              })}
            </ul>
          </div>
        );
      }

      if (block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ")) {
        const items = block.split(/\n\d+\.\s/).filter(Boolean);
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2 text-foreground/80 leading-relaxed">
            {items.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ol>
        );
      }

      return (
        <p key={index} className="text-foreground/80 leading-relaxed mb-4">
          {renderInline(block)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title={`${blog.title} | KidSalonia`}
        description={blog.excerpt}
        canonical={`https://www.kidsalonia.com/insights/${blog.slug}`}
        ogType="article"
        ogImage={typeof blog.image === "string" && blog.image.startsWith("http") ? blog.image : undefined}
        jsonLd={createBlogPostSchema(blog)}
      />
      <Header />
      <SocialSidebar />

      {/* Hero Image */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[300px] md:h-[420px] object-cover rounded-xl"
        />
      </div>

      {/* Meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <span>Published Date: {blog.date}</span>
          <span>Author: {blog.author}</span>
          <span>Read Time: {blog.readTime}</span>
          <span>Category: {blog.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
          {blog.title}
        </h1>

        {/* Content */}
        <article className="prose max-w-none pb-16">
          {renderContent(blog.content)}
        </article>

        {/* Back link */}
        <div className="pb-12">
          <Link to="/insights" className="text-primary hover:underline font-semibold">
            ← Back to All Insights
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
