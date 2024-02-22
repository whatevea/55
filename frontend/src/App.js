import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Budget from './components/JobPost/Budget';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div className='Main'>
            <ToastContainer />
            <div className='border-b-2 p-4 border-red-950 w-full' >
                <Navbar />
            </div>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>

    )

}

export default App;
