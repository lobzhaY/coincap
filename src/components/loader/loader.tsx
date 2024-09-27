import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  return <Spin indicator={<LoadingOutlined spin className={styles.loaderIcon} />} size="large" fullscreen />;
};
