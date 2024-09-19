import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";

import styles from "./loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgMask: "rgba(205, 202, 203, 0.5)",
        },
        components: {
          Spin: {
            dotSizeLG: 100,
          },
        },
      }}
    >
      <Spin
        indicator={<LoadingOutlined spin className={styles.loaderIcon} />}
        size='large'
        fullscreen
      />
    </ConfigProvider>
  );
};
