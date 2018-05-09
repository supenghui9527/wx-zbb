// pages/activity/activity.js
Page({
  data: {
  
  },
  onLoad (options) {
    // this.getData(20, -1, -1);
  },
  onShow () {
  
  },
  getLists() {

  },
  getData(pageNub, cType, meetingType) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsUrl,
      data: {
        pageNumber: pageNub,
        cType: cType,
        meetingType: meetingType
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      for (let i = 0; i < data.community.length; i++) {
        data.community[i].type = ['党课', '支委会', '党员大会', '党小组会'];
      };
      this.setData({
        community: data.community,
        communityCount: data.communityCount
      });
    })
  },
  onPullDownRefresh() {
  
  },
  onReachBottom() {
  
  },
  onShareAppMessage() {
  
  }
})