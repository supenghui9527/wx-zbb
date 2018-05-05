// pages/index/publish/publish.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    active: 0,
    date: '请选择会议日期',//util.formatTime(date).substring(0, 10)
    time: '请选择会议时间',//util.formatTime(date).substring(10)
    tempFilePaths: [],
    actType:['党员大会','支委会','党小组会','党课']
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})