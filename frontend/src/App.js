import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';


function App() {
    return (
        <div className='Main'>
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
