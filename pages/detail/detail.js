// pages/detail/detail.js
Page({
  data: {
    active: 1,
    showComment: true,
  },
  onLoad: function (options) {
    this.setData({
      cType: options.cType,
      cID: options.cid
    })
    this.getDetail(options.cid);
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  getDetail(cID){
    //查询帖子详情
    getApp().$ajax({
      httpUrl: getApp().api.postingsDetailUrl,
      data: {
        cID: cID
      }
    }).then(({ data }) => {
      data.community.type = ['党课', '支委会', '党员大会', '党小组会'];
      this.setData({
        item: data.community
      })
    });
  },
  changeTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  //点击图片预览
  showBigPic(e) {
    getApp().showBigPic(e);
  },
  onUnload: function () {
  
  },
  // 评论
  goComment() {
    this.setData({
      showComment: !this.data.showComment
    })
  },
  //保存评论内容
  saveComment(content) {
    getApp().$ajax({
      httpUrl: getApp().api.savePostingsCommentUrl,
      data: {
        cID: this.data.cID,
        orgID: wx.getStorageSync('userInfo').orgID,
        content: content
      }
    }).then(({ data }) => {
      this.goComment();
      this.getDetail(this.data.cID);
    });
  },
  // 确认评论
  sureComment(e) {
    e.detail.value ? this.saveComment(e.detail.value) : wx.showToast({
      title: '请输入评论内容'
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let ctx = this, actId = res.target.dataset.actid;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/index/detail/detail?cid=${actId}`,
      success: function (res) {
        getApp().$ajax({
          httpUrl: getApp().api.shareUrl,
          data: {
            orgID:wx.getStorageSync('userInfo').orgID,
            cID: actId
          }
        }).then(({ data }) => {
          data.isDetail = false;
          data.userID = wx.getStorageSync('userInfo').orgID;
          data.type = ['党课', '支委会', '党员大会', '党小组会'];
          this.setData({
            item: data
          })
        });
      },
      fail: function (res) {
      }
    }
  },
   // 点赞
  clickLikes(e) {
    getApp().$ajax({
      httpUrl: getApp().api.likesUrl,
      data: {
        cID: this.data.cID,
        orgID: wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      this.getDetail(this.data.cID);
    })
  },
})