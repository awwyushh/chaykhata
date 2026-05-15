import { useState } from "react";
import { useLoaderData, useFetcher, Form } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Coffee,
  Search,
  Filter,
  Share2,
  Copy,
  CheckCircle,
} from "lucide-react";
import type { Route } from "./+types/index";
import { requireUser } from "~/lib/session.server";
import { prisma } from "~/lib/db.server";
import { ITEM_LABELS, generateShareUrl } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { DebtCard } from "~/components/DebtCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import toast from "react-hot-toast";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);

  const [owedToMe, iOwe] = await Promise.all([
    prisma.debt.findMany({
      where: { creditorId: user.id },
      include: {
        creditor: { select: { username: true, fullName: true } },
        debtor: { select: { username: true, fullName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.debt.findMany({
      where: { debtorId: user.id },
      include: {
        creditor: { select: { username: true, fullName: true } },
        debtor: { select: { username: true, fullName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const unpaidOwed = owedToMe.filter((d) => !d.paid).length;
  const unpaidOwing = iOwe.filter((d) => !d.paid).length;

  return { user, owedToMe, iOwe, unpaidOwed, unpaidOwing };
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "add-debt") {
    const debtorUsername = formData.get("debtorUsername") as string;
    const itemType = formData.get("itemType") as string;
    const customItem = formData.get("customItem") as string;
    const count = parseInt(formData.get("count") as string) || 1;
    const notes = formData.get("notes") as string;

    if (!debtorUsername?.trim()) {
      return { error: "Enter debtor username" };
    }

    const debtor = await prisma.user.findUnique({
      where: { username: debtorUsername.toLowerCase().trim() },
    });

    if (!debtor) return { error: "User not found. They need to sign up first." };
    if (debtor.id === user.id) return { error: "Can't add yourself as debtor 😅" };

    await prisma.debt.create({
      data: {
        creditorId: user.id,
        debtorId: debtor.id,
        itemType: itemType as any,
        customItem: itemType === "CUSTOM" ? customItem : null,
        count,
        notes: notes?.trim() || null,
      },
    });

    return { success: "Debt added to khata! ☕" };
  }

  return { error: "Unknown action" };
}

const FILTER_OPTIONS = ["all", "unpaid", "paid"] as const;
type FilterType = (typeof FILTER_OPTIONS)[number];

const ITEM_FILTER_OPTIONS = ["ALL", "CHAY", "LUNCH", "SNACKS", "CUSTOM"] as const;
type ItemFilter = (typeof ITEM_FILTER_OPTIONS)[number];

export default function Dashboard() {
  const { user, owedToMe, iOwe, unpaidOwed, unpaidOwing } =
    useLoaderData<typeof loader>();

  const [tab, setTab] = useState<"owed" | "owing">("owed");
  const [filter, setFilter] = useState<FilterType>("all");
  const [itemFilter, setItemFilter] = useState<ItemFilter>("ALL");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState("CHAY");
  const [copied, setCopied] = useState(false);
  const fetcher = useFetcher<typeof action>();

  const isSubmitting = fetcher.state === "submitting";

  if (fetcher.data?.success && showAddForm) {
    setShowAddForm(false);
    toast.success(fetcher.data.success);
  }

  const filterDebts = (debts: typeof owedToMe) => {
    return debts.filter((d) => {
      if (filter === "paid" && !d.paid) return false;
      if (filter === "unpaid" && d.paid) return false;
      if (itemFilter !== "ALL" && d.itemType !== itemFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const name =
          tab === "owed" ? d.debtor.fullName : d.creditor.fullName;
        const username =
          tab === "owed" ? d.debtor.username : d.creditor.username;
        if (!name.toLowerCase().includes(q) && !username.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  };

  const currentDebts = filterDebts(tab === "owed" ? owedToMe : iOwe);

  const copyLink = async () => {
    const url = generateShareUrl(user.username);
    await navigator.clipboard.writeText(
      typeof window !== "undefined" ? `${window.location.origin}/${user.username}` : url
    );
    setCopied(true);
    toast.success("Link copied! 🔗");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-chai-gradient">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="text-2xl font-bold text-cream-100"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Namaste, {user.fullName.split(" ")[0]} ☕
              </h1>
              <p className="text-chai-400 text-sm mt-1">
                Your chay khata is{" "}
                {unpaidOwed > 0 ? `getting spicy with ${unpaidOwed} unpaid debts` : "all clear! 🎉"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={copyLink}>
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Share Link"}
              </Button>
              <Button size="sm" onClick={() => setShowAddForm(true)}>
                <Plus size={14} />
                Add Debt
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Owed to you", value: unpaidOwed, color: "text-chai-300", emoji: "📥" },
            { label: "You owe", value: unpaidOwing, color: "text-spice-400", emoji: "📤" },
            { label: "Total tracked", value: owedToMe.length + iOwe.length, color: "text-cream-200", emoji: "📊" },
            {
              label: "Settled",
              value: [...owedToMe, ...iOwe].filter((d) => d.paid).length,
              color: "text-emerald-400",
              emoji: "✅",
            },
          ].map(({ label, value, color, emoji }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-4"
            >
              <div className="text-xl mb-1">{emoji}</div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-chai-500 mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Add Debt Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="glass rounded-3xl p-6 w-full max-w-md"
              >
                <h2
                  className="text-xl font-bold text-cream-100 mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Add to Khata
                </h2>

                {fetcher.data?.error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-spice-500/15 border border-spice-500/30 text-spice-300 text-sm">
                    {fetcher.data.error}
                  </div>
                )}

                <fetcher.Form method="post" className="space-y-4">
                  <input type="hidden" name="intent" value="add-debt" />
                  <input type="hidden" name="itemType" value={selectedItem} />

                  <Input
                    name="debtorUsername"
                    label="Who owes you?"
                    placeholder="their-username"
                    icon={<Coffee size={14} />}
                  />

                  {/* Item type selector */}
                  <div>
                    <label className="text-sm font-medium text-chai-200 mb-2 block">
                      What do they owe?
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["CHAY", "LUNCH", "SNACKS", "CUSTOM"] as const).map((type) => {
                        const item = ITEM_LABELS[type];
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedItem(type)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium transition-all ${
                              selectedItem === type
                                ? "bg-chai-500/30 text-chai-200 border border-chai-500/50"
                                : "glass text-chai-400 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-xl">{item.emoji}</span>
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedItem === "CUSTOM" && (
                    <Input
                      name="customItem"
                      label="Custom item"
                      placeholder="What is it?"
                    />
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="count"
                      type="number"
                      label="Count"
                      defaultValue="1"
                      min="1"
                      max="100"
                    />
                    <Input name="notes" label="Notes (optional)" placeholder="Post match, canteen..." />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add to Khata ☕"}
                    </Button>
                  </div>
                </fetcher.Form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-4">
          <button
            onClick={() => setTab("owed")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              tab === "owed"
                ? "bg-chai-500/30 text-chai-200"
                : "text-chai-500 hover:text-chai-300"
            }`}
          >
            Owed to Me
            {unpaidOwed > 0 && (
              <Badge variant="unpaid" className="text-xs px-1.5 py-0">
                {unpaidOwed}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setTab("owing")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              tab === "owing"
                ? "bg-chai-500/30 text-chai-200"
                : "text-chai-500 hover:text-chai-300"
            }`}
          >
            I Owe
            {unpaidOwing > 0 && (
              <Badge variant="unpaid" className="text-xs px-1.5 py-0">
                {unpaidOwing}
              </Badge>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-chai-500"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/10 text-cream-100 placeholder:text-chai-600 focus:outline-none focus:ring-2 focus:ring-chai-400/30"
            />
          </div>

          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-white/10 text-cream-100"
                    : "text-chai-500 hover:text-chai-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Debt list */}
        <div className="space-y-2">
          <AnimatePresence>
            {currentDebts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-chai-600"
              >
                <div className="text-4xl mb-3">☕</div>
                <p className="font-medium">No debts here</p>
                <p className="text-sm mt-1">
                  {tab === "owed"
                    ? "Add a debt or share your link to get started"
                    : "You're debt-free! For now..."}
                </p>
              </motion.div>
            ) : (
              currentDebts.map((debt) => (
                <DebtCard
                  key={debt.id}
                  debt={debt as any}
                  currentUserId={user.id}
                  showActions
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
