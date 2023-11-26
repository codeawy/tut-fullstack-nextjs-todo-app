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
import { Label } from "./ui/label";

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
          <DialogTitle>Add a new Todo</DialogTitle>
          <DialogDescription>
            Your to-do item will be uncompleted by default unless you check completed input it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <form action={createTodo} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-sm">
                Title
              </Label>
              <Input name="title" id="title" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="body" className="text-sm">
                Short Description
              </Label>
              <Textarea name="body" id="body" />
            </div>
            <div className="flex items-center">
              <Label className="order-2 ml-2 text-sm" htmlFor="completed">
                Completed
              </Label>
              <Checkbox name="completed" id="completed" />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
