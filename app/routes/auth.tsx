import { useState } from "react";
import { Form, Link, redirect, useActionData, useSearchParams, useNavigation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, User, Calendar, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import type { Route } from "./+types/auth";
import { createUser, loginUser } from "~/lib/auth.server";
import { createUserSession, getUserId } from "~/lib/session.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ChaiCup } from "~/components/ChaiCup";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) throw redirect("/dashboard");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "login") {
    const username = formData.get("username") as string;
    const pin = formData.get("pin") as string;

    if (!username?.trim() || !pin?.trim()) {
      return { error: "All fields required", intent };
    }
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      return { error: "PIN must be exactly 4 digits", intent };
    }

    const result = await loginUser({ username, pin });
    if ("error" in result) return { error: result.error, intent };

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") ?? "/dashboard";
    return createUserSession(result.user.id, redirectTo);
  }

  if (intent === "signup") {
    const username = formData.get("username") as string;
    const fullName = formData.get("fullName") as string;
    const birthDate = formData.get("birthDate") as string;
    const pin = formData.get("pin") as string;
    const confirmPin = formData.get("confirmPin") as string;

    if (!username?.trim() || !fullName?.trim() || !birthDate || !pin) {
      return { error: "All fields required", intent };
    }
    if (!/^[a-z0-9_]{3,20}$/.test(username.toLowerCase())) {
      return { error: "Username: 3-20 chars, letters/numbers/underscore only", intent };
    }
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      return { error: "PIN must be exactly 4 digits", intent };
    }
    if (pin !== confirmPin) {
      return { error: "PINs do not match", intent };
    }

    const result = await createUser({ username, fullName, birthDate, pin });
    if ("error" in result) return { error: result.error, intent };

    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") ?? "/dashboard";
    return createUserSession(result.user.id, redirectTo);
  }

  return { error: "Invalid action", intent: "" };
}

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="min-h-screen bg-chai-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-chai-600/15 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-spice-600/10 blur-[60px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-chai-500 hover:text-chai-300 text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <ChaiCup size={70} animated />
            </div>
            <h1
              className="text-2xl font-bold text-cream-100 mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {mode === "login" ? "Welcome back" : "Start your khata"}
            </h1>
            <p className="text-sm text-chai-400">
              {mode === "login"
                ? "Log in to your ChayKhata account"
                : "Create your account to track chai debts"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m
                    ? "bg-chai-500/30 text-chai-200"
                    : "text-chai-500 hover:text-chai-300"
                }`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {actionData?.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 px-4 py-3 rounded-xl bg-spice-500/15 border border-spice-500/30 text-spice-300 text-sm"
              >
                {actionData.error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Form method="post" className="space-y-4">
                  <input type="hidden" name="intent" value="login" />
                  <Input
                    name="username"
                    label="Username"
                    placeholder="ayush"
                    icon={<User size={14} />}
                    autoComplete="username"
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-chai-200">4-Digit PIN</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-chai-400" />
                      <input
                        name="pin"
                        type={showPin ? "text" : "password"}
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="••••"
                        className="pin-input w-full pl-10 pr-10 py-3"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-chai-500 hover:text-chai-300"
                      >
                        {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login to Khata ☕"}
                  </Button>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Form method="post" className="space-y-4">
                  <input type="hidden" name="intent" value="signup" />
                  <Input
                    name="fullName"
                    label="Full Name"
                    placeholder="Ayush Shukla"
                    icon={<User size={14} />}
                    required
                  />
                  <Input
                    name="username"
                    label="Username"
                    placeholder="ayush"
                    icon={<Coffee size={14} />}
                    autoComplete="username"
                    pattern="[a-z0-9_]+"
                    required
                  />
                  <Input
                    name="birthDate"
                    type="date"
                    label="Date of Birth"
                    icon={<Calendar size={14} />}
                    required
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-chai-200">4-Digit PIN</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-chai-400" />
                      <input
                        name="pin"
                        type={showPin ? "text" : "password"}
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="••••"
                        className="pin-input w-full pl-10 pr-10 py-3"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-chai-500 hover:text-chai-300"
                      >
                        {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <Input
                    name="confirmPin"
                    type={showPin ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={4}
                    label="Confirm PIN"
                    placeholder="••••"
                    className="text-center tracking-[0.5em]"
                  />
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Khata ✨"}
                  </Button>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
