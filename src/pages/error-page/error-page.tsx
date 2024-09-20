import { useRouteError } from "react-router-dom";

import styles from "./error-page.module.scss";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  return (
    <div className={styles.errorPage}>
      <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};
