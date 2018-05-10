const HOST = 'http://192.168.0.86:8080/'; // https://www.jshhfl.com/xwdj/
module.exports = {
  loginUrl: `${HOST}login.do`,  // 登录接口
  getPostingsUrl: `${HOST}findCommunityHomePage.do`,  // 获取帖子列表
  getMorePostingUrl: `${HOST}findCommunityMore.do`,  // 下拉加载更多
  likesUrl: `${HOST}likeCommunity.do`,  // 帖子点赞
  searchUrl: `${HOST}vagueSearch.do`,  // 帖子搜索
  postingsDetailUrl: `${HOST}findCommunityByCID.do`,  // 帖子详情
  postingsCommentUrl: `${HOST}findComment.do`,  // 查询帖子评论
  getMembersListUrl: `${HOST}findUSerByOrgID.do`,// 获取党员列表
  postingsLikesUrl: `${HOST}findlikeUserByCID.do`,  // 查询帖子点赞
  savePostingsCommentUrl: `${HOST}releaseCommentToCommunity.do`,  // 保存评论帖子内容
  deletePostingsUrl: `${HOST}deleteComunity.do`,  // 删除帖子
  upLoadPicUrl: `${HOST}publicPic.do`,  // 上传图片
  pushPostingsUrl: `${HOST}publicCommunity.do`,  // 发布帖子
  getAllOrgNameUrl: `${HOST}findAllOrgName.do`,  // 获取所有组织名称
  getMapMarkesUrl: `${HOST}findAllPosition.do`,  // 获取地图markes
  markeDetailUrl: `${HOST}findPositionDetail.do`,  // 地图marke点详情
  addWorkUrl: `${HOST}addWork.do`,  // 添加近期工作
  findMyPointUrl: `${HOST}findMyPoint.do`,  // 个人积分信息
  pointListUrl: `${HOST}findOrgOrder.do`,  // 积分列表
  userInfoUrl: `${HOST}fingByOrgID.do`,  // 个人中心信息
  changeAvatarUrl: `${HOST}modifyAvatar.do`,  // 修改个人头像
  changePasswordUrl: `${HOST}modifyPassword.do`,  // 修改密码
  getMyWorkUrl: `${HOST}findMyWork.do`,  // 查看我的近期工作
  deleteWorkUrl: `${HOST}deleteWork.do`,  // 删除近期工作
  getUnfinishedUrl: `${HOST}findUnfinishOrg.do`,  // 获取未完成工作的组织
  getAlreadyPostingsUrl: `${HOST}findMeetingByOrgID.do`,  // 获取已发帖子列表
  saveUserInfoUrl: `${HOST}modifyOrg.do`,  // 保存党组织信息
  changeWorkUrl: `${HOST}modifyWork.do`,  // 修改近期工作
  sureWorkUrl: `${HOST}modifyWorkStatus.do`,  // 确认近期工作
  getMessagesUrl: `${HOST}findAllMessage.do`,  // 获取消息
  sureMessageUrl: `${HOST}backMessage.do`, // 确认是否同意删除党员
  deleteMesageUrl: `${HOST}deleteMesage.do`,  // 删除消息
  alreadyLookUrl: `${HOST}readMessage.do`  // 消息已读未读
}