import { Outlet, useNavigate } from "react-router-dom";

import { Header, Loader } from "./components";
import { Suspense, useEffect } from "react";
import { useAppSelector } from "./hooks";

function App() {
  const { isError } = useAppSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
     navigate('/404', {replace: true});
    }
  }, [isError, navigate]);
  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <div>
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}

export default App;
