import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Route } from "./+types/analytics";
import { requireUser } from "~/lib/session.server";
import { prisma } from "~/lib/db.server";
import { Navbar } from "~/components/layout/Navbar";
import { ITEM_LABELS } from "~/lib/utils";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);

  const allDebts = await prisma.debt.findMany({
    where: {
      OR: [{ creditorId: user.id }, { debtorId: user.id }],
    },
    include: {
      creditor: { select: { username: true, fullName: true } },
      debtor: { select: { username: true, fullName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Monthly breakdown (last 6 months)
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const nextDate = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 1);
    const month = date.toLocaleString("en-IN", { month: "short" });
    const debtsInMonth = allDebts.filter(
      (d) =>
        new Date(d.createdAt) >= date && new Date(d.createdAt) < nextDate
    );
    const owed = debtsInMonth.filter((d) => d.creditorId === user.id).length;
    const owing = debtsInMonth.filter((d) => d.debtorId === user.id).length;
    return { month, owed, owing };
  });

  // Item breakdown
  const itemCounts = ["CHAY", "LUNCH", "SNACKS", "CUSTOM"].map((type) => ({
    name: ITEM_LABELS[type].label,
    emoji: ITEM_LABELS[type].emoji,
    value: allDebts.filter((d) => d.itemType === type).length,
  }));

  // Top debtors (people who owe current user the most)
  const debtorMap = new Map<string, { name: string; count: number }>();
  allDebts
    .filter((d) => d.creditorId === user.id && !d.paid)
    .forEach((d) => {
      const key = d.debtor.username;
      const existing = debtorMap.get(key);
      debtorMap.set(key, {
        name: d.debtor.fullName,
        count: (existing?.count ?? 0) + d.count,
      });
    });
  const topDebtors = [...debtorMap.entries()]
    .map(([username, data]) => ({ username, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const stats = {
    totalOwed: allDebts.filter((d) => d.creditorId === user.id && !d.paid).reduce((s, d) => s + d.count, 0),
    totalOwing: allDebts.filter((d) => d.debtorId === user.id && !d.paid).reduce((s, d) => s + d.count, 0),
    settled: allDebts.filter((d) => d.paid).length,
    totalDebts: allDebts.length,
  };

  return { user, monthlyData, itemCounts, topDebtors, stats };
}

const CHART_COLORS = ["#D09A38", "#E8693A", "#DDB55F", "#9A6418", "#B8801E"];

export default function Analytics() {
  const { user, monthlyData, itemCounts, topDebtors, stats } =
    useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-chai-gradient">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-2xl font-bold text-cream-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Chai Analytics ☕📊
          </h1>
          <p className="text-chai-400 text-sm mt-1">
            Your debt history, visualised.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Chais owed", value: stats.totalOwed, color: "text-chai-300", emoji: "📥" },
            { label: "You owe", value: stats.totalOwing, color: "text-spice-400", emoji: "📤" },
            { label: "Settled", value: stats.settled, color: "text-emerald-400", emoji: "✅" },
            { label: "Total tracked", value: stats.totalDebts, color: "text-cream-200", emoji: "📊" },
          ].map(({ label, value, color, emoji }) => (
            <div key={label} className="glass rounded-2xl p-4">
              <div className="text-xl mb-1">{emoji}</div>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-chai-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Monthly chart */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold text-cream-100 mb-4">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData} barGap={4}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#9A6418", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9A6418", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(30, 18, 5, 0.95)",
                    border: "1px solid rgba(208, 154, 56, 0.3)",
                    borderRadius: "12px",
                    color: "#fef9ec",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="owed" name="Owed to me" fill="#D09A38" radius={[4, 4, 0, 0]} />
                <Bar dataKey="owing" name="I owe" fill="#E8693A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Item type breakdown */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold text-cream-100 mb-4">By Item Type</h3>
            {itemCounts.some((i) => i.value > 0) ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={itemCounts.filter((i) => i.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={3}
                  >
                    {itemCounts.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(30, 18, 5, 0.95)",
                      border: "1px solid rgba(208, 154, 56, 0.3)",
                      borderRadius: "12px",
                      color: "#fef9ec",
                      fontSize: "12px",
                    }}
                    formatter={(value, name) => [value, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-chai-600 text-sm">
                No data yet ☕
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {itemCounts.map(({ name, emoji, value }, idx) => (
                <div key={name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: CHART_COLORS[idx % CHART_COLORS.length] }}
                  />
                  <span className="text-chai-400">
                    {emoji} {name} ({value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top chai criminals leaderboard */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏆</span>
            <h3 className="font-semibold text-cream-100">Top Chai Criminals</h3>
            <span className="text-xs text-chai-500 ml-1">(people who owe you the most)</span>
          </div>
          {topDebtors.length === 0 ? (
            <p className="text-chai-600 text-sm py-4 text-center">
              No open debts. You're well liked! 😇
            </p>
          ) : (
            <div className="space-y-2">
              {topDebtors.map(({ username, name, count }, i) => (
                <div
                  key={username}
                  className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : i === 1
                        ? "bg-gray-400/20 text-gray-300"
                        : i === 2
                        ? "bg-amber-700/20 text-amber-600"
                        : "bg-white/5 text-chai-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-cream-100 text-sm">{name}</div>
                    <div className="text-xs text-chai-500">@{username}</div>
                  </div>
                  <div className="text-chai-300 font-bold">
                    {count} ☕
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
