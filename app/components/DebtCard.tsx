import { motion } from "framer-motion";
import { useFetcher } from "react-router";
import { CheckCircle, Clock, Trash2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ITEM_LABELS, formatRelativeTime, getRandomRoast } from "~/lib/utils";

interface Debt {
  id: string;
  creditorId: string;
  debtorId: string;
  itemType: string;
  customItem: string | null;
  count: number;
  notes: string | null;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  creditor: { username: string; fullName: string };
  debtor: { username: string; fullName: string };
}

interface DebtCardProps {
  debt: Debt;
  currentUserId: string;
  showActions?: boolean;
}

export function DebtCard({ debt, currentUserId, showActions = true }: DebtCardProps) {
  const fetcher = useFetcher();
  const item = ITEM_LABELS[debt.itemType] ?? { label: debt.customItem ?? "Item", emoji: "✍️" };
  const isCreditor = debt.creditor.username === currentUserId || debt.creditorId === currentUserId;
  const isPending = fetcher.state !== "idle";
  const roast = getRandomRoast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-2xl p-4 hover:bg-white/10 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="text-3xl flex-shrink-0">{item.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-cream-100">
                {debt.itemType === "CUSTOM" ? debt.customItem : item.label}
              </span>
              {debt.count > 1 && (
                <Badge variant="default">×{debt.count}</Badge>
              )}
              <Badge variant={debt.paid ? "paid" : "unpaid"}>
                {debt.paid ? "✓ Paid" : "Pending"}
              </Badge>
            </div>

            <p className="text-sm text-chai-400 mt-0.5">
              {isCreditor ? (
                <>
                  <span className="text-chai-300 font-medium">{debt.debtor.fullName}</span>
                  {" "}owes you
                </>
              ) : (
                <>
                  You owe{" "}
                  <span className="text-chai-300 font-medium">{debt.creditor.fullName}</span>
                </>
              )}
            </p>

            {debt.notes && (
              <p className="text-xs text-chai-500 mt-1 italic">"{debt.notes}"</p>
            )}

            <div className="flex items-center gap-1.5 mt-2 text-xs text-chai-600">
              <Clock size={11} />
              <span>{formatRelativeTime(debt.createdAt)}</span>
              {!debt.paid && !isCreditor && (
                <span className="text-spice-500/70 ml-1">· {roast}</span>
              )}
            </div>
          </div>
        </div>

        {showActions && !debt.paid && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <fetcher.Form method="post" action={`/debt/${debt.id}`}>
              <input type="hidden" name="intent" value="mark-paid" />
              <Button
                type="submit"
                variant="success"
                size="sm"
                disabled={isPending}
                title="Mark as paid"
              >
                <CheckCircle size={14} />
                <span className="hidden sm:inline">Paid</span>
              </Button>
            </fetcher.Form>
            {isCreditor && (
              <fetcher.Form method="post" action={`/debt/${debt.id}`}>
                <input type="hidden" name="intent" value="delete" />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  title="Delete"
                  className="text-chai-600 hover:text-spice-400"
                >
                  <Trash2 size={14} />
                </Button>
              </fetcher.Form>
            )}
          </div>
        )}

        {debt.paid && (
          <div className="text-emerald-400 flex-shrink-0">
            <CheckCircle size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
