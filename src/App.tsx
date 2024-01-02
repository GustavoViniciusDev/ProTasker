import './App.css'
import Home from './components/Home'
import Kanban from './components/Kanban'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Index';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
