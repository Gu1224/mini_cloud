// pages/student/addStudent/addStudent.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentForm: {
      name: '',
      age: 0,
      gender: '',
      hobby: ''
    },
  },
  // 实现对象数据的双向绑定
  bindInput(e) {
    let that = this
    let dataset = e.currentTarget.dataset

    let name = dataset.name
    let value = e.detail.value

    let attrName = 'studentForm.' + name
    that.setData({
      [attrName]: value
    })
  },
  // 提交表单
  commitForm() {
    wx.showLoading({
      title: '提交中，请稍后...',
    })
    wx.cloud.callFunction({
        name: 'student',
        data: {
          type: 'addStudent',
          student: this.data.studentForm
        }
      })
      .then(res => {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '添加成功',
        })
        this.navigateToList()
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
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
})