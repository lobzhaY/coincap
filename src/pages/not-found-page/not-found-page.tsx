import styles from "./not-found-page.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.wrapper}>
        <div>
          <img
            src='https://cdn-icons-png.flaticon.com/512/6261/6261498.png'
            alt='404'
          />
        </div>
        <h1>Sorry...</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
