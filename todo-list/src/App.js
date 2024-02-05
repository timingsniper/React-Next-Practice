import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import ToDoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./context/DarkModeContext";

const filters = ["all", "active", "completed"];

function App() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <ToDoList filter={filter}/>
    </DarkModeProvider>
  );
}

export default App;
