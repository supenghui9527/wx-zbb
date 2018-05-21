//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    community: [],
    scrollTop: 0,
    interval: true,
    pageIndex: 1,
    pageCount: '',
    show: false,
    current: 0,
    showSelect: true,
    currentTab: 0,
    communityCount: 0,
    stopScroll: true,
    showPrompt: false,
    isFinish: false,
    nav: [
      {
        item: '全部',
        index: -1
      },
      {
        item: '党员大会',
        index: 2
      },
      {
        item: '支委会',
        index: 1
      },
      {
        item: '党小组会',
        index: 3
      },
      {
        item: '党课',
        index: 0
      }
    ]
  },
  //点击对应切换调取对应的数据
  changeNav(e) {
    let currentTab = e.currentTarget.dataset.index;
    this.setData({
      currentTab: currentTab
    });
    this.goSelect();
    this.getPostings(currentTab);
  },
  getListData() {
    this.getPostings(this.data.currentTab);
  },
  onLoad: function (options) {
    this.getData(20, 0, -1);
  },
  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight,
          userID: wx.getStorageSync('userInfo').orgID
        });
      }
    });
    this.getRank();
    // 月末25号提示未完成任务
    this.getUnfinished();
    // if (new Date().getDate() >= 25) this.getUnfinished();
    // if (new Date().getDate() >= 1 && new Date().getDate() <= 5) wx.showModal({
    //   title: '请及时添加近期工作',
    //   content: '',
    //   showCancel: false,
    //   confirmText: '我知道了'
    // })
  },
  // 筛选
  goSelect() {
    this.setData({
      showSelect: !this.data.showSelect,
      stopScroll: !this.data.stopScroll
    })
  },
  // 获取首页积分排名
  getRank(){
    getApp().$ajax({
      httpUrl: getApp().api.getRankListUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      wx.setStorageSync('pointDetail', data);
      this.setData({
        pointDetail:data,
        point: Math.abs(data.theMonthPoint - data.LastMonthPoint)
      })
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let ctx = this, actId = res.target.dataset.actid;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/detail/detail?cid=${actId}`,
      success: function (res) {
        // ctx.userDo(actId, '0')
      },
      fail: function (res) {
      }
    }
  },
  //获取未完成工作
  getUnfinished() {
    getApp().$ajax({
      httpUrl: getApp().api.getUnfinishedUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        theTime: '2018-05'
      }
    }).then(({ data }) => {
      data == null || data.length == 0 ? this.setData({ isFinish: false }) : this.setData({ isFinish: true });
    })
  },
  hideUnfinished() {
    this.setData({
      showUnfinished: false
    })
  },
  //获取数据方法
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
  //下拉刷新
  onPullDownRefresh: function () {
    let currentTab = this.data.currentTab;
    this.getPostings(currentTab);
  },
  //上拉加载更多
  onReachBottom: function () {
    let currentTab = this.data.currentTab;
    if (this.data.communityCount % 20 != 0) {//判断页码总数是否能整除
      let pageCount = Math.ceil(this.data.communityCount / 20);
      this.setData({
        pageCount: pageCount
      })
    } else {
      let pageCount = this.data.communityCount / 20;
      this.setData({
        pageCount: pageCount
      })
    };
    this.data.pageIndex++;
    if (currentTab == 0) {
      this.reachData(20, this.data.pageIndex, 0, -1)
    } else if (currentTab == 1) {//党员大会
      this.reachData(20, this.data.pageIndex, 0, 2)
    } else if (currentTab == 2) {//党委会
      this.reachData(20, this.data.pageIndex, 0, 1)
    } else if (currentTab == 3) {//党小组会
      this.reachData(20, this.data.pageIndex, 0, 3)
    } else {//党课
      this.reachData(20, this.data.pageIndex, 0, 0)
    }
  },
  //上拉加在更多
  reachData: function (pageNumber, pageIndex, cType, meetingType) {
    //判断页码总数减去当前页码是否还存在下一页
    if (this.data.pageCount - this.data.pageIndex >= 0) {
      getApp().$ajax({
        httpUrl: getApp().api.getMorePostingUrl,
        data: {
          pageNumber: pageNumber,
          pageIndex: pageIndex,
          cType: cType,
          meetingType: meetingType
        }
      }).then(({ data }) => {
        wx.stopPullDownRefresh();
        //区分模版是在详情页面调用还是主页
        for (let i = 0; i < data.community.length; i++) {
          data.community[i].type = ['党课', '支委会', '党员大会', '党小组会'];
        }
        const publishs = [...this.data.community, ...data.community];
        this.setData({
          community: publishs
        })
        wx.hideLoading();
      })
    }
  },
  // 点击对应切换调取对应的数据
  getPostings(currentTab) {
    // 获取全部帖子
    if (currentTab == 0) {
      this.getData(20, -1, -1)
    } else if (currentTab == 1) {//党员大会
      this.getData(20, 0, 2)
    } else if (currentTab == 2) {//支委会
      this.getData(20, 0, 1)
    } else if (currentTab == 3) {//党小组会
      this.getData(20, 0, 3)
    } else {//党课
      this.getData(20, 0, 0)
    }
  },
  //发帖
  goPublish(e) {
    if (this.data.isFinish) {
      this.setData({
        showPrompt: !this.data.showPrompt,
        stopScroll: !this.data.stopScroll
      });
    } else {
      wx.navigateTo({
        url: `/pages/index/publish/publish?cType=0`
      })
    }
  },
  // 取消显示未完成提示
  cancelPublic() {
    this.setData({
      showPrompt: !this.data.showPrompt,
      stopScroll: !this.data.stopScroll
    });
  },
  isShowPrompt(e) {
    const btn = e.currentTarget.dataset.btn;
    btn == '0' ? wx.navigateTo({ url: `/pages/index/publish/publish?cType=0`, success: () => { this.cancelPublic() } }) : wx.navigateTo({ url: `/pages/mine/mywork/mywork`, success: () => { this.cancelPublic() } });
  },
  // 点击进入详情
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?cid=${e.currentTarget.dataset.actid}&cType=0`
    })
  },
  // 获取组件传递id
  toIndexActid(e) {
    this.setData({
      actID: e.detail
    })
  },
  // 搜索
  goSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search?cType=0'
    })
  },
  // 进入我的积分
  gointegral() {
    wx.navigateTo({
      url: "/pages/mine/myintegral/myintegral",
    })
  },
  // 收缴党费
  collected() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.setStorageSync('members', JSON.parse(res.result));
        wx.navigateTo({
          url: "/pages/mine/parties/parties"
        })
      },
      fail: () => {
        console.log(1)
      }
    })
  }
})
