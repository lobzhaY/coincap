import styles from './cap.module.scss';

export const Cap: React.FC = () => {
    return (
        <div className={styles.cap}>
            <h1>No data</h1>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/17134/17134577.png" alt="No data" />
            </div>
        </div>
    )
}