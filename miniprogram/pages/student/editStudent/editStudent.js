// pages/student/editStudent/editStudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    age: 0,
    gender: '',
    hobby: ''
  },
  // 获取详细数据
  getDetails(options) {
    wx.cloud.callFunction({
        name: 'student',
        data: {
          type: 'getStudent',
          id: options.id,
        }
      })
      .then(res => {
        this.setData({
          id: res.result.data[0]._id,
          name: res.result.data[0].name,
          age: res.result.data[0].age,
          gender: res.result.data[0].gender,
          hobby: res.result.data[0].hobby,
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 更新数据
  updItem() {
    const that = this
    wx.cloud.callFunction({
        name: 'student',
        data: {
          type: 'updStudent',
          id: that.data.id,
          student: {
            name: that.data.name,
            age: that.data.age,
            gender: that.data.gender,
            hobby: that.data.hobby,
          }
        }
      })
      .then(res => {
        wx.showToast({
          title: '修改成功',
          success: this.navigateToList()
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 跳转到列表页面
  navigateToList() {
    wx.switchTab({
      url: '../students/students',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(options)
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

  }
})