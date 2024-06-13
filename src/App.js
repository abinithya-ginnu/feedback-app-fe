import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ParticipantDashboard from './components/ParticipantDashboard/ParticipantDashboard';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import TrainerDashboard from './components/TrainerDashboard/TrainerDashboard';
import IQADashboard from './components/IQADashboard/IQADashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= '/' element = {<Login />}></Route>
        <Route path= '/signup' element = {<SignUp />}></Route>
        <Route path= '/participant-dashboard' element = {<ParticipantDashboard />}></Route>
        <Route path= '/trainer-dashboard' element = {<TrainerDashboard />}></Route>
        <Route path= '/admin-dashboard' element = {<IQADashboard />}></Route>
        <Route path= '/feedback/save' element = {<FeedbackForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
