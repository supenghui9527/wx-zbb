// pages/common/postings/postings.js
Component({
  properties: {
    lists: {
      type: 'array'
    },
  },
  data: {

  },
  methods: {
    //获取详情
    goDetail(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?cid=${e.currentTarget.dataset.actid}`
      })
    },
    //点击图片预览
    showBigPic(e) {
      getApp().showBigPic(e);
    },
    // 点赞
    clickLikes(e){
      let cID = e.currentTarget.dataset.actid;
      getApp().$ajax({
        httpUrl: getApp().api.likesUrl,
        data: {
          cID: cID,
          orgID: wx.getStorageSync('userInfo').orgID
        }
      }).then(({ data }) => {
        this.triggerEvent('getListData');
      })
    },
    // 获取帖子id
    getActid(e) {
      this.setData({ activityID: e.currentTarget.dataset.actid });
      this.triggerEvent('toIndexActid', e.currentTarget.dataset.actid);
    },
  }
})
