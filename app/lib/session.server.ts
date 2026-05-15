import { createCookieSessionStorage, redirect } from "react-router";
import { prisma } from "./db.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__chaykhata",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "fallback-secret-change-me"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function destroyUserSession(request: Request, redirectTo = "/") {
  const session = await getSession(request);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function getUserId(request: Request): Promise<string | null> {
  const session = await getSession(request);
  return session.get("userId") ?? null;
}

export async function requireUserId(request: Request, redirectTo?: string) {
  const userId = await getUserId(request);
  if (!userId) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo ?? url.pathname],
    ]);
    throw redirect(`/auth?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw redirect("/auth");
  return user;
}
