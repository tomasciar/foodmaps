import logo from './images/logo.svg';
import './styles/App.css';
import Test from './components/Test';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Test />
      </header>
    </div>
  );
}

export default App;
