import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import Addtask from "./pages/Addtask";
import TaskList from "./pages/Tasklist";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Addtask />} />
        <Route path="/list" element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default App;
