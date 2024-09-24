const theme = {
    token: {
      colorPrimary: "#AE0A8A",
      borderRadius: 1,
      borderRadiusLG: 1,
      fontFamily: '"Roboto", sans-serif',
      colorBgMask: "rgba(205, 202, 203, 0.5)",
    },
    components: {
      Table: {
        borderColor: "#fad0f1",
        headerBg: "#eee0e0",
        headerBorderRadius: 1,
      },
      Pagination: {
        itemActiveBg: '#fad0f1',
        itemBg: '#f2eaea',
      },
      InputNumber: {
        hoverBorderColor: '#AE0A8A',
        activeBorderColor: '#EF880D',
      },
      Button: {
        defaultActiveBorderColor: 'EF880D',
        defaultColor: '#EF880D',
        defaultActiveColor: '#EF880D',
        defaultBorderColor: '#EF880D',
        defaultHoverBorderColor: '#AE0A8A',
        defaultHoverColor: '#AE0A8A',
      },
      Spin: {
        dotSizeLG: 100,
      },
    },
  };

  export const themePagination = {
    token: {
      fontFamily: '"Roboto Condensed", sans-serif',
    },
  };

  export const themeInfoPage = {
    token: {
      colorPrimary: "#EF880D",
      colorPrimaryHover: "#AE0A8A",
    },
  };
  
  export default theme;