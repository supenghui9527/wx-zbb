const HOST = 'https://www.jshhfl.com/xwdj/'; // https://www.jshhfl.com/xwdj/
module.exports = {
  loginUrl: `${HOST}login.do`,  // 登录接口
  getPostingsUrl: `${HOST}findCommunityHomePage.do`,  // 获取帖子列表
  getMorePostingUrl: `${HOST}findCommunityMore.do`,  // 三会一课下拉加载更多
  getMorePartyUrl: `${HOST}findPartyCommunityMore.do`,//党日活动
  likesUrl: `${HOST}likeCommunity.do`,  // 帖子点赞
  searchUrl: `${HOST}vagueSearch.do`,  // 帖子搜索
  actSignUrl: `${HOST}communitySign.do`,//扫码签到
  postingsDetailUrl: `${HOST}toCommunityDetails.do`,  // 帖子详情
  shareUrl: `${HOST}communityToShare.do`,// 分享
  hideAddUrl: `${HOST}checkIsAddCommunity.do`, //临时退出保存
  getPartyLists: `${HOST}findPartyCommunityHomePage.do`, // 党日活动
  postingsCommentUrl: `${HOST}findComment.do`,  // 查询帖子评论
  studyRecordtUrl: `${HOST}findStudyRecord.do`,//学习记录
  studyAndPartyPayUrl: `${HOST}studyAndPartyPay.do`,//党费和学习记录总计
  PartyDeusrRecordUrl: `${HOST}findPartyDeusrRecord.do`,//党费记录
  getMembersListUrl: `${HOST}findUSerByOrgID.do`,// 获取党员列表
  postingsLikesUrl: `${HOST}findlikeUserByCID.do`,  // 查询帖子点赞
  savePostingsCommentUrl: `${HOST}releaseCommentToCommunity.do`,  // 保存评论帖子内容
  deletePostingsUrl: `${HOST}deleteComunity.do`,  // 删除帖子
  upLoadPicUrl: `${HOST}publicPic.do`,  // 上传图片
  getDownOrgUrl: `${HOST}findLowOrg.do`,// 获取下级组织列表
  pushPostingsUrl: `${HOST}publicCommunity.do`,  // 发布帖子
  getAllOrgNameUrl: `${HOST}findAllOrgName.do`,  // 获取所有组织名称
  getMapMarkesUrl: `${HOST}findAllPosition.do`,  // 获取地图markes
  markeDetailUrl: `${HOST}findPositionDetail.do`,  // 地图marke点详情
  getWorkListsUrl: `${HOST}findRecentWork.do`, //查看近期工作任务
  addWorkUrl: `${HOST}saveRecentWork.do`,  // 添加近期工作
  saveRewardsUrl: `${HOST}toPointreOrPu.do`, // 发布奖惩
  getRewarListdUrl:`${HOST}findreOrPuRecord.do`,//奖惩记录列表
  findMyPointUrl: `${HOST}findMyPoint.do`,  // 个人积分信息
  partyDeusPayUrl: `${HOST}partyDeusPay.do`,//缴纳党费
  pointListUrl: `${HOST}findOrgOrder.do`,  // 积分列表
  userInfoUrl: `${HOST}fingByOrgID.do`,  // 个人中心信息
  exportDataUrl:`${HOST}exportCommunityData.do`,//数据导出
  changeAvatarUrl: `${HOST}modifyAvatar.do`,  // 修改个人头像
  changePasswordUrl: `${HOST}modifyPassword.do`,  // 修改密码
  changePasswordUrl1:`${HOST}backstagePassword.do`,//修改后台管理密码
  getMyWorkUrl: `${HOST}findMyWork.do`,  // 查看我的近期工作
  deleteWorkUrl: `${HOST}deleteWork.do`,  // 删除近期工作
  getRankListUrl: `${HOST}pointRanking.do`,//获取积分
  slectRankUrl: `${HOST}filtratePointRanking.do`,// 筛选积分排名
  rankDetailUrl: `${HOST}myPointDetail.do`,// 积分详情
  // getUnfinishedUrl: `${HOST}findUnfinishOrg.do`,  // 获取未完成工作的组织
  getUnfinishedUrl: `${HOST}findTheMonthWork.do`,// 获取未完成工作的组织
  getMessageUrl: `${HOST}findNotification.do`,// 消息通知
  getAlreadyPostingsUrl: `${HOST}findMeetingByOrgID.do`,  // 获取已发帖子列表
  saveUserInfoUrl: `${HOST}modifyOrg.do`,  // 保存党组织信息
  changeWorkUrl: `${HOST}modifyWork.do`,  // 修改近期工作
  sureWorkUrl: `${HOST}modifyWorkStatus.do`,  // 确认近期工作
  getMessagesUrl: `${HOST}findAllMessage.do`,  // 获取消息
  sureMessageUrl: `${HOST}backMessage.do`, // 确认是否同意删除党员
  deleteMesageUrl: `${HOST}deleteMesage.do`,  // 删除消息
  alreadyLookUrl: `${HOST}readMessage.do`,  // 消息已读未读
  emphasisUserUrl: `${HOST}findEmphasisUser.do`,//双重组织生活会
  userListsUrl:`${HOST}nameEmphasisUser.do`, //双重生活会用户名
  userActListsUrl: `${HOST}findEmpPerUser.do`, // 双重生活会个人活动查询
  getStudyListUrl: `${HOST}findStudyList.do` //学习宝 
}