// pages/mine/exportdata/exportdata.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    date: util.formatTime(date).substring(0, 10),
    array: ['党员大会', '支委会', '党小组会','党课'],
    type: '请选择导出类型'
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      type: this.data.array[e.detail.value]
    })
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})