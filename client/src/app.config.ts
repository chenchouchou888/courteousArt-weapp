export default defineAppConfig({

  tabBar:{
    custom:true,
    selectedColor: '#149EFF',
    list:[
      {
        "pagePath":"pages/index/index",
        "text":"首页"
      },
      {
        "pagePath":"pages/library/index",
        "text":"藏品馆"
      },
      {
        "pagePath":"pages/user/index",
        "text":"个人中心"
      }

    ]
  } , pages: [
    'pages/index/index',
    'pages/library/index',
    'pages/user/index',
    'pages/search/index'
  ]
  ,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle:'custom'
  }
})
