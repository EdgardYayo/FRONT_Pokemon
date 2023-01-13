import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/pokemon/:id' render= {({match}) => <Detail  id={match.params.id}/>}/>
      <Route exact path='/form'>
        <Form />
      </Route>
      <Route exact path='/about'>
        <About />
      </Route>
    </div>
  );
}

export default App;
