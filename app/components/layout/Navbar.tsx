import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  Coffee,
  User,
  Home,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useFetcher } from "react-router";

interface NavbarProps {
  user?: { username: string; fullName: string } | null;
}

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Navbar({ user }: NavbarProps) {
  const location = useLocation();
  const fetcher = useFetcher();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-chai-400 to-chai-600 flex items-center justify-center shadow-lg shadow-chai-900/30 group-hover:scale-105 transition-transform">
            <Coffee size={18} className="text-cream-50" />
          </div>
          <span
            className="font-bold text-xl text-cream-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ChayKhata
          </span>
        </Link>

        {/* Nav links (desktop) */}
        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors relative",
                    isActive
                      ? "text-chai-300 bg-chai-500/20"
                      : "text-chai-400 hover:text-cream-100 hover:bg-white/10"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-xl bg-chai-500/15"
                    />
                  )}
                  <Icon size={15} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                to={`/${user.username}`}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-chai-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
              >
                <User size={14} />
                <span>{user.username}</span>
              </Link>
              <fetcher.Form method="post" action="/api/logout">
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="text-chai-500 hover:text-spice-400"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </fetcher.Form>
            </>
          ) : (
            <>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home size={14} />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      {user && (
        <nav className="md:hidden border-t border-white/10 flex items-center">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                  isActive ? "text-chai-300" : "text-chai-600 hover:text-chai-300"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
