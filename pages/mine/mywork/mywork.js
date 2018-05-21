// pages/mine/mywork/mywork.js
Page({
  data: {
    active: 0,
    tab: ['待完成', '已完成'],
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    getApp().$ajax({
      httpUrl: getApp().api.getWorkListsUrl,
      data: {
        orgID:wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      data.map(item => {
        item.date = item.finishTime.substring(5)
      })
      this.setData({
        lists: data
      })
    })
  },
  changeNav(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onHide: function () {
  
  },
  goPublish(e) {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getDownOrgUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
      }
    }).then(({ data }) => {
      if(data.length==0||data==null){
        wx.showToast({
          title: '暂无下级组织，无法发布任务',
          icon:'none'
        })
        return;
      }
      wx.navigateTo({
        url: "/pages/mine/mywork/public/public"
      })
    })
  },
  publicWork(){

  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})