import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Homepage } from './Pages/Homepage';
import { PrivateRoute } from './Pages/PrivateRoute';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path = "/signup" element={<Signup/>} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/homepage" element={<PrivateRoute><Homepage/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
