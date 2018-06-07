let utilMd5 = require('../../../../utils/md5.js');
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  submit(e) {
    let data = e.detail.value, userinfo = wx.getStorageSync('userInfo');
    for (let i in data) {
      if (data[i] == '') {
        wx.showToast({
          title: '请确认信息是否完整',
          icon: 'none'
        })
      } else {
        console.log(utilMd5.hexMD5(data.oldPassword));
        console.log(userinfo.password);
        if (utilMd5.hexMD5(data.oldPassword) != userinfo.password) {
          wx.showToast({
            title: '请确认原密码是否正确',
            icon: 'none'
          });
          return false;
        }
        if (data.password != data.password1) {
          wx.showToast({
            title: '两次密码不一致，请重新输入',
            icon: 'none'
          });
          return false;
        }
      }
    }
    getApp().$ajax({
      httpUrl: getApp().api.changePasswordUrl,
      data: {
        orgNumber: userinfo.orgNumber,
        oldPassword: userinfo.password,
        newPassword: utilMd5.hexMD5(data.password)
      }
    }).then(({ res }) => {
      getApp().$ajax({
        httpUrl: getApp().api.changePasswordUrl1,
        data: {
          orgNumber: userinfo.orgNumber,
          newPassword: data.password
        }
      }).then(({ ress }) => {
        wx.clearStorageSync();
        setTimeout(() => {
          wx.showToast({
            title: '密码修改成功',
            icon: 'none',
            success() {
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }
          })
        }, 2000)
      })
    })
  }
})