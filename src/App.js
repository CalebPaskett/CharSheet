import './App.css';
import { HashRouter } from 'react-router-dom';
import { Router } from './components/router';

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
