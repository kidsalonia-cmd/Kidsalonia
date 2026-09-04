import { readFileSync, writeFileSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const site = "https://www.kidsalonia.com";

const blogsSource = readFileSync(resolve(root, "src/data/blogs.ts"), "utf8");
const registrySource = readFileSync(resolve(root, "src/data/seo-registry.ts"), "utf8");
const servicesSource = readFileSync(resolve(root, "src/data/services.ts"), "utf8");
const franchiseCitiesSource = readFileSync(resolve(root, "src/data/franchise-cities.ts"), "utf8");

const monthIndex = new Map(
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => [month, index + 1]),
);

function toIsoDate(value) {
  const clean = value.trim();
  const longDate = clean.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (longDate) {
    const [, monthName, day, year] = longDate;
    const month = String(monthIndex.get(monthName) ?? 1).padStart(2, "0");
    return `${year}-${month}-${String(day).padStart(2, "0")}`;
  }
  return clean.match(/^\d{4}-\d{2}-\d{2}$/) ? clean : new Date().toISOString().slice(0, 10);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function uniqueByPath(entries) {
  const map = new Map();
  for (const entry of entries) {
    const existing = map.get(entry.path);
    if (!existing || entry.lastmod > existing.lastmod) map.set(entry.path, entry);
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

function writeFileSafely(path, content) {
  const tempPath = `${path}.tmp`;
  writeFileSync(tempPath, content, "utf8");
  try {
    renameSync(tempPath, path);
  } catch {
    rmSync(path, { force: true });
    renameSync(tempPath, path);
  }
}

const registryEntries = Array.from(
  registrySource.matchAll(
    /path:\s*"([^"]+)"[\s\S]*?lastUpdated:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"/g,
  ),
)
  .map((match) => ({
    path: match[1],
    lastmod: toIsoDate(match[2]),
    status: match[3],
    priority: match[1] === "/" ? "1.0" : match[1].startsWith("/insights/") ? "0.7" : "0.9",
    changefreq: match[1] === "/" || match[1] === "/insights" ? "weekly" : "monthly",
  }))
  .filter((entry) => entry.status === "live" && !entry.path.startsWith("/admin"));

const blogEntries = Array.from(
  blogsSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g),
).map((match) => ({
  path: `/insights/${match[1]}`,
  lastmod: toIsoDate(match[2]),
  priority: "0.7",
  changefreq: "monthly",
}));

const serviceEntries = Array.from(
  servicesSource.matchAll(/slug:\s*"([^"]+)"/g),
).map((match) => {
  const slug = match[1];
  const path = slug.endsWith("-gurgaon") ? `/${slug}` : `/${slug}-gurgaon`;

  return {
    path,
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "0.9",
    changefreq: "monthly",
  };
});

const franchiseCityEntries = Array.from(
  franchiseCitiesSource.matchAll(/city\("([^"]+)"\s*,\s*"([^"]+)"/g),
).map((match) => ({
  path: `/franchise/${slugify(match[1])}`,
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "0.8",
  changefreq: "monthly",
}));

const franchiseDirectoryEntry = {
  path: "/franchise/cities",
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "0.9",
  changefreq: "monthly",
};

const franchiseMediaKitEntry = {
  path: "/franchise/media-kit",
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "0.7",
  changefreq: "monthly",
};

const gurgaonLocalEntry = {
  path: "/gurgaon-salon-near-me",
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "0.9",
  changefreq: "weekly",
};

const waxingEntry = {
  path: "/waxing-gurgaon",
  lastmod: new Date().toISOString().slice(0, 10),
  priority: "0.9",
  changefreq: "weekly",
};

const routes = uniqueByPath([
  ...registryEntries,
  ...serviceEntries,
  gurgaonLocalEntry,
  waxingEntry,
  franchiseDirectoryEntry,
  franchiseMediaKitEntry,
  ...franchiseCityEntries,
  ...blogEntries,
]);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(site + route.path)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${escapeXml(site + route.path)}" />
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const localPages = uniqueByPath([
  ...registryEntries,
  ...serviceEntries,
  gurgaonLocalEntry,
  waxingEntry,
  franchiseDirectoryEntry,
  franchiseMediaKitEntry,
  ...franchiseCityEntries,
])
  .filter((entry) => !entry.path.startsWith("/insights/"))
  .map((entry) => `- [${entry.path === "/" ? "Home" : entry.path.slice(1).replaceAll("-", " ")}](${entry.path})`)
  .join("\n");

const latestBlogs = blogEntries
  .sort((a, b) => b.lastmod.localeCompare(a.lastmod))
  .slice(0, 20)
  .map((entry) => `- [${entry.path.replace("/insights/", "").replaceAll("-", " ")}](${entry.path})`)
  .join("\n");

const llms = `# KidSalonia

> KidSalonia is Gurugram's premium kids and family salon for gentle haircuts, mundan, nail art, manicure, pedicure, skin care, party grooming, and child-friendly salon experiences. KidSalonia also offers at-home waxing in Gurgaon subject to service-area and appointment availability, and invites franchise enquiries across India.

KidSalonia is located at Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101, close to Airia Mall and Golf Course Extension Road. Services use child-safe products and trained stylists for babies, toddlers, kids, tweens, mothers, and families. Open Monday and Wednesday-Friday, 11:30 AM to 8:30 PM, and Saturday-Sunday, 10:30 AM to 9:00 PM. Closed Tuesdays.

## Core Pages

${localPages}

## Latest Guides

${latestBlogs}

## Contact

- Website: ${site}
- Booking: ${site}/contact-us
- Gurgaon local salon directory: ${site}/gurgaon-salon-near-me
- At-home waxing Gurgaon: ${site}/waxing-gurgaon
- Franchise: ${site}/franchise
- Franchise city directory: ${site}/franchise/cities
- Franchise media kit: ${site}/franchise/media-kit
- Phone: +91 8130307036
- Location: Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101
`;

writeFileSafely(resolve(root, "public/sitemap.xml"), sitemap);
writeFileSafely(resolve(root, "public/llms.txt"), llms);

console.log(`Generated sitemap.xml with ${routes.length} URLs, including ${franchiseCityEntries.length} franchise city pages.`);
