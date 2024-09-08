import { TablePagination } from './pagination';
import { DataTable } from './table';

import styles from './main-page.module.scss';

export const MainPage: React.FC = () => {
  return (
    <main>
      <DataTable />
      <TablePagination />
    </main>
  )
}