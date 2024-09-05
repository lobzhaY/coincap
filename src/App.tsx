import { Outlet } from 'react-router-dom';

import { Header } from './components';

import styles from './App.module.scss';

function App() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
