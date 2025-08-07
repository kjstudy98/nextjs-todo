import { PrismaClient, Prisma } from "../src/app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.TodoCreateInput[] = [
  {
    id: "aaaa-aaaa-aaaa-aaaa",
    title: "タスク1",
    status: true,
  },
  {
    id: "bbbb-bbbb-bbbb-bbbb",
    title: "タスク2",
    status: true,
  },
  {
    id: "cccc-cccc-cccc-cccc",
    title: "タスク3",
    status: false,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.todo.create({ data: u });
  }
}

main();
