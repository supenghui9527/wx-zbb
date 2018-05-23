// pages/mine/exportdata/exportdata.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    startDate: util.formatTime(date).substring(0, 10),
    endDate: util.formatTime(date).substring(0, 10),
    array: ['党课', '支委会','党员大会','党小组会'],
    meetingType: '请选择导出类型'
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  startDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      meetingType: this.data.array[e.detail.value],
      meetingIndex: e.detail.value
    })
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  exportData(){
    console.log(this.data.meetingIndex)
    if (Date.parse(this.data.startDate) >= Date.parse(this.data.endDate)) {
      wx.showToast({
        title: '开始时间不能大于或等于结束时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    getApp().$ajax({
      httpUrl: getApp().api.exportDataUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        startTime:this.data.startDate,
        endTime: this.data.endDate,
        meetingType: this.data.meetingIndex
      }
    }).then(({ data }) => {
      wx.downloadFile({
        url: data,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    })

  },
  onShareAppMessage: function () {
  
  }
})