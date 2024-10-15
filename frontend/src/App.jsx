import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.scss'
import Register from './components/Register'
import Login from './components/Login'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import EditProject from './components/EditProjectModal'
import Home from './components/Home'
import UserManager from './components/UserManager'
import Footer from './components/Footer'

function App() {


  return (
    <BrowserRouter>

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/UserData' element={<UserManager />} />
            <Route path='/Project' element={<Projects />} />
            <Route path='/Project/:id' element={<ProjectDetail />} />
            <Route path='/Project/Edit/:id' element={<EditProject />} />
            <Route path='/Project/Detail/:id' element={<ProjectDetail />} />
        </Routes>
        
        <Footer />
        
    </BrowserRouter>
  )
}

export default App
