import { useEffect } from 'react';

import { DataTable, TablePagination } from './components';

import { useAppDispatch } from '../../hooks';
import { fetchData } from '../../redux/actions/get-coins-asynk-thunk';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <main>
      <DataTable />
      <TablePagination />
    </main>
  );
};
