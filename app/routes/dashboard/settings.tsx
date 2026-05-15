import { Form, useLoaderData, useActionData, useNavigation } from "react-router";
import { motion } from "framer-motion";
import { User, Lock, Share2, Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/settings";
import { requireUser } from "~/lib/session.server";
import { prisma } from "~/lib/db.server";
import { hashPin, verifyPin } from "~/lib/auth.server";
import { Navbar } from "~/components/layout/Navbar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);
  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "update-profile") {
    const fullName = formData.get("fullName") as string;
    const bio = formData.get("bio") as string;

    if (!fullName?.trim()) return { error: "Name required", intent };

    await prisma.user.update({
      where: { id: user.id },
      data: { fullName: fullName.trim(), bio: bio?.trim() || null },
    });
    return { success: "Profile updated!", intent };
  }

  if (intent === "change-pin") {
    const currentPin = formData.get("currentPin") as string;
    const newPin = formData.get("newPin") as string;
    const confirmPin = formData.get("confirmPin") as string;

    if (!currentPin || !newPin || !confirmPin) {
      return { error: "All PIN fields required", intent };
    }
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      return { error: "New PIN must be exactly 4 digits", intent };
    }
    if (newPin !== confirmPin) {
      return { error: "PINs do not match", intent };
    }

    const freshUser = await prisma.user.findUnique({ where: { id: user.id } });
    const isValid = await verifyPin(currentPin, freshUser!.pinHash);
    if (!isValid) return { error: "Current PIN is incorrect", intent };

    await prisma.user.update({
      where: { id: user.id },
      data: { pinHash: await hashPin(newPin) },
    });
    return { success: "PIN updated!", intent };
  }

  return { error: "Unknown action", intent: "" };
}

export default function Settings() {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [copied, setCopied] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${user.username}`
      : `https://chaykhata.vercel.app/${user.username}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-chai-gradient">
      <Navbar user={user} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-2xl font-bold text-cream-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Settings
          </h1>
          <p className="text-chai-400 text-sm mt-1">Manage your khata account</p>
        </motion.div>

        <div className="space-y-6">
          {/* Share link */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Share2 size={16} className="text-chai-400" />
              <h2 className="font-semibold text-cream-100">Your Shareable Link</h2>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-chai-300 truncate">
                {shareUrl}
              </div>
              <Button variant="secondary" size="sm" onClick={copyLink}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </Button>
            </div>
            <p className="text-xs text-chai-600 mt-2">
              Share this with friends so they can log debts to your khata
            </p>
          </div>

          {/* Profile settings */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={16} className="text-chai-400" />
              <h2 className="font-semibold text-cream-100">Profile</h2>
            </div>

            {actionData?.intent === "update-profile" && (
              <div
                className={`mb-4 px-4 py-3 rounded-xl text-sm ${
                  actionData.error
                    ? "bg-spice-500/15 border border-spice-500/30 text-spice-300"
                    : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                }`}
              >
                {actionData.error || actionData.success}
              </div>
            )}

            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="update-profile" />
              <Input
                name="fullName"
                label="Full Name"
                defaultValue={user.fullName}
                required
              />
              <div>
                <label className="text-sm font-medium text-chai-200 mb-1.5 block">Username</label>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-chai-500 text-sm">
                  @{user.username} <span className="text-chai-700">(cannot be changed)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-chai-200">Bio (optional)</label>
                <textarea
                  name="bio"
                  defaultValue={user.bio ?? ""}
                  placeholder="Chief chai drinker..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-cream-100 placeholder:text-chai-600 text-sm focus:outline-none focus:ring-2 focus:ring-chai-400/30 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting && navigation.formData?.get("intent") === "update-profile"}
              >
                Save Profile
              </Button>
            </Form>
          </div>

          {/* Change PIN */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-chai-400" />
              <h2 className="font-semibold text-cream-100">Change PIN</h2>
            </div>

            {actionData?.intent === "change-pin" && (
              <div
                className={`mb-4 px-4 py-3 rounded-xl text-sm ${
                  actionData.error
                    ? "bg-spice-500/15 border border-spice-500/30 text-spice-300"
                    : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                }`}
              >
                {actionData.error || actionData.success}
              </div>
            )}

            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="change-pin" />
              <Input
                name="currentPin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                label="Current PIN"
                placeholder="••••"
                className="text-center tracking-widest"
              />
              <Input
                name="newPin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                label="New PIN"
                placeholder="••••"
                className="text-center tracking-widest"
              />
              <Input
                name="confirmPin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                label="Confirm New PIN"
                placeholder="••••"
                className="text-center tracking-widest"
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting && navigation.formData?.get("intent") === "change-pin"}
              >
                Update PIN
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
