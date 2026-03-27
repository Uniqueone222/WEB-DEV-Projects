import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { FaBookOpen } from 'react-icons/fa'
import { StudyProvider } from './context/StudyContext'

import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import Tasks from './pages/Tasks'
import Revision from './pages/Revision'
import AITools from './pages/AITools'

function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <nav className="navbar">
          <span className="nav-brand"><FaBookOpen/> Study Companion</span>
          <div className="nav-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/subjects">Subjects</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/revision">Revision</NavLink>
            <NavLink to="/ai-tools">AI Tools</NavLink>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/ai-tools" element={<AITools />} />
          </Routes>
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </BrowserRouter>
    </StudyProvider>
  )
}

export default App