"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  // TODO ERROR HANDLING
  return await prisma.todo.findMany();
};

export const createTodoAction = async ({
  title,
  body,
  completed,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
