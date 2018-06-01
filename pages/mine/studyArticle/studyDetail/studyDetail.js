// pages/mine/studyArticle/studyDetail/studyDetail.js
const wxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {
  
  },
  onLoad: function (options) {
    let t = this;
    let c = wx.getStorageSync('content')
    wxParse.wxParse('article', 'html', c, t, 0);
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
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