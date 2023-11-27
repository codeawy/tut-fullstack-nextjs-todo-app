"use server";

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

/**
 * Retrieves the todo list for a specific user.
 *
 * @param {Object} params - The parameters object.
 * @param {string | null} params.userId - The ID of the user whose todo list is to be retrieved.
 * @returns {Promise<Array<ITodo>>} - A promise that resolves to an array of todo items.
 * @throws {Error} - Throws an error if something goes wrong during the retrieval process.
 */
export const getUserTodoListAction = async ({ userId }: { userId: string | null }): Promise<Array<ITodo>> => {
  try {
    return await prisma.todo.findMany({
      where: {
        user_id: userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

/**
 * Creates a new todo item.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.title - The title of the todo item.
 * @param {string | undefined} params.body - The body or description of the todo item.
 * @param {boolean} params.completed - Indicates whether the todo item is completed or not.
 * @param {string | null} params.userId - The ID of the user creating the todo item.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully created.
 * @throws {Error} - Throws an error if something goes wrong during the creation process.
 */
export const createTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
  userId: string | null;
}): Promise<void> => {
  try {
    await prisma.todo.create({
      data: {
        title,
        body,
        completed,
        user_id: userId as string,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

/**
 * Deletes a todo item.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the todo item to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully deleted.
 */
export const deleteTodoAction = async ({ id }: { id: string }): Promise<void> => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};

/**
 * Updates a todo item.
 *
 * @param {ITodo} params - The parameters object containing the todo item details.
 * @param {string} params.id - The ID of the todo item to be updated.
 * @param {string} params.title - The updated title of the todo item.
 * @param {string | undefined} params.body - The updated body or description of the todo item.
 * @param {boolean} params.completed - Indicates whether the todo item is completed or not.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully updated.
 * @throws {Error} - Throws an error if something goes wrong during the update process.
 */
export const updateTodoAction = async ({ id, title, body, completed }: ITodo): Promise<void> => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        completed,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
