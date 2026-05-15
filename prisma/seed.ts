import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding ChayKhata...");

  const users = [
    { username: "ayush", fullName: "Ayush Shukla", birthDate: "1999-04-15", pin: "1234", bio: "Chief chai drinker 🫖" },
    { username: "rahul", fullName: "Rahul Verma", birthDate: "1998-07-22", pin: "5678", bio: "Professional chai avoider" },
    { username: "priya", fullName: "Priya Sharma", birthDate: "2000-01-10", pin: "9012", bio: "Chai enthusiast ☕" },
    { username: "arjun", fullName: "Arjun Patel", birthDate: "1997-11-30", pin: "3456", bio: null },
  ];

  const createdUsers: { id: string; username: string }[] = [];

  for (const u of users) {
    const pinHash = await bcrypt.hash(u.pin, 10);
    const user = await (prisma as any).user.upsert({
      where: { username: u.username },
      update: {},
      create: {
        username: u.username,
        fullName: u.fullName,
        birthDate: new Date(u.birthDate),
        pinHash,
        bio: u.bio,
      },
    });
    createdUsers.push({ id: user.id, username: user.username });
    console.log(`  ✓ User @${u.username} (PIN: ${u.pin})`);
  }

  const [ayush, rahul, priya, arjun] = createdUsers;

  const debts = [
    { creditorId: ayush.id, debtorId: rahul.id, itemType: "CHAY", count: 3, notes: "Post match chai", paid: false },
    { creditorId: ayush.id, debtorId: priya.id, itemType: "LUNCH", count: 1, notes: "Canteen lunch", paid: false },
    { creditorId: ayush.id, debtorId: arjun.id, itemType: "SNACKS", count: 2, notes: null, paid: true },
    { creditorId: rahul.id, debtorId: ayush.id, itemType: "CHAY", count: 1, notes: "Morning chai", paid: false },
    { creditorId: priya.id, debtorId: rahul.id, itemType: "CUSTOM", customItem: "Samosa", count: 4, notes: null, paid: false },
    { creditorId: arjun.id, debtorId: priya.id, itemType: "CHAY", count: 2, notes: "Study session", paid: true },
  ];

  for (const debt of debts) {
    await (prisma as any).debt.create({ data: { ...debt, itemType: debt.itemType as any } });
  }

  console.log(`  ✓ ${debts.length} debts created`);
  console.log("✅ Seed complete!\n");
  console.log("Test accounts:");
  users.forEach((u) => console.log(`  @${u.username} / PIN: ${u.pin}`));
}

main()
  .catch(console.error)
  .finally(() => pool.end());
