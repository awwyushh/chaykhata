import { useLoaderData } from "react-router";
import { redirect } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Coffee } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/debt.$id";
import { requireUser } from "~/lib/session.server";
import { prisma } from "~/lib/db.server";
import { ITEM_LABELS, formatDate } from "~/lib/utils";
import { Navbar } from "~/components/layout/Navbar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ConfettiEffect } from "~/components/ConfettiEffect";
import { useState } from "react";

export async function loader({ params, request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  const debt = await prisma.debt.findUnique({
    where: { id: params.id },
    include: {
      creditor: { select: { id: true, username: true, fullName: true } },
      debtor: { select: { id: true, username: true, fullName: true } },
    },
  });

  if (!debt) throw new Response("Debt not found", { status: 404 });
  if (debt.creditorId !== user.id && debt.debtorId !== user.id) {
    throw new Response("Not authorized", { status: 403 });
  }

  return { debt, user };
}

export async function action({ params, request }: Route.ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const debt = await prisma.debt.findUnique({ where: { id: params.id } });
  if (!debt) throw new Response("Not found", { status: 404 });

  if (intent === "mark-paid") {
    if (debt.creditorId !== user.id && debt.debtorId !== user.id) {
      return { error: "Not authorized" };
    }
    await prisma.debt.update({
      where: { id: params.id },
      data: { paid: true, paidAt: new Date() },
    });
    return { success: "Marked as paid! 🎉" };
  }

  if (intent === "delete") {
    if (debt.creditorId !== user.id) {
      return { error: "Only the creditor can delete" };
    }
    await prisma.debt.delete({ where: { id: params.id } });
    throw redirect("/dashboard");
  }

  return { error: "Unknown action" };
}

export default function DebtDetail() {
  const { debt, user } = useLoaderData<typeof loader>();
  const [confetti, setConfetti] = useState(false);
  const item = ITEM_LABELS[debt.itemType] ?? { label: debt.customItem ?? "Item", emoji: "✍️" };
  const isCreditor = debt.creditorId === user.id;

  return (
    <div className="min-h-screen bg-chai-gradient">
      <ConfettiEffect trigger={confetti} />
      <Navbar user={user} />

      <main className="max-w-xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-chai-500 hover:text-chai-300 text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6"
        >
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{item.emoji}</div>
            <h1 className="text-2xl font-bold text-cream-100" style={{ fontFamily: "var(--font-display)" }}>
              {debt.itemType === "CUSTOM" ? debt.customItem : item.label}
              {debt.count > 1 && ` ×${debt.count}`}
            </h1>
            <div className="mt-2">
              <Badge variant={debt.paid ? "paid" : "unpaid"}>
                {debt.paid ? "✓ Paid" : "Pending"}
              </Badge>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <span className="text-sm text-chai-500">Creditor</span>
              <span className="text-sm font-medium text-cream-100">
                {debt.creditor.fullName} (@{debt.creditor.username})
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <span className="text-sm text-chai-500">Debtor</span>
              <span className="text-sm font-medium text-cream-100">
                {debt.debtor.fullName} (@{debt.debtor.username})
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <span className="text-sm text-chai-500">Added on</span>
              <span className="text-sm text-cream-100">{formatDate(debt.createdAt)}</span>
            </div>
            {debt.paidAt && (
              <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                <span className="text-sm text-chai-500">Paid on</span>
                <span className="text-sm text-emerald-300">{formatDate(debt.paidAt)}</span>
              </div>
            )}
            {debt.notes && (
              <div className="py-2.5">
                <span className="text-sm text-chai-500 block mb-1">Notes</span>
                <span className="text-sm text-cream-100 italic">"{debt.notes}"</span>
              </div>
            )}
          </div>

          {!debt.paid && (
            <div className="flex gap-2">
              <form method="post" className="flex-1">
                <input type="hidden" name="intent" value="mark-paid" />
                <Button
                  type="submit"
                  variant="success"
                  className="w-full"
                  onClick={() => setConfetti(true)}
                >
                  <Coffee size={15} />
                  Mark as Paid 🎉
                </Button>
              </form>
              {isCreditor && (
                <form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <Button type="submit" variant="danger" size="icon">
                    🗑️
                  </Button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
