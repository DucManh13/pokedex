import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Type from './components/Type';
import Ability from './components/Ability';


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
      <div className="font-weight-bold">
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
          
          <Route path="/type/:typeId">
            <ScrollToTop/>
            <Type/>
          </Route>
          <Route path="/ability/:abiId">
            <ScrollToTop/>
            <Ability/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>      
    </Router>
  );
}
export const formatText=(text)=>{
  return text.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
}

export const ScrollToTop=()=> {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
