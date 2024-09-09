import { ConfigProvider, Pagination } from 'antd';

import styles from './pagination.module.scss';

export const TablePagination: React.FC = () => {
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
          total={100}
          showSizeChanger={false}
          className={styles.pagination}
        />
      </ConfigProvider>
    </div>
  );
};
