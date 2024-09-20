import { Suspense, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { ConfigProvider } from "antd";

import { useAppSelector } from "./hooks";

import { Header, Loader } from "./components";

import theme from "./styles/config-provider";
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
      <ConfigProvider
          theme={theme}
        >
      <Suspense fallback={<Loader />}>
        <Header />
        <div>
          <Outlet />
        </div>
      </Suspense>
      </ConfigProvider>
    </div>
  );
}

export default App;
