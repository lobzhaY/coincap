import notFoundSrc from '../../assets/not-found.png';
import styles from './not-found-page.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.wrapper}>
        <div>
          <img src={notFoundSrc} alt="404" />
        </div>
        <h1>Sorry...</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
