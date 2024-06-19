import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginRegistro from "./screens/LoginRegistro";
import Home from './screens/Home';
import { auth } from "./firebase";

import gifCarregando from './icons/iconCarregando.gif';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser ? authUser.displayName : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={gifCarregando} width={300} style={{ marginTop: '170px' }} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegistro setUser={setUser} user={user} />} />
        <Route path="/home" element={<Home setUser={setUser} user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
