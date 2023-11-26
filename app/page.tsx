import AddTodoForm from "@/components/AddTodoForm";

export default function Home() {
  return (
    <main>
      {/* <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul> */}
      <AddTodoForm />
    </main>
  );
}
