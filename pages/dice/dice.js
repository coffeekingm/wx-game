Page({
  data: {
    currentNumber: 1,
    isRolling: false,
    history: [],
    showHistoryModal: false
  },

  startRoll(e) {
    if (this.data.isRolling) return;
    
    this.setData({
      isRolling: true,
      rollStartTime: Date.now()
    });

    // 开始快速切换骰子点数的动画
    this.rollAnimation = setInterval(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      this.setData({
        currentNumber: random
      });
    }, 50);
  },

  endRoll() {
    if (!this.data.isRolling) return;

    const rollDuration = Date.now() - this.data.rollStartTime;
    const rollSpeed = Math.min(rollDuration / 1000, 1); // 最大1秒
    
    setTimeout(() => {
      clearInterval(this.rollAnimation);
      const finalNumber = Math.floor(Math.random() * 6) + 1;
      const newHistory = [finalNumber, ...this.data.history].slice(0, 10);
      
      this.setData({
        currentNumber: finalNumber,
        isRolling: false,
        history: newHistory
      });
    }, rollSpeed * 1000);
  },

  showHistory() {
    this.setData({ showHistoryModal: true });
  },

  hideHistory() {
    this.setData({ showHistoryModal: false });
  },

  stopPropagation(e) {
    // 阻止事件冒泡
    e.stopPropagation();
  },

  showRules() {
    wx.showModal({
      title: '游戏规则',
      content: '点击或滑动骰子即可开始投掷。投掷时间越长，骰子旋转时间越长。',
      showCancel: false
    });
  },

  goHome() {
    wx.navigateBack();
  }
}); 