// pages/group/setting/changeinfo/changeinfo.js
Page({
  data: {
  },
  onLoad(options) {
    // 修改党组织信息获取党组织原来的信息
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      orgName: userInfo.orgName,
      contactTel: userInfo.contactTel,
      contactName: userInfo.contactName,
      orgID: userInfo.orgID,
      secretary: userInfo.secretary,
      secretaryTel: userInfo.secretaryTel,
      contactPosition: userInfo.contactPosition,
    })
  },
  //保存党组织信息
  onSave(e){
    let data = e.detail.value;
    getApp().$ajax({
      httpUrl: getApp().api.saveUserInfoUrl,
      isShowLoading:false,
      hideLoading:false,
      data: data
    }).then(({data,message})=>{
      wx.showToast({
        title: message,
        mask: true,
        icon:'none',
        duration: 3000,
        success: (res) => {
          wx.setStorageSync('userInfo', data);
          setTimeout(()=>{
            wx.navigateBack({
              delta: 2
            })
          },2000)
        }
      })
    })
  }
})