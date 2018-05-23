// pages/login/login.js
let utilMd5 = require('../../utils/md5.js');
Page({
  data: {
  
  },
  onLoad(){
    if (wx.getStorageSync('userInfo')) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  login(e) {
    getApp().$ajax({
      httpUrl: getApp().api.loginUrl,
      title: '登录中...',
      data: {
        orgNumber: e.detail.value.userName,
        password: utilMd5.hexMD5(e.detail.value.password)
      }
    }).then(({ data }) => {
      console.log(data)
      wx.setStorageSync('userInfo', data);
      wx.showToast({
        title: '登陆成功',
        icon: 'none'
      })
      wx.switchTab({
        url: '/pages/index/index'
      })
      wx.hideLoading();
    })
  }
})