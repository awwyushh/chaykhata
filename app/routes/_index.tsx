import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Users, BarChart3, Share2, Lock, Zap } from "lucide-react";
import type { Route } from "./+types/_index";
import { getUser } from "~/lib/session.server";
import { prisma } from "~/lib/db.server";
import { ChaiCup } from "~/components/ChaiCup";
import { Button } from "~/components/ui/button";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const stats = await prisma.debt
    .aggregate({ _count: true, where: { paid: false } })
    .catch(() => ({ _count: 0 }));
  const userCount = await prisma.user.count().catch(() => 0);
  return { user, unpaidCount: stats._count, userCount };
}

export default function Index() {
  const { user, unpaidCount, userCount } = useLoaderData<typeof loader>();

  const features = [
    {
      icon: <Share2 size={20} />,
      title: "Shareable Link",
      desc: "Your personal link. Share it. Let friends log their debts.",
    },
    {
      icon: <Coffee size={20} />,
      title: "Chai Tracking",
      desc: "Track chai, lunch, snacks, or custom — never forget a debt.",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Analytics",
      desc: "See who owes the most. Monthly stats. Top chai criminals.",
    },
    {
      icon: <Zap size={20} />,
      title: "One-Click Pay",
      desc: "Mark debts paid instantly. Confetti included. 🎉",
    },
    {
      icon: <Lock size={20} />,
      title: "PIN Secured",
      desc: "Simple 4-digit PIN auth. No passwords, no stress.",
    },
    {
      icon: <Users size={20} />,
      title: "Leaderboard",
      desc: "Who are the biggest chai criminals in your circle?",
    },
  ];

  return (
    <div className="min-h-screen bg-chai-gradient overflow-hidden">
      {/* Navbar */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-chai-400 to-chai-600 flex items-center justify-center shadow-lg">
            <Coffee size={18} className="text-cream-50" />
          </div>
          <span className="font-bold text-xl text-cream-100" style={{ fontFamily: "var(--font-display)" }}>
            ChayKhata
          </span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <Button>Dashboard <ArrowRight size={15} /></Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>Get Started <ArrowRight size={15} /></Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-chai-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-spice-600/8 blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-8">
            <ChaiCup size={120} animated />
          </div>

          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-chai-300 mb-6 border border-chai-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {userCount}+ chai drinkers tracking debts
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-cream-100 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Friendship fades.
            <br />
            <span className="gradient-text">Chay debt stays.</span>
          </h1>

          <p className="text-lg text-chai-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Track who owes you chai, lunch, or snacks. Share your link.
            Let them log it. Never forget a debt again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
              <Button size="xl" className="w-full sm:w-auto">
                Start Your Khata
                <ArrowRight size={18} />
              </Button>
            </Link>
            {user && (
              <Link to={`/${user.username}`}>
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  My Profile
                  <Share2 size={16} />
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {[
              { value: `${unpaidCount}+`, label: "Unpaid chai debts" },
              { value: `${userCount}+`, label: "Khata holders" },
              { value: "100%", label: "Friendship preserved" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{value}</div>
                <div className="text-sm text-chai-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-cream-100 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            How it works
          </h2>
          <p className="text-chai-400">Three steps. No drama.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: "🔗",
              title: "Share your link",
              desc: "You get a link like chaykhata.app/ayush. Share it with whoever owes you.",
            },
            {
              step: "02",
              icon: "☕",
              title: "They log the debt",
              desc: "Friend opens your link, signs up (or logs in), and adds what they owe you.",
            },
            {
              step: "03",
              icon: "✅",
              title: "Mark it paid",
              desc: "Once settled, hit the paid button. Confetti flies. Friendship survives.",
            },
          ].map(({ step, icon, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{icon}</div>
                <div>
                  <div className="text-xs font-mono text-chai-500 mb-1">{step}</div>
                  <h3 className="font-bold text-cream-100 mb-2">{title}</h3>
                  <p className="text-sm text-chai-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-cream-100 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Everything you need
          </h2>
          <p className="text-chai-400">Splitwise meets desi chai culture.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:bg-white/10 transition-all hover:scale-[1.01]"
            >
              <div className="w-10 h-10 rounded-xl bg-chai-500/20 text-chai-400 flex items-center justify-center mb-3">
                {icon}
              </div>
              <h3 className="font-bold text-cream-100 mb-1.5">{title}</h3>
              <p className="text-sm text-chai-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 text-center border border-chai-500/20"
        >
          <div className="text-5xl mb-4">☕</div>
          <h2 className="text-3xl font-bold text-cream-100 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Ready to start your khata?
          </h2>
          <p className="text-chai-400 mb-8 max-w-md mx-auto">
            Free forever. No credit card. Just chai accountability.
          </p>
          <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
            <Button size="xl">
              Start for Free <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-chai-700">
        <p>Made with ☕ and too many unpaid chais</p>
      </footer>
    </div>
  );
}
