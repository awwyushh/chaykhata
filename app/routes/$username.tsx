import { useState } from "react";
import { useLoaderData, Link, useFetcher } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Share2,
  Copy,
  CheckCircle,
  ArrowRight,
  Calendar,
  Plus,
} from "lucide-react";
import type { Route } from "./+types/$username";
import { prisma } from "~/lib/db.server";
import { getUser } from "~/lib/session.server";
import { ITEM_LABELS, formatDate, getDicebearUrl } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ChaiCup } from "~/components/ChaiCup";
import { ConfettiEffect } from "~/components/ConfettiEffect";
import toast from "react-hot-toast";
import { redirect } from "react-router";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { username } = params;
  if (!username) throw new Response("Not found", { status: 404 });

  const profileUser = await prisma.user.findUnique({
    where: { username: username.toLowerCase() },
    select: {
      id: true,
      username: true,
      fullName: true,
      bio: true,
      createdAt: true,
      _count: {
        select: {
          debtsAsCreditor: true,
          debtsAsDebtor: true,
        },
      },
    },
  });

  if (!profileUser) throw new Response("Not found", { status: 404 });

  const currentUser = await getUser(request);

  const recentDebts = await prisma.debt.findMany({
    where: {
      OR: [
        { creditorId: profileUser.id },
        { debtorId: profileUser.id },
      ],
    },
    include: {
      creditor: { select: { username: true, fullName: true } },
      debtor: { select: { username: true, fullName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const unpaidCount = recentDebts.filter(
    (d) => !d.paid && d.creditorId === profileUser.id
  ).length;

  return { profileUser, currentUser, recentDebts, unpaidCount };
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "add-debt") {
    const { username } = params;
    const currentUser = await getUser(request);
    if (!currentUser) {
      throw redirect(`/auth?redirectTo=/${username}`);
    }

    const profileUser = await prisma.user.findUnique({
      where: { username: username?.toLowerCase() ?? "" },
    });
    if (!profileUser) return { error: "User not found" };
    if (profileUser.id === currentUser.id) {
      return { error: "Can't owe yourself ☕" };
    }

    const itemType = formData.get("itemType") as string;
    const customItem = formData.get("customItem") as string;
    const count = parseInt(formData.get("count") as string) || 1;
    const notes = formData.get("notes") as string;

    await prisma.debt.create({
      data: {
        creditorId: profileUser.id,
        debtorId: currentUser.id,
        itemType: itemType as any,
        customItem: itemType === "CUSTOM" ? customItem : null,
        count,
        notes: notes?.trim() || null,
      },
    });

    return { success: "Logged! Don't forget to pay up 👀" };
  }

  return { error: "Unknown action" };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.profileUser) return [{ title: "Not Found — ChayKhata" }];
  return [
    { title: `${data.profileUser.fullName}'s Khata — ChayKhata` },
    {
      name: "description",
      content: `Log your chai debt to ${data.profileUser.fullName} on ChayKhata`,
    },
  ];
}

export default function PublicProfile() {
  const { profileUser, currentUser, recentDebts, unpaidCount } =
    useLoaderData<typeof loader>();

  const [selectedItem, setSelectedItem] = useState("CHAY");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const isSubmitting = fetcher.state === "submitting";

  if (fetcher.data?.success && showForm) {
    setShowForm(false);
    toast.success(fetcher.data.success);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100);
  }

  const isOwnProfile = currentUser?.id === profileUser.id;

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied! 🔗");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-chai-gradient">
      <ConfettiEffect trigger={confetti} />

      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Coffee size={18} className="text-chai-400" />
            <span className="font-bold text-chai-300" style={{ fontFamily: "var(--font-display)" }}>
              ChayKhata
            </span>
          </Link>
          <div className="flex gap-2">
            {currentUser ? (
              <Link to="/dashboard">
                <Button variant="secondary" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link to={`/auth?redirectTo=/${profileUser.username}`}>
                <Button size="sm">
                  Login <ArrowRight size={13} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 mb-6 border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-chai-400 to-chai-700 flex-shrink-0 overflow-hidden">
              <img
                src={getDicebearUrl(profileUser.username)}
                alt={profileUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-xl font-bold text-cream-100"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {profileUser.fullName}
              </h1>
              <p className="text-chai-400 text-sm">@{profileUser.username}</p>
              {profileUser.bio && (
                <p className="text-chai-300 text-sm mt-1.5 italic">"{profileUser.bio}"</p>
              )}
              <div className="flex items-center gap-3 mt-3 text-xs text-chai-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  Joined {formatDate(profileUser.createdAt)}
                </span>
                <span>·</span>
                <span className="text-spice-500 font-medium">
                  {unpaidCount} active debt{unpaidCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <button onClick={copyLink} className="flex-shrink-0 p-2 rounded-xl text-chai-500 hover:text-chai-300 hover:bg-white/10 transition-colors">
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Log debt CTA */}
        {!isOwnProfile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            {currentUser ? (
              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} />
                I owe {profileUser.fullName.split(" ")[0]} something ☕
              </Button>
            ) : (
              <Link to={`/auth?redirectTo=/${profileUser.username}`}>
                <Button className="w-full" size="lg">
                  Login to log your debt
                  <ArrowRight size={16} />
                </Button>
              </Link>
            )}
          </motion.div>
        )}

        {/* Add debt modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50 }}
                className="glass rounded-3xl p-6 w-full max-w-md"
              >
                <h2 className="text-xl font-bold text-cream-100 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  What do you owe?
                </h2>
                <p className="text-sm text-chai-400 mb-5">
                  Logging debt to {profileUser.fullName}'s khata
                </p>

                {fetcher.data?.error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-spice-500/15 border border-spice-500/30 text-spice-300 text-sm">
                    {fetcher.data.error}
                  </div>
                )}

                <fetcher.Form method="post" className="space-y-4">
                  <input type="hidden" name="intent" value="add-debt" />
                  <input type="hidden" name="itemType" value={selectedItem} />

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
                          <span className="text-2xl">{item.emoji}</span>
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  {selectedItem === "CUSTOM" && (
                    <input
                      name="customItem"
                      placeholder="What do you owe?"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-cream-100 placeholder:text-chai-600 text-sm focus:outline-none focus:ring-2 focus:ring-chai-400/30"
                      required
                    />
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-chai-400 mb-1 block">Count</label>
                      <input
                        name="count"
                        type="number"
                        defaultValue="1"
                        min="1"
                        max="20"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-chai-400/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-chai-400 mb-1 block">Notes</label>
                      <input
                        name="notes"
                        placeholder="Canteen, college..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-cream-100 placeholder:text-chai-600 text-sm focus:outline-none focus:ring-2 focus:ring-chai-400/30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Logging..." : "Log Debt ☕"}
                    </Button>
                  </div>
                </fetcher.Form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent activity */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-cream-100 mb-4 flex items-center gap-2">
            <ChaiCup size={20} animated={false} />
            Recent Activity
          </h3>

          {recentDebts.length === 0 ? (
            <div className="text-center py-10 text-chai-600">
              <div className="text-3xl mb-2">☕</div>
              <p className="text-sm">No debts yet. First debt incoming!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDebts.map((debt) => {
                const item = ITEM_LABELS[debt.itemType] ?? { label: debt.customItem ?? "Item", emoji: "✍️" };
                return (
                  <div
                    key={debt.id}
                    className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-cream-100">
                          {debt.debtor.fullName}
                        </span>
                        <span className="text-xs text-chai-500">owes</span>
                        <span className="text-sm font-medium text-chai-300">
                          {debt.creditor.fullName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-chai-500">
                          {debt.itemType === "CUSTOM" ? debt.customItem : item.label}
                          {debt.count > 1 && ` ×${debt.count}`}
                        </span>
                        <Badge variant={debt.paid ? "paid" : "unpaid"} className="text-xs">
                          {debt.paid ? "✓ Paid" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
