import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';


function App() {
  return (
    <Router>
      {/* Menu */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <NavLink className="navbar-brand" to="/">PokeDex</NavLink>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" activeClassName="active">Contact</NavLink>
          </li>
        </ul>
      </nav>
      {/* Content */}
      <div className="text-center text-success font-weight-bold">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>      
    </Router>
  );
}

export default App;
