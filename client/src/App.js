import logo from "./images/logo.svg";
import "./styles/App.css";
import { getDomain } from "./utils/setup.js";

function App() {
  fetch(`${getDomain()}/test`).then(function (response) {
    console.log(response.json());
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
