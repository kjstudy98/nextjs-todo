import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const newTodo = await prisma.todo.create({
      data: {
        title,
      },
    });

    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/todos error:", error);
  }
}
