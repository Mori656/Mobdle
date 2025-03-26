import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage/HomePage';
import GamePage from './components/gamePage/GamePage';
import NavBar from './components/navBar/NavBar';
import SignInPage from './components/signUpPage/SignUpPage';
import LogInPage from './components/logInPage/LogInPage';

function App() {
  return (
    
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/game' element={<GamePage/>}/>
        <Route path='/logIn' element={<LogInPage/>}/>
        <Route path='/signUp' element={<SignInPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
