import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from "react-hot-toast";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: "ChayKhata — Friendship fades. Chay debt stays." },
  { name: "description", content: "Track who owes you chai, lunch, or snacks. Share your khata link and never forget a debt again." },
  { name: "theme-color", content: "#1e1205" },
  { property: "og:title", content: "ChayKhata" },
  { property: "og:description", content: "Friendship fades. Chay debt stays." },
  { property: "og:type", content: "website" },
];

export const links: Route.LinksFunction = () => [
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-chai-gradient min-h-screen antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(61, 37, 11, 0.95)",
              color: "#fef9ec",
              border: "1px solid rgba(208, 154, 56, 0.3)",
              backdropFilter: "blur(20px)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            },
            success: {
              iconTheme: { primary: "#d09a38", secondary: "#1e1205" },
            },
            error: {
              iconTheme: { primary: "#e8693a", secondary: "#1e1205" },
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Something went wrong with the khata.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 — Khata Not Found" : `Error ${error.status}`;
    details = error.status === 404
      ? "This page doesn't exist. Maybe the chai was already paid?"
      : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="min-h-screen bg-chai-gradient flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">☕</div>
        <h1 className="text-2xl font-bold text-cream-100 mb-2">{message}</h1>
        <p className="text-chai-300 mb-6">{details}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-chai-500 hover:bg-chai-400 text-cream-50 font-semibold transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
