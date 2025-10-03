import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import './App.css';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Type from './components/Type';
import TypeList from './components/TypeList';
import Ability from './components/Ability';
import AbilityList from './components/AbilityList';
import Move from './components/Move';
import MoveList from './components/MoveList';
import PkInfo from './components/PkInfo';

function App() {
  return (
    <Router>
      {/* Menu */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <NavLink className="navbar-brand" to="/">
          PokeDex
        </NavLink>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/type"
              className="nav-link"
              activeClassName="active"
            >
              Types
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/ability"
              className="nav-link"
              activeClassName="active"
            >
              Abilities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/move"
              className="nav-link"
              activeClassName="active"
            >
              Moves
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Content */}
      <div className="font-weight-bold content-area">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/pokemon">
            <Home />
          </Route>
          <Route exact path="/pokemon/:pkId">
            <PkInfo />
          </Route>
          <Route exact path="/type">
            <TypeList />
          </Route>
          <Route path="/type/:typeId">
            <ScrToTop />
            <Type />
          </Route>
          <Route exact path="/ability">
            <AbilityList />
          </Route>
          <Route path="/ability/:abiId">
            <ScrToTop />
            <Ability />
          </Route>
          <Route exact path="/move">
            <MoveList />
          </Route>
          <Route path="/move/:moveId">
            <Move />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>

      <ScrollToTop showUnder={300}>
        <button className="btn btn-lg btn-info">
          <i className="fas fa-lg fa-angle-up"></i>
        </button>
      </ScrollToTop>
    </Router>
  );
}
export const formatText = (text) => {
  if (text === 'porygon-z') return 'Porygon-Z';
  else
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export const ScrToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default App;
