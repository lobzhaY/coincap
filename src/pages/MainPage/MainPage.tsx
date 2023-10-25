import { Pagination } from "antd";
import TableComponent from "../../components/Table/Table";
import styles from "./MainPage.module.css";

function MainPage() {
    return (
        <main>
            <TableComponent />
            <div className={styles.pagination_container}>
                <Pagination
                    defaultCurrent={1}
                    total={50}
                    className={styles.pagination}
                />
            </div>
        </main>
    );
}

export default MainPage;
