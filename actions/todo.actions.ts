"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  // ** ERROR HANDLING
  return await prisma.todo.findMany();
};
export const createTodoAction = async () => {};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
