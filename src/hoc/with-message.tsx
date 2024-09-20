import { message } from "antd";

export const withMessage = <P extends object>(WrappedComponent: React.FC<P>) => {
  return (props: P) => {
    const [messageApi, contextHolder] = message.useMessage();

    const showSuccessMessage = (content: string) => {
      messageApi.open({
        type: "success",
        content,
      });
    };

    return (
      <>
        {contextHolder}
        <WrappedComponent {...props} showSuccessMessage={showSuccessMessage} />
      </>
    );
  };
};
