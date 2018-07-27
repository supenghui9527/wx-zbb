// pages/mine/memberActivity/detail/detail.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    this.getLists(options.userID);
  },
  onReady: function () {
  
  },

  onShow: function () {
    
  },
  // 获取参加活动列表
  getLists(userID){
    getApp().$ajax({
      httpUrl: getApp().api.userActListsUrl,
      data: {
        userID: userID
      }
    }).then(({ data }) => {
      this.setData({
        lists: this.recombinedData(data.study),
        firstName: data.study[0].username.substring(0, 1),
        username: data.study[0].username,
        orgName: data.orgName||'',
        studyCount: data.count
      })
    })
  },
  recombinedData(data) {
    let newList = [];
    data.map(({ cID, cType, signTime, title, username }) => {
      let year = signTime.substring(0, 4);
      let index = -1;
      let date = signTime.substring(5, 10);
      newList.forEach((e, i) => {
        if (e.year === year) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        newList.push({ year, month: [{ cID, cType, date, title, username}] });
      } else {
        newList[index].month.push({ cID, cType, date, title, username });
      }
    });
    return newList;
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?cid=${e.currentTarget.dataset.actid}&cType=${e.currentTarget.dataset.ctype}`
    })
  }
})