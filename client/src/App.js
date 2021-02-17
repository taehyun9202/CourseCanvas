import react, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Course from './components/Course'
import axios from 'axios';

function App() {
  const user = {
    "id": "602c37ac9f377a3a546de58f",
    "name": "Tyler Nam",
    "email": "taehyun9202@hotmail.com",
    "student": false,
    "courses": [
      {
        "_id": "602c3c1b9f377a3a546de596",
        "name": "Math 1104",
        "capacity": 150,
        "professor": {
            "_id": "602c37ac9f377a3a546de58f",
            "name": "Tyler Nam",
            "email": "taehyun9202@hotmail.com"
        }
      },
      {
        "_id": "602c3c219f377a3a546de597",
        "name": "Math 2203",
        "capacity": 40,
        "professor": {
            "_id": "602c37ac9f377a3a546de58f",
            "name": "Tyler Nam",
            "email": "taehyun9202@hotmail.com"
        }
      },
      {
        "_id": "602c3c689f377a3a546de598",
        "name": "Math 2204",
        "capacity": 40,
        "professor": {
            "_id": "602c37ac9f377a3a546de58f",
            "name": "Tyler Nam",
            "email": "taehyun9202@hotmail.com"
        }
      },
      {
        "_id": "602c3c6f9f377a3a546de599",
        "name": "Enge 1024",
        "capacity": 200,
        "professor": {
            "_id": "602c37ac9f377a3a546de58f",
            "name": "Tyler Nam",
            "email": "taehyun9202@hotmail.com"
        }
      },
      {
        "_id": "602c856de3997957b8c1d627",
        "name": "Engl 1024",
        "capacity": 30,
        "professor": {
            "_id": "602c37ac9f377a3a546de58f",
            "name": "Tyler Nam",
            "email": "taehyun9202@hotmail.com"
        },
      }
    ]
  }

  return (
    <div className="app">
      <Header user={user} />
      <div className="content">
        <Sidebar user={user} />
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route
            exact
            path="/:id"
            render={(props) => (
              <Course {...props}/>
            )}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
