// pages/mine/studyArticle/studyArticle.js
const wxParse = require('../../../wxParse/wxParse.js')
Page({
  data: {
  
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.getStudyListUrl,
      data: {
        id:''
      }
    }).then(({ data }) => {
      let d = data
      d.map(item=>{
        item.create_date_time = item.create_date_time.substring(0,16);
      })
      this.setData({
        lists: data
      })
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  goDetail(e){
    wx.setStorageSync('content', e.currentTarget.dataset.content);
    wx.navigateTo({
      url: `/pages/mine/studyArticle/studyDetail/studyDetail`
    })
  }
})