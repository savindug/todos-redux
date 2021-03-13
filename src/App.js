import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { Home } from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        {/* <Route path="/login" component={} />
        <Route path="/register" component={} /> */}
        {/* <Route path="/products" component={} />
        <Route path="/cart" component={} />
        <Route path="/product/:id" component={} /> */}
      </Switch>
    </Router>
  );
}

export default App;
