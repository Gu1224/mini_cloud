// pages/student/student.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取学生列表
    this.getStudent()
  },
  onShow: function () {
    this.getStudent()
  },

  // 获取学生列表
  getStudent() {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.cloud.callFunction({
        name: 'student',
        data: {
          type: 'getStudents'
        }
      })
      .then(res => {
        this.setData({
          studentList: res.result.data
        })
        wx.hideLoading({})
      })
      .catch(err => {
        console.log("获取失败，", err)
      })
  },
  // 删除数据
  delItem(e) {
    wx.cloud.callFunction({
        name: 'student',
        data: {
          type: 'delStudent',
          id: e.currentTarget.dataset.id
        }
      })
      .then(res => {
        wx.showToast({
          title: '删除成功',
          success: this.getStudent()
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

})