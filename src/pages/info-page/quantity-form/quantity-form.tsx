import { Button, ConfigProvider, InputNumber, InputNumberProps } from 'antd';
import styles from './quantity-form.module.scss';

export const QuantityForm: React.FC = () => {
  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Введите количество</h2>
      <div className={styles.formContainer}>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                hoverBorderColor: '#AE0A8A',
                activeBorderColor: '#EF880D',
              },
            },
          }}>
          <InputNumber className={styles.input} controls={false} onChange={onChange} />
        </ConfigProvider>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultActiveBorderColor: 'EF880D',
                defaultColor: '#EF880D',
                defaultActiveColor: '#EF880D',
                defaultBorderColor: '#EF880D',
                defaultHoverBorderColor: '#AE0A8A',
                defaultHoverColor: '#AE0A8A',
              },
            },
          }}>
          <Button size={'small'} className={styles.button}>
            <span>Купить</span>
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};
