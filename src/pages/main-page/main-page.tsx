import { TablePagination } from './pagination';
import { DataTable } from './table';

import styles from './main-page.module.scss';
import { useEffect } from 'react';
import { fetchData } from '../../redux/actions/get-coins';
import { useDispatch } from 'react-redux';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchData());
  }, [])
  return (
    <main>
      <DataTable />
      <TablePagination />
    </main>
  )
}