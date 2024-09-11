import { ConfigProvider, Pagination } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changePaginationCurrentPage } from '../../../../redux/slices/coin-slice';

import styles from './pagination.module.scss';

export const TablePagination: React.FC = () => {
  const { currentPage, limit, allCoins } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();

  const handleChangePage = (page: number) => {
    dispatch(changePaginationCurrentPage({ page }));
  };

  return (
    <div className={styles.paginationContainer}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#AE0A8A',
            borderRadius: 1,
            fontFamily: '"Roboto Condensed", sans-serif',
          },
          components: {
            Pagination: {
              itemActiveBg: '#fad0f1',
              itemBg: '#f2eaea',
            },
          },
        }}>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={allCoins.length}
          showSizeChanger={false}
          pageSize={limit}
          onChange={handleChangePage}
          className={styles.pagination}
        />
      </ConfigProvider>
    </div>
  );
};
