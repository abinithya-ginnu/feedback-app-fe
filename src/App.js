import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element = {<SignUp />}></Route>
        <Route path= '/login' element = {<Login />}></Route>
        <Route path= '/dashboard' element = {<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
