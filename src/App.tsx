import { Outlet } from 'react-router-dom';

import { Header } from './components';

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
