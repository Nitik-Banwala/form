import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./Formapp";
import Login from "./Login";
import Profile from "./Profile";

export default function App() {
  const USERS_KEY = "users";
  const SESSION_KEY = "session";

  const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const getSession = () => JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  const setSession = (user) => localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  const clearSession = () => localStorage.removeItem(SESSION_KEY);

  const [users, setUsers] = useState(getUsers());
  const [session, setSessionState] = useState(getSession());

  const handleRegister = (form) => {
    const newUsers = [...users, form];
    setUsers(newUsers);
    saveUsers(newUsers);
  };

  const handleLogin = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return alert("Invalid credentials");

    setSession(user);
    setSessionState(user);
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  return (
    <BrowserRouter>
      <Navbar session={session} logout={logout} />

      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/profile" /> : <Form users={users} onRegister={handleRegister} />}
        />
        <Route
          path="/login"
          element={session ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        // element={session ? <Profile user={session} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}