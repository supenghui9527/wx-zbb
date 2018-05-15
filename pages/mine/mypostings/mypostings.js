// pages/mine/mypostings/mypostings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.getAlreadyPostingsUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        mType: 1
      }
    }).then(({ data }) => {
      data.map((item)=>{
        item.month = item.createTime.substring(5,7);
        item.day = item.createTime.substring(8, 10);
        item.type = ['党课', '支委会', '党员大会', '党小组会'];
      })
      this.setData({
        lists: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
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
  
  },
  // 点击进入详情
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?cid=${e.currentTarget.dataset.actid}&cType=${e.currentTarget.dataset.ctype}`
    })
  },
})