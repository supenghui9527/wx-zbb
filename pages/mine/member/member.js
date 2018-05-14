// pages/mine/member/member.js
Page({
  data: {
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    editIndex: 0,
    delBtnWidth: 150,//删除按钮宽度单位（rpx）
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z']
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.getMembersListUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        higherOrgID: wx.getStorageSync('userInfo').higherOrgID,
        type: 1
      }
    }).then(({ data }) => {
      wx.setStorageSync('groups', data);
      this.setData({
        groups: data
      })
    })
    const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio
    });
    // 第一个字母距离顶部高度，css中定义nav高度为83%，所以 *0.83
    const navHeight = this.data.windowHeight * 0.83, // 
      eachLetterHeight = navHeight / 26,
      comTop = (this.data.windowHeight - navHeight) / 2,
      temp = [];
    this.setData({
      eachLetterHeight: eachLetterHeight
    });
  },
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })
    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 500);
  },
  //查看党员详情
  goUser(e) {
    let obj = e.currentTarget.dataset;
    console.log(obj)
    wx.navigateTo({
      url: '/pages/mine/member/detail/detail?username=' + obj.username + '&position=' + obj.position + '&gender=' + obj.gender + '&joindate=' + obj.joindate + '&tel=' + obj.tel + '&idNum=' + obj.idnum + '&userID=' + obj.userid
    })
  },
  //搜索党组织下的党员通过手机号和姓名
  search(e) {
    let val = e.detail.value,
      groups = wx.getStorageSync('groups'),
      newGroups = [];
    for (let i in groups) {
      for (let j = 0; j < groups[i].length; j++) {
        if (groups[i][j].username.indexOf(val) != -1 || groups[i][j].tel.indexOf(val) != -1) {
          newGroups.push(groups[i][j]);
        }
      }
    }
    this.setData({
      newGroups: newGroups,
      searchShow: e.detail.value != '' ? true : false
    })
  }
})