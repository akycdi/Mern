import React from 'react';
import Todo from './components/Todo';
import Signup from './components/Signup';
import AppBarRender from './components/AppBar';
import Login from './components/Login';

import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
          <AppBarRender />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
