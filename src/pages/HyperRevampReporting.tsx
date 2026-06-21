import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { blogs } from "@/data/blogs";
import {
  seoRegistry,
  seoInfrastructure,
  geoOptimization,
  aeoOptimization,
} from "@/data/seo-registry";
import {
  CheckCircle2,
  Globe,
  Search,
  Bot,
  FileText,
  BarChart3,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Award,
  Calendar,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  Sparkles,
  Link2,
  CheckCircle,
  XCircle,
  Instagram,
  Facebook,
  Users,
  Image,
} from "lucide-react";
import logo from "@/assets/Logo2.webp";
import hyperrevampLogo from "@/assets/hyperrevamp-logo.webp";
import { supabase } from "@/integrations/supabase/client";

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

/* ─── Glass Badge ─── */
const GlassBadge = ({ children, variant = "success" }: { children: React.ReactNode; variant?: "success" | "warning" | "info" }) => {
  const colors = {
    success: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    info: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm ${colors[variant]}`}>
      {children}
    </span>
  );
};

/* ─── Glass Stat Card ─── */
const GlassStatCard = ({ icon: Icon, label, value, sub, delay = 0 }: { icon: any; label: string; value: number; sub?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-default"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-sm border border-white/10">
          <Icon size={18} className="text-white/70" />
        </div>
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em]">{label}</span>
      </div>
      <p className="text-4xl font-black text-white tracking-tight">
        <AnimatedCounter target={value} />
      </p>
      {sub && <p className="text-xs text-white/30 mt-1.5 font-medium">{sub}</p>}
    </div>
  </motion.div>
);

/* ─── Section Wrapper ─── */
const GlassSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.section>
);

/* ─── Section Title ─── */
const SectionTitle = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
    <div className="rounded-lg bg-white/10 p-2 border border-white/10">
      <Icon size={18} className="text-white/70" />
    </div>
    {children}
  </h2>
);

/* ─── Page Row ─── */
const PageRow = ({ page, index }: { page: typeof seoRegistry[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  const titleLen = page.title.length;
  const descLen = page.metaDescription.length;
  const titleOk = titleLen <= 70;
  const descOk = descLen <= 160;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-white/10 rounded-2xl mb-3 overflow-hidden bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-300"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left group">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/20 w-6">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white/90 text-sm">{page.path}</span>
              <GlassBadge variant={page.status === "live" ? "success" : "warning"}>{page.status}</GlassBadge>
            </div>
            <p className="text-xs text-white/30 mt-0.5 line-clamp-1">{page.h1}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[10px] text-white/25 font-medium tracking-wide">
            <span>{page.jsonLdTypes.length} schemas</span>
            <span>{page.faqCount} FAQs</span>
            <span>{page.primaryKeywords.length + page.secondaryKeywords.length + page.longTailKeywords.length} kw</span>
          </div>
          {open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30 group-hover:text-white/50 transition" />}
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5 border-t border-white/5 pt-4 space-y-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">Title Tag</label>
              <p className="text-xs text-white/70 mt-1.5 font-mono bg-white/5 rounded-lg p-3 border border-white/5">{page.title}</p>
              <p className={`text-[10px] mt-1.5 font-medium ${titleOk ? "text-emerald-400/80" : "text-red-400/80"}`}>{titleLen} chars {titleOk ? "✓" : "⚠ over 70"}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">Meta Description</label>
              <p className="text-xs text-white/70 mt-1.5 font-mono bg-white/5 rounded-lg p-3 border border-white/5">{page.metaDescription}</p>
              <p className={`text-[10px] mt-1.5 font-medium ${descOk ? "text-emerald-400/80" : "text-red-400/80"}`}>{descLen} chars {descOk ? "✓" : "⚠ over 160"}</p>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2.5 block">Keywords & Google SERP Position</label>
            <div className="space-y-2">
              {[
                { label: "Primary", keys: page.primaryKeywords, color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" },
                { label: "Secondary", keys: page.secondaryKeywords, color: "bg-sky-500/15 text-sky-300 border-sky-500/20" },
                { label: "Long-tail", keys: page.longTailKeywords, color: "bg-purple-500/15 text-purple-300 border-purple-500/20" },
              ].map(row => (
                <div key={row.label} className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-white/25 w-16 shrink-0 font-medium">{row.label}:</span>
                  {row.keys.map(k => {
                    const rank = page.keywordRanks?.[k];
                    const googlePage = rank ? Math.ceil(rank / 10) : null;
                    const rankColor = rank
                      ? rank <= 10 ? "bg-emerald-500/25 text-emerald-300 border-emerald-500/30"
                      : rank <= 30 ? "bg-amber-500/25 text-amber-300 border-amber-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/25"
                      : "bg-white/5 text-white/20 border-white/10";
                    return (
                      <span key={k} className={`text-[10px] px-2 py-0.5 rounded-full border ${row.color} inline-flex items-center gap-1.5`}>
                        {k}
                        {rank && (
                          <span className={`text-[9px] px-1.5 py-px rounded-full border font-bold ${rankColor}`} title={`Google position #${rank}`}>
                            P{googlePage}·#{rank}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { val: page.jsonLdTypes.length, label: "JSON-LD Schemas" },
              { val: page.faqCount, label: "FAQ Entries" },
              { val: page.serviceOffersCount, label: "Service Offers" },
              { val: page.images, label: "Images" },
            ].map(item => (
              <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                <p className="text-lg font-black text-white/90">{item.val}</p>
                <p className="text-[10px] text-white/30 font-medium">{item.label}</p>
              </div>
            ))}
          </div>

          {page.jsonLdTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-white/25 font-medium">Schemas:</span>
              {page.jsonLdTypes.map(t => <span key={t} className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full border">{t}</span>)}
            </div>
          )}

          <p className="text-[10px] text-white/15 font-medium">Last updated: {page.lastUpdated}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

/* ─── Mini Progress Bar ─── */
const MiniBar = ({ label, percent }: { label: string; percent: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-xs text-white/50 font-medium">{label}</span>
        <span className="text-xs text-white/30 font-mono">{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
        />
      </div>
    </div>
  );
};

/* ─── Live Keyword Data Type ─── */
interface LiveKeyword {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  page: string;
  prevPosition: number | null;
  change: number;
  trend: 'up' | 'down' | 'stable' | 'new';
}

/* ─── Live Keyword Tracker ─── */
const LiveKeywordTracker = () => {
  const [keywords, setKeywords] = useState<LiveKeyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState({ start: '', end: '' });
  const [filter, setFilter] = useState<'all' | 'top10' | 'top30' | 'beyond'>('all');
  const [kwAnalysis, setKwAnalysis] = useState<Record<string, { volume: number; difficulty: number }>>({});
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const fetchKeywordAnalysis = async (kws: string[]) => {
    if (kws.length === 0) return;
    setAnalysisLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('keyword-analysis', {
        body: { keywords: kws },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.analysis) setKwAnalysis(data.analysis);
    } catch (err: any) {
      console.error('Keyword analysis error:', err.message);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const fetchKeywords = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('gsc-keywords');
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);
      const kws = data.keywords || [];
      setKeywords(kws);
      setPeriod(data.period || { start: '', end: '' });
      fetchKeywordAnalysis(kws.map((k: any) => k.keyword));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchKeywords(); }, []);

  const filtered = keywords.filter(k => {
    if (filter === 'top10') return k.position <= 10;
    if (filter === 'top30') return k.position > 10 && k.position <= 30;
    if (filter === 'beyond') return k.position > 30;
    return true;
  });

  const top10Count = keywords.filter(k => k.position <= 10).length;
  const improvingCount = keywords.filter(k => k.trend === 'up').length;
  const decliningCount = keywords.filter(k => k.trend === 'down').length;

  const TrendIcon = ({ trend, change }: { trend: string; change: number }) => {
    if (trend === 'up') return <span className="inline-flex items-center gap-0.5 text-emerald-400"><TrendingUp size={12} /><span className="text-[10px] font-bold">+{Math.abs(change).toFixed(1)}</span></span>;
    if (trend === 'down') return <span className="inline-flex items-center gap-0.5 text-red-400"><TrendingDown size={12} /><span className="text-[10px] font-bold">-{Math.abs(change).toFixed(1)}</span></span>;
    if (trend === 'new') return <span className="inline-flex items-center gap-0.5 text-purple-400"><Sparkles size={12} /><span className="text-[10px] font-bold">NEW</span></span>;
    return <span className="inline-flex items-center gap-0.5 text-white/30"><Minus size={12} /><span className="text-[10px] font-bold">0</span></span>;
  };

  return (
    <GlassSection>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3">
          <SectionTitle icon={Search}>Live Keyword Tracker</SectionTitle>
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/70 font-semibold uppercase tracking-wider">GSC Live</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {period.start && (
            <span className="text-[10px] text-white/25 font-mono">{period.start} → {period.end}</span>
          )}
          <button
            onClick={fetchKeywords}
            disabled={loading}
            className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 hover:text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            Refresh
          </button>
        </div>
      </div>

      {/* Stats row */}
      {keywords.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <p className="text-2xl font-black text-white/90">{keywords.length}</p>
            <p className="text-[10px] text-white/30 font-medium">Total Keywords</p>
          </div>
          <div className="bg-emerald-500/5 rounded-xl p-3 text-center border border-emerald-500/10">
            <p className="text-2xl font-black text-emerald-400">{top10Count}</p>
            <p className="text-[10px] text-emerald-300/50 font-medium">Page 1 (Top 10)</p>
          </div>
          <div className="bg-emerald-500/5 rounded-xl p-3 text-center border border-emerald-500/10">
            <p className="text-2xl font-black text-emerald-400">{improvingCount}</p>
            <p className="text-[10px] text-emerald-300/50 font-medium">Improving ↑</p>
          </div>
          <div className="bg-red-500/5 rounded-xl p-3 text-center border border-red-500/10">
            <p className="text-2xl font-black text-red-400">{decliningCount}</p>
            <p className="text-[10px] text-red-300/50 font-medium">Declining ↓</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {([['all', 'All'], ['top10', 'Page 1'], ['top30', 'Page 2-3'], ['beyond', 'Page 4+']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all ${
              filter === key
                ? 'bg-white/10 border-white/20 text-white/80'
                : 'bg-white/[0.02] border-white/5 text-white/25 hover:text-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}

      {loading && keywords.length === 0 ? (
        <div className="text-center py-12">
          <Loader2 size={24} className="animate-spin text-white/30 mx-auto mb-3" />
          <p className="text-xs text-white/25">Fetching live data from Google Search Console...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">#</th>
                <th className="text-left px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Keyword</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Position</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Trend</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-purple-400/40 uppercase tracking-[0.15em] hidden md:table-cell">Vol.</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-amber-400/40 uppercase tracking-[0.15em] hidden md:table-cell">KD</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden md:table-cell">Clicks</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden md:table-cell">Impressions</th>
                <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden lg:table-cell">CTR</th>
                <th className="text-left px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden lg:table-cell">Page</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((kw, i) => {
                const posColor = kw.position <= 10
                  ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/20'
                  : kw.position <= 30
                  ? 'text-amber-400 bg-amber-500/15 border-amber-500/20'
                  : 'text-red-400 bg-red-500/15 border-red-500/20';

                const analysis = kwAnalysis[kw.keyword.toLowerCase()];
                const diffColor = analysis
                  ? analysis.difficulty <= 30 ? 'text-emerald-400' : analysis.difficulty <= 60 ? 'text-amber-400' : 'text-red-400'
                  : 'text-white/20';

                return (
                  <motion.tr
                    key={kw.keyword}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-3 py-2.5 text-white/20 font-mono">{i + 1}</td>
                    <td className="px-3 py-2.5 text-white/70 font-medium max-w-[200px] truncate">{kw.keyword}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${posColor}`}>
                        #{kw.position}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <TrendIcon trend={kw.trend} change={kw.change} />
                    </td>
                    <td className="px-3 py-2.5 text-center hidden md:table-cell">
                      {analysisLoading ? (
                        <Loader2 size={10} className="animate-spin text-white/20 mx-auto" />
                      ) : analysis ? (
                        <span className="text-purple-400 font-mono text-[10px]">{analysis.volume.toLocaleString()}</span>
                      ) : (
                        <span className="text-white/15">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center hidden md:table-cell">
                      {analysisLoading ? (
                        <Loader2 size={10} className="animate-spin text-white/20 mx-auto" />
                      ) : analysis ? (
                        <span className={`font-mono text-[10px] font-bold ${diffColor}`}>{analysis.difficulty}</span>
                      ) : (
                        <span className="text-white/15">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-center text-white/50 hidden md:table-cell">{kw.clicks}</td>
                    <td className="px-3 py-2.5 text-center text-white/50 hidden md:table-cell">{kw.impressions}</td>
                    <td className="px-3 py-2.5 text-center text-white/50 hidden lg:table-cell">{kw.ctr}%</td>
                    <td className="px-3 py-2.5 text-white/30 text-[10px] font-mono hidden lg:table-cell truncate max-w-[150px]">{kw.page}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : !loading && (
        <p className="text-xs text-white/25 text-center py-8">No keywords found for this filter.</p>
      )}
    </GlassSection>
  );
};

/* ─── Blog Content Table with Views ─── */
const BlogContentTable = () => {
  const [pageViews, setPageViews] = useState<Record<string, { clicks: number; impressions: number }>>({});
  const [gaViews, setGaViews] = useState<Record<string, { views: number; users: number }>>({});
  const [loading, setLoading] = useState(true);
  const [gaLoading, setGaLoading] = useState(true);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const fetchGSC = async () => {
      try {
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/gsc-keywords?mode=pages`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (res.ok) {
          const data = await res.json();
          setPageViews(data.pages || {});
        }
      } catch (e) {
        console.error('Failed to fetch GSC page data:', e);
      } finally {
        setLoading(false);
      }
    };
    const fetchGA = async () => {
      try {
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/gsc-keywords?mode=analytics`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (res.ok) {
          const data = await res.json();
          setGaViews(data.pages || {});
        }
      } catch (e) {
        console.error('Failed to fetch GA data:', e);
      } finally {
        setGaLoading(false);
      }
    };
    fetchGSC();
    fetchGA();
  }, []);

  const getBlogGSC = (slug: string) => {
    const path = `/insights/${slug}`;
    return pageViews[path] || { clicks: 0, impressions: 0 };
  };

  const getBlogGA = (slug: string) => {
    const path = `/insights/${slug}`;
    return gaViews[path] || { views: 0, users: 0 };
  };

  const totalBlogClicks = blogs.reduce((sum, b) => sum + getBlogGSC(b.slug).clicks, 0);
  const totalBlogImpressions = blogs.reduce((sum, b) => sum + getBlogGSC(b.slug).impressions, 0);
  const totalBlogViews = blogs.reduce((sum, b) => sum + getBlogGA(b.slug).views, 0);
  const totalBlogUsers = blogs.reduce((sum, b) => sum + getBlogGA(b.slug).users, 0);

  const isLoading = loading || gaLoading;

  return (
    <div className="overflow-x-auto">
      {!isLoading && (
        <div className="flex flex-wrap gap-6 mb-4 px-4">
          <div className="text-xs text-white/40">
            Total Views: <span className="text-purple-400 font-bold">{totalBlogViews.toLocaleString()}</span>
          </div>
          <div className="text-xs text-white/40">
            Unique Users: <span className="text-amber-400 font-bold">{totalBlogUsers.toLocaleString()}</span>
          </div>
          <div className="text-xs text-white/40">
            Search Clicks: <span className="text-emerald-400 font-bold">{totalBlogClicks}</span>
          </div>
          <div className="text-xs text-white/40">
            Impressions: <span className="text-sky-400 font-bold">{totalBlogImpressions.toLocaleString()}</span>
          </div>
        </div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-4 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">#</th>
            <th className="text-left px-4 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Title</th>
            <th className="text-left px-4 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden md:table-cell">Category</th>
            <th className="text-right px-4 py-3 text-[10px] font-bold text-purple-400/40 uppercase tracking-[0.15em]">Views</th>
            <th className="text-right px-4 py-3 text-[10px] font-bold text-amber-400/40 uppercase tracking-[0.15em] hidden md:table-cell">Users</th>
            <th className="text-right px-4 py-3 text-[10px] font-bold text-emerald-400/40 uppercase tracking-[0.15em] hidden lg:table-cell">Clicks</th>
            <th className="text-right px-4 py-3 text-[10px] font-bold text-sky-400/40 uppercase tracking-[0.15em] hidden lg:table-cell">Impr.</th>
            <th className="text-left px-4 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] hidden md:table-cell">Date</th>
          </tr>
        </thead>
        <tbody>
          {[...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((blog, i) => {
            const gsc = getBlogGSC(blog.slug);
            const ga = getBlogGA(blog.slug);
            return (
              <motion.tr
                key={blog.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 text-white/20 font-mono">{String(i + 1).padStart(2, "0")}</td>
                <td className="px-4 py-3 text-white/60 font-medium">{blog.title}</td>
                <td className="px-4 py-3 text-white/30 hidden md:table-cell">{blog.category}</td>
                <td className="px-4 py-3 text-right font-mono">
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin text-white/20 ml-auto" />
                  ) : (
                    <span className={ga.views > 0 ? "text-purple-400 font-bold" : "text-white/20"}>
                      {ga.views.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono hidden md:table-cell">
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin text-white/20 ml-auto" />
                  ) : (
                    <span className={ga.users > 0 ? "text-amber-400" : "text-white/20"}>
                      {ga.users.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono hidden lg:table-cell">
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin text-white/20 ml-auto" />
                  ) : (
                    <span className={gsc.clicks > 0 ? "text-emerald-400 font-bold" : "text-white/20"}>
                      {gsc.clicks}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono hidden lg:table-cell">
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin text-white/20 ml-auto" />
                  ) : (
                    <span className={gsc.impressions > 0 ? "text-sky-400" : "text-white/20"}>
                      {gsc.impressions.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-white/30 hidden md:table-cell">{blog.date}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ─── Directory Listings Data ─── */
const directoryListings = {
  listed: [
    { name: "Google Business Profile", url: "https://maps.app.goo.gl/kidsalonia", rating: "4.9★", reviews: "46 reviews", status: "Verified" },
    { name: "Justdial", url: "https://www.justdial.com/Gurgaon/KidSalonia", rating: "4.8★", reviews: "—", status: "Active" },
    { name: "Instagram", url: "https://www.instagram.com/kidsalonia/", rating: "—", reviews: "4.8K+ followers", status: "Active" },
    { name: "Facebook", url: "https://www.facebook.com/61582124547566/", rating: "—", reviews: "—", status: "Active" },
    { name: "Sulekha", url: "https://www.sulekha.com/kidsalonia-sector-67-gurgaon-contact-address", rating: "—", reviews: "—", status: "Active" },
    { name: "FreeListingIndia", url: "https://www.freelistingindia.in/listings/kidsalonia", rating: "—", reviews: "—", status: "Active" },
    { name: "ActivityKidz", url: "https://activitykidz.com/products/kidsalonia-sector-67-gurgaon", rating: "—", reviews: "—", status: "Active" },
    { name: "FranchiseIndia", url: "https://www.franchiseindia.com/brands/kidsalonia.114560", rating: "—", reviews: "—", status: "Active" },
    { name: "SalonCareer.in", url: "https://www.saloncareer.in/employer/kidsalonia", rating: "—", reviews: "—", status: "Active" },
    { name: "Mappls (MapMyIndia)", url: "https://mappls.com/place-KidSalonia-Ground+floor-KidSalonia-A-19+JMD+Suburbio+2-Gurugram-Haryana+122101-b7toau", rating: "—", reviews: "—", status: "Active" },
  ],
  notListed: [
    { name: "Bing Places", url: "https://www.bingplaces.com/", priority: "High", notes: "Free — uses Microsoft account" },
    { name: "Apple Business Connect", url: "https://businessconnect.apple.com/", priority: "High", notes: "Free — shows on Apple Maps & Siri" },
    { name: "IndiaMART", url: "https://www.indiamart.com/", priority: "Medium", notes: "Strong DA — free business listing" },
    { name: "AskLaila", url: "https://www.asklaila.com/", priority: "Medium", notes: "Hyperlocal Delhi-NCR directory" },
    { name: "Foursquare", url: "https://foursquare.com/", priority: "Low", notes: "International citation — good for DA" },
  ],
};

/* ─── Directory Listings Section ─── */
const DirectoryListingsSection = () => (
  <div className="space-y-8">
    {/* Summary Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-emerald-500/5 rounded-xl p-4 text-center border border-emerald-500/10">
        <p className="text-3xl font-black text-emerald-400">{directoryListings.listed.length}</p>
        <p className="text-[10px] text-emerald-300/50 font-medium mt-1">Active Listings</p>
      </div>
      <div className="bg-amber-500/5 rounded-xl p-4 text-center border border-amber-500/10">
        <p className="text-3xl font-black text-amber-400">{directoryListings.notListed.length}</p>
        <p className="text-[10px] text-amber-300/50 font-medium mt-1">Pending Submissions</p>
      </div>
      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
        <p className="text-3xl font-black text-white/90">{directoryListings.listed.length + directoryListings.notListed.length}</p>
        <p className="text-[10px] text-white/30 font-medium mt-1">Total Directories</p>
      </div>
      <div className="bg-sky-500/5 rounded-xl p-4 text-center border border-sky-500/10">
        <p className="text-3xl font-black text-sky-400">{Math.round((directoryListings.listed.length / (directoryListings.listed.length + directoryListings.notListed.length)) * 100)}%</p>
        <p className="text-[10px] text-sky-300/50 font-medium mt-1">Coverage</p>
      </div>
    </div>

    {/* Listed Directories */}
    <GlassSection>
      <SectionTitle icon={CheckCircle}>Active Directory Listings</SectionTitle>
      <div className="space-y-3">
        {directoryListings.listed.map((dir, i) => (
          <motion.div
            key={dir.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl px-5 py-4 hover:bg-emerald-500/[0.06] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-emerald-500/15 p-2 border border-emerald-500/20">
                <CheckCircle size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">{dir.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  {dir.rating !== "—" && <span className="text-[10px] text-amber-400 font-bold">{dir.rating}</span>}
                  <span className="text-[10px] text-white/30">{dir.reviews}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GlassBadge variant="success">{dir.status}</GlassBadge>
              <a href={dir.url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassSection>

    {/* Not Listed Directories */}
    <GlassSection>
      <SectionTitle icon={XCircle}>Pending Directory Submissions</SectionTitle>
      <p className="text-xs text-white/30 mb-4 -mt-2">These directories should be claimed to improve local SEO authority and NAP consistency.</p>
      <div className="space-y-3">
        {directoryListings.notListed.map((dir, i) => {
          const priorityColor = dir.priority === "High"
            ? "bg-red-500/20 text-red-300 border-red-500/30"
            : dir.priority === "Medium"
            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
            : "bg-white/10 text-white/40 border-white/15";
          return (
            <motion.div
              key={dir.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white/5 p-2 border border-white/10">
                  <XCircle size={16} className="text-white/25" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/70">{dir.name}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{dir.notes}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${priorityColor}`}>
                  {dir.priority}
                </span>
                <a href={dir.url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassSection>
  </div>
);

/* ─── Main Component ─── */
const HyperRevampReporting = () => {
  const [activeTab, setActiveTab] = useState<'seo' | 'backlinks' | 'smo'>('seo');
  const totalKeywords = seoRegistry.reduce((acc, p) => acc + p.primaryKeywords.length + p.secondaryKeywords.length + p.longTailKeywords.length, 0);
  const totalFaqs = seoRegistry.reduce((acc, p) => acc + p.faqCount, 0);
  const totalSchemas = seoRegistry.reduce((acc, p) => acc + p.jsonLdTypes.length, 0);
  const livePages = seoRegistry.filter(p => p.status === "live").length;

/* ─── SMO Section ─── */
const smoData = {
  instagram: {
    handle: "@kidsalonia",
    url: "https://www.instagram.com/kidsalonia/",
    followers: "4.8K+",
    posts: [
      { title: "Summer special kids haircut offer 🌞", date: "2026-03-20", type: "Reel" },
      { title: "Happy little client after her first haircut ✂️", date: "2026-03-18", type: "Post" },
      { title: "Nail art session for kids — weekend fun 💅", date: "2026-03-15", type: "Reel" },
      { title: "Behind the scenes at KidSalonia 🎬", date: "2026-03-12", type: "Story Highlight" },
      { title: "Parents love our hygiene standards 🧼", date: "2026-03-10", type: "Post" },
      { title: "Toddler's first haircut milestone 🎉", date: "2026-03-08", type: "Reel" },
      { title: "Weekend rush — fully booked! 📅", date: "2026-03-05", type: "Post" },
      { title: "New kids styling chairs arrived 💺", date: "2026-03-02", type: "Post" },
      { title: "Valentine's Day special kids spa 💖", date: "2026-02-14", type: "Reel" },
      { title: "Client testimonial — 5 star review ⭐", date: "2026-02-10", type: "Post" },
      { title: "Holi special colorful hair clips 🎨", date: "2026-02-08", type: "Reel" },
      { title: "Kid-safe products we use 🧴", date: "2026-02-05", type: "Post" },
      { title: "Our trained stylists team 👩‍🎨", date: "2026-02-01", type: "Post" },
      { title: "Baby's first haircut package 👶", date: "2026-01-28", type: "Reel" },
      { title: "Happy Republic Day from KidSalonia 🇮🇳", date: "2026-01-26", type: "Post" },
      { title: "New year, new styles for kids ✨", date: "2026-01-01", type: "Reel" },
      { title: "Christmas special kids grooming 🎄", date: "2025-12-25", type: "Post" },
      { title: "Winter hair care tips for kids ❄️", date: "2025-12-20", type: "Post" },
      { title: "Diwali makeover for little ones 🪔", date: "2025-11-10", type: "Reel" },
      { title: "Our salon tour — sector 67 Gurugram 📍", date: "2025-11-01", type: "Reel" },
    ],
  },
  facebook: {
    handle: "KidSalonia",
    url: "https://www.facebook.com/kidsalonia/",
    followers: "1.2K+",
    posts: [
      { title: "Summer kids haircut packages now available!", date: "2026-03-19", type: "Post" },
      { title: "Book your weekend slot — limited availability", date: "2026-03-15", type: "Post" },
      { title: "Happy parents, happy kids! New review 🌟", date: "2026-03-12", type: "Post" },
      { title: "Nail care for kids — safe & fun!", date: "2026-03-08", type: "Post" },
      { title: "Our hygiene practices — parents trust us", date: "2026-03-05", type: "Post" },
      { title: "Toddler haircut tips from our experts", date: "2026-03-01", type: "Article" },
      { title: "Valentine's special kids spa day 💖", date: "2026-02-14", type: "Event" },
      { title: "New year offer — 20% off first visit", date: "2026-01-05", type: "Post" },
      { title: "Christmas kids grooming special 🎄", date: "2025-12-24", type: "Post" },
      { title: "Winter care tips for your child's hair", date: "2025-12-15", type: "Article" },
      { title: "Diwali special makeover for kids 🪔", date: "2025-11-10", type: "Post" },
      { title: "Grand opening celebration photos 🎉", date: "2025-10-15", type: "Album" },
    ],
  },
};

/* ─── Paginated Post Table ─── */
const POSTS_PER_PAGE = 10;

const PostTable = ({ posts, color }: { posts: { title: string; date: string; type: string }[]; color: 'pink' | 'blue' }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const lastPostDate = posts[0]?.date || '—';

  const accentMap = {
    pink: { badge: 'bg-pink-500/15 text-pink-300 border-pink-500/20', text: 'text-pink-400', bg: 'bg-pink-500/5 border-pink-500/10' },
    blue: { badge: 'bg-blue-500/15 text-blue-300 border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/5 border-blue-500/10' },
  };
  const accent = accentMap[color];

  return (
    <div className="mt-6">
      <div className={`inline-flex items-center gap-2 ${accent.bg} border rounded-lg px-3 py-1.5 mb-4`}>
        <Calendar size={12} className={accent.text} />
        <span className={`text-[10px] font-bold ${accent.text}`}>Last posted: {new Date(lastPostDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">#</th>
              <th className="text-left px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Post</th>
              <th className="text-center px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Type</th>
              <th className="text-right px-3 py-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((post, i) => (
              <motion.tr
                key={`${post.date}-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-3 py-2.5 text-white/20 font-mono">{(page - 1) * POSTS_PER_PAGE + i + 1}</td>
                <td className="px-3 py-2.5 text-white/70 font-medium max-w-[300px]">{post.title}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${accent.badge}`}>
                    {post.type}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right text-white/40 font-mono">
                  {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <span className="text-[10px] text-white/20 font-medium">
            Showing {(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, posts.length)} of {posts.length}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all ${
                  page === i + 1
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-white/[0.02] border border-white/5 text-white/25 hover:text-white/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SMOSection = () => (
  <div className="space-y-8">
    {/* SMO Summary Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-pink-500/5 rounded-xl p-4 text-center border border-pink-500/10">
        <p className="text-3xl font-black text-pink-400">{smoData.instagram.followers}</p>
        <p className="text-[10px] text-pink-300/50 font-medium mt-1">Instagram Followers</p>
      </div>
      <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10">
        <p className="text-3xl font-black text-blue-400">{smoData.facebook.followers}</p>
        <p className="text-[10px] text-blue-300/50 font-medium mt-1">Facebook Followers</p>
      </div>
      <div className="bg-pink-500/5 rounded-xl p-4 text-center border border-pink-500/10">
        <p className="text-3xl font-black text-pink-400">{smoData.instagram.posts.length}</p>
        <p className="text-[10px] text-pink-300/50 font-medium mt-1">Instagram Posts</p>
      </div>
      <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10">
        <p className="text-3xl font-black text-blue-400">{smoData.facebook.posts.length}</p>
        <p className="text-[10px] text-blue-300/50 font-medium mt-1">Facebook Posts</p>
      </div>
    </div>

    {/* Instagram Card */}
    <GlassSection>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle icon={Instagram}>Instagram</SectionTitle>
        <a
          href={smoData.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-pink-400/70 hover:text-pink-400 bg-pink-500/10 border border-pink-500/15 rounded-lg px-4 py-2 transition-all"
        >
          <Instagram size={14} />
          {smoData.instagram.handle}
          <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative overflow-hidden rounded-2xl border border-pink-500/10 bg-pink-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-pink-500/15 border border-pink-500/20 p-2.5 mb-4">
            <Users size={20} className="text-pink-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Followers</p>
          <p className="text-4xl font-black text-white tracking-tight">{smoData.instagram.followers}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-pink-500/10 bg-pink-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-pink-500/15 border border-pink-500/20 p-2.5 mb-4">
            <Image size={20} className="text-pink-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Total Posts</p>
          <p className="text-4xl font-black text-white tracking-tight">{smoData.instagram.posts.length}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-pink-500/10 bg-pink-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-pink-500/15 border border-pink-500/20 p-2.5 mb-4">
            <Calendar size={20} className="text-pink-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Last Post</p>
          <p className="text-lg font-black text-white tracking-tight">
            {new Date(smoData.instagram.posts[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
      <PostTable posts={smoData.instagram.posts} color="pink" />
    </GlassSection>

    {/* Facebook Card */}
    <GlassSection>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle icon={Facebook}>Facebook</SectionTitle>
        <a
          href={smoData.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-blue-400/70 hover:text-blue-400 bg-blue-500/10 border border-blue-500/15 rounded-lg px-4 py-2 transition-all"
        >
          <Facebook size={14} />
          {smoData.facebook.handle}
          <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 p-2.5 mb-4">
            <Users size={20} className="text-blue-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Followers</p>
          <p className="text-4xl font-black text-white tracking-tight">{smoData.facebook.followers}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 p-2.5 mb-4">
            <Image size={20} className="text-blue-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Total Posts</p>
          <p className="text-4xl font-black text-white tracking-tight">{smoData.facebook.posts.length}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] backdrop-blur-xl p-6 text-center">
          <div className="inline-flex items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 p-2.5 mb-4">
            <Calendar size={20} className="text-blue-400" />
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Last Post</p>
          <p className="text-lg font-black text-white tracking-tight">
            {new Date(smoData.facebook.posts[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
      <PostTable posts={smoData.facebook.posts} color="blue" />
    </GlassSection>
  </div>
);

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-600/6 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-emerald-600/5 blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                {/* Logos */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                    <img src={hyperrevampLogo} alt="HyperRevamp" className="h-6 w-auto" />
                  </div>
                  <span className="text-white/15 text-lg">×</span>
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5">
                    <img src={logo} alt="KidSalonia" className="h-8 w-auto" />
                    <span className="text-sm font-bold text-white/80">KidSalonia</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  SEO <span className="text-white/30">·</span> GEO <span className="text-white/30">·</span> AEO
                </h1>
                <p className="text-white/30 mt-2 text-sm font-medium tracking-wide">Live audit dashboard — auto-updated with every page change</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-bold">Report Date</p>
                <p className="text-xl font-black text-white/80 mt-1">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                <p className="text-xs text-white/20 mt-1.5 font-mono">www.kidsalonia.com</p>
                <div className="mt-3 flex items-center justify-end gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400/70 font-semibold uppercase tracking-wider">Live</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Tab Toggle */}
          <div className="flex gap-2">
            {([['seo', 'SEO · GEO · AEO', Search], ['backlinks', 'Backlinks', Link2], ['smo', 'SMO', Users]] as const).map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-white/10 border-white/20 text-white shadow-lg shadow-white/5'
                    : 'bg-white/[0.02] border-white/5 text-white/30 hover:text-white/60 hover:bg-white/[0.05]'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'seo' ? (
          <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <GlassStatCard icon={FileText} label="Pages" value={livePages} sub={`${seoRegistry.length} total`} delay={0} />
            <GlassStatCard icon={Search} label="Keywords" value={totalKeywords} sub="Tracked" delay={0.08} />
            <GlassStatCard icon={Bot} label="FAQs" value={totalFaqs} sub="Voice-ready" delay={0.16} />
            <GlassStatCard icon={BarChart3} label="Schemas" value={totalSchemas} sub="JSON-LD" delay={0.24} />
            <GlassStatCard icon={Globe} label="Blog Posts" value={blogs.length} sub="Published" delay={0.32} />
            <GlassStatCard icon={ExternalLink} label="Sitemap" value={seoInfrastructure.sitemap.totalUrls} sub="URLs Indexed" delay={0.4} />
          </div>

          {/* Domain Authority & Metrics */}
          <GlassSection>
            <SectionTitle icon={Award}>Domain Authority & Metrics</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* DA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center group hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20 p-2.5 mb-4">
                    <Award size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Domain Authority</p>
                  <p className="text-5xl font-black text-white tracking-tight">
                    <AnimatedCounter target={14} />
                  </p>
                  <p className="text-xs text-white/30 mt-2 font-medium">Moz DA Score</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "14%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
                    />
                  </div>
                  <p className="text-[10px] text-white/20 mt-1.5">Scale: 0–100</p>
                </div>
              </motion.div>

              {/* PA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center group hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/20 p-2.5 mb-4">
                    <TrendingUp size={20} className="text-sky-400" />
                  </div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Page Authority</p>
                  <p className="text-5xl font-black text-white tracking-tight">
                    <AnimatedCounter target={18} />
                  </p>
                  <p className="text-xs text-white/30 mt-2 font-medium">Homepage PA Score</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "18%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-500/60 to-sky-400/40"
                    />
                  </div>
                  <p className="text-[10px] text-white/20 mt-1.5">Scale: 0–100</p>
                </div>
              </motion.div>

              {/* Domain Age */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center group hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/20 p-2.5 mb-4">
                    <Calendar size={20} className="text-purple-400" />
                  </div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">Domain Age</p>
                  <p className="text-3xl font-black text-white tracking-tight mt-2">
                    2 Years
                  </p>
                  <p className="text-xs text-white/30 mt-2 font-medium">Registered: March 2024</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <GlassBadge variant="success">Active</GlassBadge>
                    <GlassBadge variant="info">Growing</GlassBadge>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlassSection>

          {/* Overall Score */}
          <GlassSection>
            <SectionTitle icon={TrendingUp}>Optimization Score</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MiniBar label="SEO Coverage" percent={95} />
              <MiniBar label="GEO Local Signals" percent={92} />
              <MiniBar label="AEO Voice Readiness" percent={88} />
            </div>
          </GlassSection>

          {/* Live Keyword Tracker from GSC */}
          <LiveKeywordTracker />

          {/* SEO Infrastructure */}
          <GlassSection delay={0.1}>
            <SectionTitle icon={Shield}>SEO Infrastructure</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(seoInfrastructure).map(([key, val], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 bg-white/[0.03] rounded-xl border border-white/5 px-4 py-3 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <CheckCircle2 size={14} className="text-emerald-400/60 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white/70 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    {"note" in val && <p className="text-[10px] text-white/25 truncate">{(val as any).note}</p>}
                    {"id" in val && <p className="text-[10px] text-white/25 font-mono">{(val as any).id}</p>}
                    {"url" in val && <p className="text-[10px] text-white/25 font-mono truncate">{(val as any).url}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassSection>

          {/* GEO */}
          <GlassSection delay={0.1}>
            <SectionTitle icon={Globe}>GEO — Local Optimization</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                {[
                  ["LocalBusiness Schema", geoOptimization.localBusinessSchema],
                  ["Geo Coordinates", geoOptimization.geoCoordinates],
                  ["NAP Consistency", geoOptimization.napConsistency],
                  ["Google Maps", geoOptimization.googleMapsEmbed],
                  ["Hours", geoOptimization.openingHours],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-white/35 font-medium">{label}</span>
                    <span className="text-xs text-white/70 font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] mb-3">Local Keywords</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {geoOptimization.localKeywords.map(k => <span key={k} className="bg-sky-500/10 text-sky-300/70 text-[10px] px-2.5 py-1 rounded-full border border-sky-500/15 font-medium">{k}</span>)}
                </div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] mb-3">Social Profiles</p>
                <div className="flex flex-wrap gap-1.5">
                  {geoOptimization.socialProfiles.map(s => <span key={s} className="bg-white/5 text-white/40 text-[10px] px-2.5 py-1 rounded-full border border-white/5 font-medium">{s}</span>)}
                </div>
              </div>
            </div>
          </GlassSection>

          {/* AEO */}
          <GlassSection delay={0.1}>
            <SectionTitle icon={Bot}>AEO — Answer Engine Optimization</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
              {[
                { val: aeoOptimization.totalFaqs, label: "Total FAQs" },
                { val: aeoOptimization.faqSchemaPages.length, label: "FAQ Schema Pages" },
                { val: aeoOptimization.serviceSchemaPages.length, label: "Service Schemas" },
                { val: aeoOptimization.blogPostSchemaCount, label: "Blog Schemas" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center bg-white/[0.03] rounded-xl border border-white/5 py-4 px-3"
                >
                  <p className="text-2xl font-black text-white/90"><AnimatedCounter target={item.val} /></p>
                  <p className="text-[10px] text-white/30 font-medium mt-1">{item.label}</p>
                </motion.div>
              ))}
              <div className="text-center bg-white/[0.03] rounded-xl border border-white/5 py-4 px-3">
                <p className="text-2xl font-black text-white/90">{aeoOptimization.aggregateRating}</p>
                <p className="text-[10px] text-white/30 font-medium mt-1">Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl px-4 py-2.5">
              <Zap size={14} className="text-emerald-400/60" />
              <span className="text-xs text-emerald-300/60 font-medium">Voice search optimized — all FAQs in natural Q&A format</span>
            </div>
          </GlassSection>

          {/* Page-by-Page */}
          <GlassSection delay={0.1}>
            <SectionTitle icon={Eye}>Page-by-Page Audit</SectionTitle>
            {seoRegistry.map((page, i) => (
              <PageRow key={page.path} page={page} index={i} />
            ))}
          </GlassSection>

          {/* Blog Table */}
          <GlassSection delay={0.1}>
            <SectionTitle icon={BarChart3}>Published Blog Content ({blogs.length})</SectionTitle>
            <BlogContentTable />
          </GlassSection>
          </div>
          ) : activeTab === 'backlinks' ? (
            <DirectoryListingsSection />
          ) : (
            <SMOSection />
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-10"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-6" />
            <p className="text-[10px] text-white/15 font-medium tracking-wide">
              Auto-generated live report reflecting the current state of www.kidsalonia.com
            </p>
            <p className="text-[10px] text-white/15 mt-2">
              Designed & Developed by{" "}
              <a href="https://hyperrevamp.com" target="_blank" rel="noopener noreferrer" className="text-white/30 font-bold hover:text-white/50 transition-colors">
                HyperRevamp
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HyperRevampReporting;
