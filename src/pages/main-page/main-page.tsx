import { DataTable, TablePagination } from "./components";

import { useAppSelector } from "../../hooks";

import { Cap, Loader } from "../../components";

const MainPage: React.FC = () => {
  const { allCoins } = useAppSelector((state) => state.coins);
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <>
      {!isLoading ? (
        allCoins.length > 0 ? (
          <main>
            <DataTable />
            <TablePagination />
          </main>
        ) : (
          <Cap />
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MainPage;
