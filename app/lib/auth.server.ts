import bcrypt from "bcryptjs";
import { prisma } from "./db.server";

export async function hashPin(pin: string) {
  return bcrypt.hash(pin, 10);
}

export async function verifyPin(pin: string, hash: string) {
  return bcrypt.compare(pin, hash);
}

export async function createUser({
  username,
  fullName,
  birthDate,
  pin,
}: {
  username: string;
  fullName: string;
  birthDate: string;
  pin: string;
}) {
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return { error: "Username already taken" };
  }

  const pinHash = await hashPin(pin);
  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase().trim(),
      fullName: fullName.trim(),
      birthDate: new Date(birthDate),
      pinHash,
    },
  });

  return { user };
}

export async function loginUser({
  username,
  pin,
}: {
  username: string;
  pin: string;
}) {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase().trim() },
  });

  if (!user) {
    return { error: "User not found" };
  }

  const isValid = await verifyPin(pin, user.pinHash);
  if (!isValid) {
    return { error: "Incorrect PIN" };
  }

  return { user };
}
