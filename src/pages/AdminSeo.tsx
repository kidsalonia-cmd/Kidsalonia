// /admin/seo — KidSalonia SEO/AEO/GEO command center.
// Hardcoded login (8373914073 / 069829) validated server-side via the
// seo-admin-login edge function; session token in localStorage.
import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  CheckCircle2, Circle, Clock, ExternalLink, FileText, Hash, Loader2,
  Calendar as CalendarIcon, Target, AlertCircle, Filter, BookOpen, Check, Rocket,
  Sparkles, Settings2, ShieldCheck, Search, Info, BarChart3, LogOut, Lock, RefreshCw,
} from "lucide-react";
import {
  makeSeoAdminClient,
  getSeoAdminToken,
  setSeoAdminToken,
} from "@/integrations/supabase/seoAdminClient";
import { supabase as publicSupabase } from "@/integrations/supabase/client";

const SITE = "https://www.kidsalonia.com";

/* ============================== TYPES ============================== */
type SeoSettings = {
  blog_approval_required: boolean;
  last_auto_run_at: string | null;
};
type Task = {
  id: string;
  scheduled_date: string | null;
  week: number;
  section: string;
  category: string;
  deliverable_type: string | null;
  priority: string;
  effort_minutes: number;
  title: string;
  description: string | null;
  target_url: string | null;
  target_keyword: string | null;
  secondary_keywords: string[] | null;
  page_title: string | null;
  meta_description: string | null;
  content_brief: string | null;
  status: string;
  completed_at: string | null;
  completed_by: string | null;
  notes: string | null;
  blog_slug: string | null;
};
type BlogPost = {
  id: string;
  slug: string;
  url: string;
  title: string;
  meta_description: string | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  body_md: string;
  scheduled_date: string | null;
  status: string;
  client_notes: string | null;
  internal_notes: string | null;
  approved_at: string | null;
  deployed_at: string | null;
  read_minutes: number | null;
};

const SECTION_TONE: Record<string, string> = {
  SEO: "bg-emerald-100 text-emerald-800 border-emerald-200",
  AEO: "bg-violet-100 text-violet-800 border-violet-200",
  GEO: "bg-amber-100 text-amber-800 border-amber-200",
};
const PRIORITY_TONE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  low: "bg-slate-100 text-slate-700 border-slate-200",
};
const STATUS_LABEL: Record<string, string> = {
  todo: "Not started",
  in_progress: "In progress",
  done: "Completed",
  blocked: "Blocked",
};

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) : "—";
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
const displayPath = (url: string | null) => {
  if (!url) return "—";
  try { return new URL(url, SITE).pathname || "/"; } catch { return url; }
};
const todayISO = () => new Date().toISOString().slice(0, 10);

function gscInspectUrl(targetUrl: string) {
  return `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE + "/")}&url=${encodeURIComponent(targetUrl)}`;
}
function bingSubmitUrl(targetUrl: string) {
  return `https://www.bing.com/webmasters/submiturl?url=${encodeURIComponent(targetUrl)}`;
}

/* ============================== LOGIN ============================== */
function LoginScreen({ onAuthed }: { onAuthed: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await publicSupabase.functions.invoke("seo-admin-login", {
        body: { username: u, password: p },
      });
      if (error || !(data as { token?: string })?.token) {
        toast.error((data as { error?: string })?.error || "Invalid credentials");
        return;
      }
      setSeoAdminToken((data as { token: string }).token);
      toast.success("Welcome");
      onAuthed();
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4">
      <Card className="w-full max-w-sm p-8 space-y-5 shadow-xl">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold">KidSalonia SEO Admin</h1>
          <p className="text-xs text-muted-foreground">Restricted area · authorized personnel only</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">User ID</label>
            <Input value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" required />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" required />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}

/* ============================== DASHBOARD ============================== */
export default function AdminSeo() {
  const [token, setToken] = useState<string | null>(getSeoAdminToken());
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!token) { setVerifying(false); return; }
    (async () => {
      const { data } = await publicSupabase.functions.invoke("seo-admin-login?action=verify", {
        body: {},
        headers: { "x-admin-token": token },
      });
      if (cancelled) return;
      if (!(data as { valid?: boolean })?.valid) {
        setSeoAdminToken(null);
        setToken(null);
      }
      setVerifying(false);
    })();
    return () => { cancelled = true; };
  }, [token]);

  if (verifying) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }
  if (!token) {
    return (
      <>
        <Helmet><title>SEO Admin · KidSalonia</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <LoginScreen onAuthed={() => setToken(getSeoAdminToken())} />
      </>
    );
  }
  return (
    <>
      <Helmet><title>SEO Admin · KidSalonia</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <Dashboard token={token} onLogout={() => { setSeoAdminToken(null); setToken(null); }} />
    </>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const supabase = useMemo(() => makeSeoAdminClient(token), [token]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SeoSettings>({ blog_approval_required: true, last_auto_run_at: null });
  const [loading, setLoading] = useState(true);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterMonth, setFilterMonth] = useState<string>(() => new Date().toISOString().slice(0, 7));

  const load = useCallback(async () => {
    setLoading(true);
    const [tRes, pRes, sRes] = await Promise.all([
      supabase.from("seo_tasks" as never).select("*").order("scheduled_date", { ascending: true }).order("sort_order", { ascending: true }),
      supabase.from("seo_blog_posts" as never).select("*").order("scheduled_date", { ascending: true }),
      supabase.from("seo_settings" as never).select("*").eq("id", 1).maybeSingle(),
    ]);
    if ((tRes as { error: unknown }).error || (pRes as { error: unknown }).error) toast.error("Failed to load plan");
    setTasks(((tRes as { data: Task[] | null }).data ?? []));
    setPosts(((pRes as { data: BlogPost[] | null }).data ?? []));
    const s = (sRes as { data: SeoSettings | null }).data;
    if (s) setSettings(s);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { void load(); }, [load]);

  async function logout() {
    await publicSupabase.functions.invoke("seo-admin-login?action=logout", {
      body: {},
      headers: { "x-admin-token": token },
    });
    onLogout();
  }

  async function updateSettings(patch: Partial<SeoSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    const { error } = await supabase.from("seo_settings" as never).update(patch as never).eq("id", 1);
    if (error) toast.error("Settings save failed"); else toast.success("Saved");
  }

  async function updateTask(id: string, patch: Partial<Task>) {
    setSavingId(id);
    const apply: Record<string, unknown> = { ...patch };
    if (patch.status === "done") {
      apply.completed_at = new Date().toISOString();
      apply.completed_by = "admin";
    } else if (patch.status && patch.status !== "done") {
      apply.completed_at = null;
      apply.completed_by = null;
    }
    const { error } = await supabase.from("seo_tasks" as never).update(apply as never).eq("id", id);
    if (error) toast.error("Save failed");
    else { setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...apply } as Task : t))); toast.success("Saved"); }
    setSavingId(null);
  }

  async function updatePost(id: string, patch: Partial<BlogPost>) {
    setSavingId(id);
    const apply: Record<string, unknown> = { ...patch };
    if (patch.status === "approved" && !posts.find(p => p.id === id)?.approved_at) {
      apply.approved_at = new Date().toISOString();
    }
    if (patch.status === "deployed") apply.deployed_at = new Date().toISOString();
    const { error } = await supabase.from("seo_blog_posts" as never).update(apply as never).eq("id", id);
    if (error) toast.error("Save failed");
    else { setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...apply } as BlogPost : p))); toast.success("Saved"); }
    setSavingId(null);
  }

  const monthOptions = useMemo(() => {
    const set = new Set<string>([new Date().toISOString().slice(0, 7)]);
    for (const t of tasks) if (t.scheduled_date) set.add(t.scheduled_date.slice(0, 7));
    for (const p of posts) if (p.scheduled_date) set.add(p.scheduled_date.slice(0, 7));
    return Array.from(set).sort();
  }, [tasks, posts]);

  const filtered = useMemo(() =>
    tasks.filter((t) =>
      (filterSection === "all" || t.section === filterSection) &&
      (filterStatus === "all" || t.status === filterStatus) &&
      (filterMonth === "all" || (t.scheduled_date ? t.scheduled_date.slice(0, 7) === filterMonth : false)),
    ), [tasks, filterSection, filterStatus, filterMonth]);

  const byDay = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const t of filtered) {
      const k = t.scheduled_date ?? "unscheduled";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(t);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const today = todayISO();
    const dueToday = tasks.filter((t) => t.scheduled_date === today && t.status !== "done").length;
    const overdue = tasks.filter((t) => t.scheduled_date && t.scheduled_date < today && t.status !== "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    return { total, done, dueToday, overdue, inProgress, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [tasks]);

  const openTask = openTaskId ? tasks.find((t) => t.id === openTaskId) ?? null : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-6 md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-violet-700 mb-2">
                <Sparkles className="h-3.5 w-3.5" /> KidSalonia · 30-day execution
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">SEO / AEO / GEO Implementation Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                Day-by-day plan for kidsalonia.com. Every task is mapped to a specific page,
                keyword and deliverable. Click any item to see what gets done, when, and by whom.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-white/70 border-emerald-200 text-emerald-800">
                <ShieldCheck className="h-3 w-3 mr-1" /> {stats.done}/{stats.total} shipped
              </Badge>
              <Button size="sm" variant="outline" onClick={logout}><LogOut className="h-3 w-3 mr-1" /> Sign out</Button>
            </div>
          </div>
        </div>

        <Card className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Workflow settings</div>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-lg border p-3 max-w-xl">
            <div>
              <div className="text-sm font-medium">Blog approval required by client</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                When ON, blogs only deploy after you mark them <em>Approved</em>.
              </p>
            </div>
            <Switch checked={settings.blog_approval_required} onCheckedChange={(v) => updateSettings({ blog_approval_required: v })} />
          </div>
        </Card>

        <Card className="p-4 md:p-5 border-amber-200 bg-amber-50/60">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <div className="text-sm font-semibold text-amber-900">Re-index after every change</div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Once a task is <em>Completed</em>, open the task and click <strong>Inspect on Google</strong> → Request indexing,
                and <strong>Submit to Bing</strong>.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiTile label="Plan progress" value={`${stats.pct}%`} sub={`${stats.done} / ${stats.total} tasks`} accent="bg-emerald-50" />
          <KpiTile label="Due today" value={String(stats.dueToday)} sub={fmtDate(todayISO())} accent="bg-blue-50" />
          <KpiTile label="In progress" value={String(stats.inProgress)} sub="Active now" accent="bg-amber-50" />
          <KpiTile label="Overdue" value={String(stats.overdue)} sub="Needs reschedule" accent={stats.overdue ? "bg-red-50" : "bg-slate-50"} />
          <KpiTile label="Total tasks" value={String(stats.total)} sub="Across plan" accent="bg-violet-50" />
        </div>

        <Progress value={stats.pct} className="h-2" />

        <Tabs defaultValue="calendar">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="calendar"><CalendarIcon className="h-4 w-4 mr-2" />Calendar</TabsTrigger>
            <TabsTrigger value="blogs"><BookOpen className="h-4 w-4 mr-2" />Blogs ({posts.length})</TabsTrigger>
            <TabsTrigger value="table"><FileText className="h-4 w-4 mr-2" />All tasks</TabsTrigger>
            <TabsTrigger value="keywords"><Hash className="h-4 w-4 mr-2" />Keyword map</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="h-4 w-4 mr-2" />Analytics</TabsTrigger>
            <TabsTrigger value="rankings"><Search className="h-4 w-4 mr-2" />Rankings</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterSection} onValueChange={setFilterSection}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All channels</SelectItem>
                <SelectItem value="SEO">SEO</SelectItem>
                <SelectItem value="AEO">AEO</SelectItem>
                <SelectItem value="GEO">GEO</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="todo">Not started</SelectItem>
                <SelectItem value="in_progress">In progress</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All months</SelectItem>
                {monthOptions.map((m) => {
                  const d = new Date(`${m}-01T00:00:00`);
                  const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
                  const cur = new Date().toISOString().slice(0, 7);
                  const suffix = m === cur ? " · This month" : m < cur ? " · Past" : " · Upcoming";
                  return <SelectItem key={m} value={m}>{label}{suffix}</SelectItem>;
                })}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="calendar" className="mt-4">
            {loading ? <Loader /> : (
              <div className="space-y-4">
                {byDay.length === 0 ? (
                  <Card className="p-10 text-center text-sm text-muted-foreground">
                    Nothing scheduled for this month yet.
                  </Card>
                ) : byDay.map(([day, items]) => (
                  <DayCard key={day} day={day} items={items}
                    onOpen={(id) => setOpenTaskId(id)}
                    onStatus={(id, status) => updateTask(id, { status })}
                    savingId={savingId} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            {loading ? <Loader /> : (
              <div className="border rounded-lg overflow-x-auto bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-left">
                    <tr>
                      <th className="px-3 py-2">Scheduled</th>
                      <th className="px-3 py-2">Channel</th>
                      <th className="px-3 py-2">Task</th>
                      <th className="px-3 py-2">Target page</th>
                      <th className="px-3 py-2">Primary keyword</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Indexing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.id} className="border-t hover:bg-muted/30 cursor-pointer" onClick={() => setOpenTaskId(t.id)}>
                        <td className="px-3 py-2 whitespace-nowrap">{fmtDate(t.scheduled_date)}</td>
                        <td className="px-3 py-2"><Badge variant="outline" className={SECTION_TONE[t.section]}>{t.section}</Badge></td>
                        <td className="px-3 py-2 max-w-[28rem]">{t.title}</td>
                        <td className="px-3 py-2 text-muted-foreground truncate max-w-[14rem]">{displayPath(t.target_url)}</td>
                        <td className="px-3 py-2 text-muted-foreground">{t.target_keyword ?? "—"}</td>
                        <td className="px-3 py-2"><StatusPill status={t.status} /></td>
                        <td className="px-3 py-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <IndexingActions status={t.status} url={t.target_url} compact />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="keywords" className="mt-4"><KeywordMap tasks={tasks} onOpen={setOpenTaskId} /></TabsContent>
          <TabsContent value="blogs" className="mt-4"><BlogsBoard posts={posts} onOpen={setOpenPostId} /></TabsContent>
          <TabsContent value="analytics" className="mt-4"><AnalyticsPanel /></TabsContent>
          <TabsContent value="rankings" className="mt-4"><RankingsPanel tasks={tasks} posts={posts} /></TabsContent>
        </Tabs>

        <Sheet open={!!openTaskId} onOpenChange={(o) => !o && setOpenTaskId(null)}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            {openTask && (
              <TaskDetail task={openTask}
                post={openTask.blog_slug ? posts.find(p => p.slug === openTask.blog_slug) ?? null : null}
                saving={savingId === openTask.id}
                onChange={(patch) => updateTask(openTask.id, patch)}
                onOpenPost={(id) => { setOpenTaskId(null); setOpenPostId(id); }} />
            )}
          </SheetContent>
        </Sheet>

        <Sheet open={!!openPostId} onOpenChange={(o) => !o && setOpenPostId(null)}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
            {openPostId && (() => {
              const p = posts.find(x => x.id === openPostId);
              if (!p) return null;
              return <PostDetail post={p} saving={savingId === p.id} onChange={(patch) => updatePost(p.id, patch)} />;
            })()}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

/* ============================== SUBCOMPONENTS ============================== */
function Loader() { return <div className="flex items-center gap-2 text-muted-foreground py-12 justify-center"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>; }

function KpiTile({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <Card className={`p-4 ${accent} border-0`}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </Card>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "done" ? "bg-emerald-100 text-emerald-700" :
    status === "in_progress" ? "bg-blue-100 text-blue-700" :
    status === "blocked" ? "bg-red-100 text-red-700" :
    "bg-slate-100 text-slate-600";
  return <span className={`text-xs px-2 py-0.5 rounded-full ${tone}`}>{STATUS_LABEL[status] ?? status}</span>;
}

function DayCard({ day, items, onOpen, onStatus, savingId }: {
  day: string; items: Task[]; onOpen: (id: string) => void;
  onStatus: (id: string, status: string) => void; savingId: string | null;
}) {
  const today = todayISO();
  const isPast = day < today;
  const isToday = day === today;
  const allDone = items.every((t) => t.status === "done");
  return (
    <Card className="overflow-hidden">
      <div className={`px-4 py-3 flex items-center justify-between border-b ${
        isToday ? "bg-amber-50" : isPast && !allDone ? "bg-red-50" : "bg-muted/30"
      }`}>
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-semibold">{fmtDate(day)}</div>
            <div className="text-xs text-muted-foreground">
              {items.length} task{items.length === 1 ? "" : "s"} · {items.reduce((a, t) => a + t.effort_minutes, 0)} min
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isToday && <Badge className="bg-amber-200 text-amber-900 hover:bg-amber-200">Today</Badge>}
          {isPast && !allDone && <Badge variant="outline" className="border-red-300 text-red-700"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>}
          {allDone && <Badge variant="outline" className="border-emerald-300 text-emerald-700"><CheckCircle2 className="h-3 w-3 mr-1" />Done</Badge>}
        </div>
      </div>
      <div className="divide-y">
        {items.map((t) => (
          <div key={t.id} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/20">
            <button onClick={() => onStatus(t.id, t.status === "done" ? "todo" : "done")}
              className="mt-1 shrink-0" disabled={savingId === t.id}>
              {t.status === "done"
                ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                : <Circle className="h-5 w-5 text-muted-foreground" />}
            </button>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpen(t.id)}>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="outline" className={SECTION_TONE[t.section]}>{t.section}</Badge>
                <Badge variant="outline" className={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                {t.deliverable_type && <Badge variant="secondary">{t.deliverable_type}</Badge>}
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{t.effort_minutes}m</span>
              </div>
              <div className={`font-medium ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                {t.target_url && <span className="flex items-center gap-1"><Target className="h-3 w-3" />{displayPath(t.target_url)}</span>}
                {t.target_keyword && <span className="flex items-center gap-1"><Hash className="h-3 w-3" />{t.target_keyword}</span>}
                {t.completed_at && <span className="flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-3 w-3" />Done {fmtDateTime(t.completed_at)}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return <div><div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{label}</div><div>{value}</div></div>;
}

function TaskDetail({ task, post, saving, onChange, onOpenPost }: {
  task: Task; post: BlogPost | null; saving: boolean;
  onChange: (patch: Partial<Task>) => void; onOpenPost: (id: string) => void;
}) {
  const [notes, setNotes] = useState(task.notes ?? "");
  useEffect(() => { setNotes(task.notes ?? ""); }, [task.id, task.notes]);
  return (
    <div className="space-y-5">
      <SheetHeader>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant="outline" className={SECTION_TONE[task.section]}>{task.section}</Badge>
          <Badge variant="outline" className={PRIORITY_TONE[task.priority]}>{task.priority}</Badge>
          {task.deliverable_type && <Badge variant="secondary">{task.deliverable_type}</Badge>}
          <Badge variant="outline">Week {task.week}</Badge>
        </div>
        <SheetTitle className="text-xl">{task.title}</SheetTitle>
        <SheetDescription>
          Scheduled for {fmtDate(task.scheduled_date)} · est. {task.effort_minutes} min · category: {task.category}
        </SheetDescription>
      </SheetHeader>

      {post && (
        <Card className="p-4 bg-violet-50 border-violet-200 space-y-2">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-violet-700" />
            <div className="text-sm font-medium">Linked blog draft</div></div>
          <div className="text-sm">{post.title}</div>
          <Button size="sm" variant="outline" onClick={() => onOpenPost(post.id)}>Open full draft</Button>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Scheduled" value={fmtDate(task.scheduled_date)} />
        <Field label="Completed" value={fmtDateTime(task.completed_at)} />
      </div>

      {task.target_url && (
        <Field label="Target page" value={
          <div className="space-y-2">
            <a href={task.target_url} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1 hover:underline break-all">
              {task.target_url} <ExternalLink className="h-3 w-3" />
            </a>
            <div className="rounded-md border border-amber-200 bg-amber-50/60 p-2.5">
              <div className="text-xs font-semibold text-amber-900 inline-flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> Re-index after edits
              </div>
              <div className="mt-2"><IndexingActions status={task.status} url={task.target_url} /></div>
            </div>
          </div>
        } />
      )}

      {task.target_keyword && (
        <Field label="Primary keyword" value={
          <div className="flex flex-wrap gap-1.5">
            <Badge>{task.target_keyword}</Badge>
            {(task.secondary_keywords ?? []).map((k) => <Badge key={k} variant="outline">{k}</Badge>)}
          </div>
        } />
      )}

      {task.page_title && <Field label="Recommended <title>" value={<code className="text-xs bg-muted px-2 py-1 rounded block">{task.page_title}</code>} />}
      {task.meta_description && <Field label="Recommended meta description" value={<code className="text-xs bg-muted px-2 py-1 rounded block whitespace-pre-wrap">{task.meta_description}</code>} />}
      {task.content_brief && <Field label="Content brief" value={<p className="text-sm leading-relaxed whitespace-pre-wrap">{task.content_brief}</p>} />}
      {task.description && !task.content_brief && <Field label="Description" value={<p className="text-sm leading-relaxed">{task.description}</p>} />}

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Status</div>
        <Select value={task.status} onValueChange={(v) => onChange({ status: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">Not started</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="done">Mark completed</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Execution notes</div>
        <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="Links shipped, screenshots, blockers, ranking before/after…" />
        <Button size="sm" onClick={() => onChange({ notes })} disabled={saving}>
          {saving ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null} Save notes
        </Button>
      </div>
    </div>
  );
}

function KeywordMap({ tasks, onOpen }: { tasks: Task[]; onOpen: (id: string) => void }) {
  const rows = tasks.filter((t) => t.target_keyword);
  return (
    <div className="border rounded-lg overflow-x-auto bg-white">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="px-3 py-2">Primary keyword</th>
            <th className="px-3 py-2">Target page</th>
            <th className="px-3 py-2">Scheduled</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Channel</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id} className="border-t hover:bg-muted/30 cursor-pointer" onClick={() => onOpen(t.id)}>
              <td className="px-3 py-2 font-medium">{t.target_keyword}</td>
              <td className="px-3 py-2 text-muted-foreground truncate max-w-[18rem]">{displayPath(t.target_url)}</td>
              <td className="px-3 py-2 whitespace-nowrap">{fmtDate(t.scheduled_date)}</td>
              <td className="px-3 py-2"><StatusPill status={t.status} /></td>
              <td className="px-3 py-2"><Badge variant="outline" className={SECTION_TONE[t.section]}>{t.section}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Blog board ---------- */
const BLOG_STATUS_TONE: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  in_review: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  deployed: "bg-violet-100 text-violet-800 border-violet-200",
};
const BLOG_STATUS_LABEL: Record<string, string> = {
  draft: "Draft", in_review: "In review", approved: "Approved", deployed: "Deployed",
};
function BlogStatusBadge({ status }: { status: string }) {
  return <Badge variant="outline" className={BLOG_STATUS_TONE[status]}>{BLOG_STATUS_LABEL[status] ?? status}</Badge>;
}

function BlogsBoard({ posts, onOpen }: { posts: BlogPost[]; onOpen: (id: string) => void }) {
  const today = todayISO();
  const stats = useMemo(() => ({
    total: posts.length,
    deployed: posts.filter(p => p.status === "deployed").length,
    approved: posts.filter(p => p.status === "approved").length,
    in_review: posts.filter(p => p.status === "in_review").length,
    draft: posts.filter(p => p.status === "draft").length,
  }), [posts]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiTile label="Total drafts" value={String(stats.total)} sub="Articles in pipeline" accent="bg-violet-50" />
        <KpiTile label="In draft" value={String(stats.draft)} sub="Awaiting review" accent="bg-slate-50" />
        <KpiTile label="In review" value={String(stats.in_review)} sub="With client" accent="bg-amber-50" />
        <KpiTile label="Approved" value={String(stats.approved)} sub="Ready to publish" accent="bg-emerald-50" />
        <KpiTile label="Deployed" value={String(stats.deployed)} sub="Live on site" accent="bg-blue-50" />
      </div>
      {posts.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">No blog drafts yet.</Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((p) => {
            const overdue = p.scheduled_date && p.scheduled_date < today && p.status !== "deployed";
            return (
              <Card key={p.id} className="p-4 hover:shadow-md transition cursor-pointer" onClick={() => onOpen(p.id)}>
                <div className="flex items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <BlogStatusBadge status={p.status} />
                    {p.status === "deployed" && <Badge variant="outline" className="border-emerald-300 text-emerald-700"><Rocket className="h-3 w-3 mr-1" />Live</Badge>}
                    {overdue && <Badge variant="outline" className="border-red-300 text-red-700"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{fmtDate(p.scheduled_date)}</span>
                </div>
                <h4 className="font-medium leading-snug mb-2">{p.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  {p.primary_keyword && <Badge variant="secondary">{p.primary_keyword}</Badge>}
                  <span>{p.read_minutes ?? "—"} min read</span>
                </div>
                {p.meta_description && <p className="text-xs text-muted-foreground line-clamp-2">{p.meta_description}</p>}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PostDetail({ post, saving, onChange }: {
  post: BlogPost; saving: boolean; onChange: (patch: Partial<BlogPost>) => void;
}) {
  const [clientNotes, setClientNotes] = useState(post.client_notes ?? "");
  const [internalNotes, setInternalNotes] = useState(post.internal_notes ?? "");
  useEffect(() => { setClientNotes(post.client_notes ?? ""); setInternalNotes(post.internal_notes ?? ""); }, [post.id]);
  return (
    <div className="space-y-5">
      <SheetHeader>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <BlogStatusBadge status={post.status} />
          {post.primary_keyword && <Badge variant="secondary">{post.primary_keyword}</Badge>}
          <Badge variant="outline">{post.read_minutes ?? "—"} min read</Badge>
        </div>
        <SheetTitle className="text-xl leading-snug">{post.title}</SheetTitle>
        <SheetDescription>Scheduled {fmtDate(post.scheduled_date)} · {post.url}</SheetDescription>
      </SheetHeader>
      <Card className="p-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-2">Workflow:</span>
        <Button size="sm" variant={post.status === "in_review" ? "default" : "outline"}
          onClick={() => onChange({ status: "in_review" })} disabled={saving}>Send for review</Button>
        <Button size="sm" variant={post.status === "approved" ? "default" : "outline"}
          onClick={() => onChange({ status: "approved" })} disabled={saving}
          className={post.status === "approved" ? "" : "text-emerald-700 border-emerald-300"}>
          <Check className="h-3 w-3 mr-1" /> Approve
        </Button>
        <Button size="sm" variant={post.status === "deployed" ? "default" : "outline"}
          onClick={() => onChange({ status: "deployed" })} disabled={saving}
          className={post.status === "deployed" ? "" : "text-violet-700 border-violet-300"}>
          <Rocket className="h-3 w-3 mr-1" /> Mark deployed
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onChange({ status: "draft" })} disabled={saving}>Back to draft</Button>
      </Card>
      {post.meta_description && <Field label="Meta description" value={<code className="text-xs bg-muted px-2 py-1 rounded block whitespace-pre-wrap">{post.meta_description}</code>} />}
      {(post.secondary_keywords?.length ?? 0) > 0 && <Field label="Secondary keywords" value={
        <div className="flex flex-wrap gap-1.5">{post.secondary_keywords!.map(k => <Badge key={k} variant="outline">{k}</Badge>)}</div>
      } />}
      <Field label="Article (markdown)" value={
        <div className="prose prose-sm max-w-none border rounded-lg p-4 bg-muted/20 max-h-[60vh] overflow-y-auto whitespace-pre-wrap font-sans text-sm leading-relaxed">{post.body_md}</div>
      } />
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Client notes</div>
        <Textarea rows={4} value={clientNotes} onChange={(e) => setClientNotes(e.target.value)}
          placeholder="Suggest edits, tone changes…" />
        <Button size="sm" onClick={() => onChange({ client_notes: clientNotes })} disabled={saving}>Save client notes</Button>
      </div>
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Internal notes</div>
        <Textarea rows={3} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
        <Button size="sm" variant="outline" onClick={() => onChange({ internal_notes: internalNotes })} disabled={saving}>Save internal notes</Button>
      </div>
    </div>
  );
}

/* ---------- Indexing actions ---------- */
function IndexingActions({ status, url, compact = false }: { status: string; url: string | null; compact?: boolean }) {
  if (!url) return <span className="text-xs text-muted-foreground">—</span>;
  if (status !== "done") {
    return <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />After completion</span>;
  }
  return (
    <div className={compact ? "flex items-center gap-1.5" : "flex flex-wrap items-center gap-2"}>
      <a href={gscInspectUrl(url)} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
        <Search className="h-3 w-3" /> Inspect on Google
      </a>
      <a href={bingSubmitUrl(url)} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100">
        <Search className="h-3 w-3" /> Submit to Bing
      </a>
    </div>
  );
}

/* ---------- Analytics (uses existing gsc-keywords function) ---------- */
type AnalyticsRow = { clicks?: number; impressions?: number; views?: number; users?: number };
function AnalyticsPanel() {
  const [pages, setPages] = useState<Record<string, { clicks: number; impressions: number }> | null>(null);
  const [ga, setGa] = useState<Record<string, { views: number; users: number }> | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setErr(null);
    try {
      const [pRes, aRes] = await Promise.all([
        publicSupabase.functions.invoke("gsc-keywords?mode=pages", { body: {} }),
        publicSupabase.functions.invoke("gsc-keywords?mode=analytics", { body: {} }),
      ]);
      if (pRes.error) throw pRes.error;
      setPages((pRes.data as { pages: Record<string, { clicks: number; impressions: number }> }).pages);
      if (!aRes.error) setGa((aRes.data as { pages: Record<string, { views: number; users: number }> }).pages);
    } catch (e) {
      setErr((e as Error).message || "Failed to load analytics");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const totals = useMemo(() => {
    if (!pages) return { clicks: 0, impressions: 0 };
    return Object.values(pages).reduce((s, r) => ({
      clicks: s.clicks + r.clicks, impressions: s.impressions + r.impressions,
    }), { clicks: 0, impressions: 0 });
  }, [pages]);

  const gaTotals = useMemo(() => {
    if (!ga) return { views: 0, users: 0 };
    return Object.values(ga).reduce((s, r) => ({ views: s.views + r.views, users: s.users + r.users }), { views: 0, users: 0 });
  }, [ga]);

  const sortedPages = useMemo(() => {
    if (!pages) return [];
    return Object.entries(pages).map(([path, v]) => ({
      path, clicks: v.clicks, impressions: v.impressions,
      views: ga?.[path]?.views ?? 0, users: ga?.[path]?.users ?? 0,
    })).sort((a, b) => b.clicks - a.clicks);
  }, [pages, ga]);

  return (
    <div className="space-y-4">
      <Card className="p-4 flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="bg-emerald-50">Live · last 16 months</Badge>
        <span className="text-xs text-muted-foreground">Source: Google Search Console + GA4 (service account)</span>
        <Button size="sm" variant="outline" className="ml-auto" onClick={load} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </Card>

      {err && <Card className="p-4 text-sm text-red-700 bg-red-50 border-red-200"><AlertCircle className="h-4 w-4 inline mr-1" />{err}</Card>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiTile label="GSC clicks" value={totals.clicks.toLocaleString()} sub="All pages" accent="bg-emerald-50" />
        <KpiTile label="GSC impressions" value={totals.impressions.toLocaleString()} sub="All pages" accent="bg-blue-50" />
        <KpiTile label="GA4 page views" value={gaTotals.views.toLocaleString()} sub="All pages" accent="bg-violet-50" />
        <KpiTile label="GA4 users" value={gaTotals.users.toLocaleString()} sub="Active users" accent="bg-amber-50" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2 text-right">GSC clicks</th>
                <th className="px-3 py-2 text-right">Impressions</th>
                <th className="px-3 py-2 text-right">GA4 views</th>
                <th className="px-3 py-2 text-right">GA4 users</th>
              </tr>
            </thead>
            <tbody>
              {loading && !pages ? (
                <tr><td colSpan={5} className="p-10 text-center"><Loader2 className="h-5 w-5 mx-auto animate-spin" /></td></tr>
              ) : sortedPages.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-muted-foreground">No data.</td></tr>
              ) : sortedPages.slice(0, 100).map((r) => (
                <tr key={r.path} className="border-t hover:bg-muted/20">
                  <td className="px-3 py-2 truncate max-w-[24rem]">{r.path}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.clicks.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.impressions.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.views.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.users.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Rankings (uses gsc-keywords default mode) ---------- */
type Keyword = { keyword: string; position: number; clicks: number; impressions: number; ctr: number; page: string; trend: string; change: number };

function RankingsPanel({ tasks, posts }: { tasks: Task[]; posts: BlogPost[] }) {
  const [data, setData] = useState<{ keywords: Keyword[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const targeted = useMemo(() => {
    const set = new Set<string>();
    for (const t of tasks) {
      if (t.target_keyword) set.add(t.target_keyword.toLowerCase());
      for (const k of t.secondary_keywords ?? []) set.add(k.toLowerCase());
    }
    for (const p of posts) {
      if (p.primary_keyword) set.add(p.primary_keyword.toLowerCase());
      for (const k of p.secondary_keywords ?? []) set.add(k.toLowerCase());
    }
    return set;
  }, [tasks, posts]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: d, error } = await publicSupabase.functions.invoke("gsc-keywords", { body: {} });
      if (error) throw error;
      setData(d as { keywords: Keyword[] });
    } catch (e) { toast.error((e as Error).message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const list = data?.keywords ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((k) => !q || k.keyword.toLowerCase().includes(q));
  }, [data, search]);

  const stats = useMemo(() => {
    const list = data?.keywords ?? [];
    return {
      total: list.length,
      top3: list.filter((k) => k.position <= 3).length,
      page1: list.filter((k) => k.position <= 10).length,
      tracked: list.filter((k) => targeted.has(k.keyword.toLowerCase())).length,
    };
  }, [data, targeted]);

  return (
    <div className="space-y-4">
      <Card className="p-4 flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="bg-emerald-50">Live from Search Console</Badge>
        <span className="text-xs text-muted-foreground">Last 28 days vs prior 28</span>
        <div className="ml-auto flex items-center gap-2">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search keyword…" className="h-9 w-[200px]" />
          <Button size="sm" variant="outline" onClick={load} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiTile label="Keywords ranking" value={String(stats.total)} sub="Total in GSC" accent="bg-blue-50" />
        <KpiTile label="Page 1" value={String(stats.page1)} sub="Positions 1–10" accent="bg-emerald-50" />
        <KpiTile label="Top 3" value={String(stats.top3)} sub="Best positions" accent="bg-violet-50" />
        <KpiTile label="In our plan" value={String(stats.tracked)} sub="Targeted keywords" accent="bg-amber-50" />
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-3 py-2">Keyword</th>
                <th className="px-3 py-2">Position</th>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2 text-right">Impr.</th>
                <th className="px-3 py-2 text-right">Clicks</th>
                <th className="px-3 py-2 text-right">CTR</th>
                <th className="px-3 py-2">Δ</th>
              </tr>
            </thead>
            <tbody>
              {loading && !data ? (
                <tr><td colSpan={7} className="p-10 text-center"><Loader2 className="h-5 w-5 mx-auto animate-spin" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">No keywords yet.</td></tr>
              ) : filtered.slice(0, 200).map((k) => {
                const inPlan = targeted.has(k.keyword.toLowerCase());
                const tone =
                  k.position <= 3 ? "bg-emerald-100 text-emerald-800" :
                  k.position <= 10 ? "bg-blue-100 text-blue-800" :
                  k.position <= 20 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
                return (
                  <tr key={k.keyword} className="border-t hover:bg-muted/20">
                    <td className="px-3 py-2 font-medium">
                      {k.keyword} {inPlan && <Badge variant="outline" className="ml-1 border-emerald-300 text-emerald-700 text-[10px]">in plan</Badge>}
                    </td>
                    <td className="px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${tone}`}>{k.position.toFixed(1)}</span></td>
                    <td className="px-3 py-2 text-muted-foreground text-xs truncate max-w-[14rem]">{k.page}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.impressions}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.clicks}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.ctr.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-xs">
                      {k.trend === "up" && <span className="text-emerald-600">▲ {k.change}</span>}
                      {k.trend === "down" && <span className="text-red-600">▼ {Math.abs(k.change)}</span>}
                      {k.trend === "stable" && <span className="text-muted-foreground">—</span>}
                      {k.trend === "new" && <span className="text-blue-600">new</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
