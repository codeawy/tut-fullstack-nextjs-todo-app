// "use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PrismaClient } from "@prisma/client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { todoFormSchema } from "@/schema";

const prisma = new PrismaClient();

const AddTodoForm = () => {
  const createTodo = async (formData: FormData) => {
    "use server";
    const form = Object.fromEntries(formData.entries());
    const { title, body, completed } = todoFormSchema.parse(form);

    await prisma.todo.create({
      data: {
        title,
        body,
        completed,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={14} className="mr-1" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form action={createTodo} className="space-y-8">
            <Input name="title" />
            <Textarea name="body" />
            <Checkbox name="completed" />
            <Button type="submit">Save changes</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
