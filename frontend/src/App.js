import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './components/Register';
function App() {
    return (
        <div className='Main'>
            <div className='border-b-2 p-4 border-red-950 w-full' >
                <Navbar />
            </div>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='/login' element={<Register />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>

    )

}

export default App;
