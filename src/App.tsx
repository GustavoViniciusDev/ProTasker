import './App.css'
import Home from './components/Home'
import Kanban from './components/Kanban'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kanban" element={<Kanban />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
