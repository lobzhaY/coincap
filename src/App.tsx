import { Suspense, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "./hooks";

import { Header, Loader } from "./components";

import styles from "./App.module.scss";

function App() {
  const { isError } = useAppSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/404", { replace: true });
    }
  }, [isError, navigate]);

  return (
    <div className={styles.root}>
      <Suspense fallback={<Loader />}>
        <Header />
        <div>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
