import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from "./components/user/AddUser";
import UserList from "./components/user/UserList";

export const AppContext = createContext();

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
