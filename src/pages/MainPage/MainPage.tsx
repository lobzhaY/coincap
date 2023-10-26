import { useEffect, useState } from "react";
import { Pagination } from "antd";
import TableComponent from "../../components/Table/Table";
import { useGetCoincapQuery } from "../../redux/coincap";
import styles from "./MainPage.module.css";

function MainPage() {
    const { data = [], isLoading } = useGetCoincapQuery();
    const [ten, setTen] = useState([]);
    useEffect(() => {
        if (data.data) {
            const firstten = data.data.slice(0, 10);
            setTen(firstten);
        }
    }, [data]);
    return (
        <main>
            {isLoading ? (
                <p>LOADING</p>
            ) : (
                <>
                    <TableComponent dataTen={ten} />
                    <div className={styles.pagination_container}>
                        <Pagination
                            defaultCurrent={1}
                            total={50}
                            className={styles.pagination}
                        />
                    </div>
                </>
            )}
        </main>
    );
}

export default MainPage;
