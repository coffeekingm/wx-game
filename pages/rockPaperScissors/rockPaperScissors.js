Page({
  data: {
    player1Choice: '',
    player2Choice: '',
    player1Confirmed: false,
    player2Confirmed: false,
    player1Score: 0,
    player2Score: 0,
    showResult: false,
    resultText: '',
    player1Modifying: false,
    player2Modifying: false
  },

  player1Select(e) {
    if (this.data.showResult) return;
    if (this.data.player1Confirmed && !this.data.player1Modifying) return;
    
    const choice = e.currentTarget.dataset.choice;
    this.setData({ player1Choice: choice });
  },

  player2Select(e) {
    if (this.data.showResult) return;
    if (this.data.player2Confirmed && !this.data.player2Modifying) return;
    
    const choice = e.currentTarget.dataset.choice;
    this.setData({ player2Choice: choice });
  },

  player1Confirm() {
    if (this.data.showResult) return;
    
    if (this.data.player1Confirmed) {
      this.setData({
        player1Confirmed: false,
        player1Modifying: true
      });
    } else {
      this.setData({
        player1Confirmed: true,
        player1Modifying: false
      });
      this.checkResult();
    }
  },

  player2Confirm() {
    if (this.data.showResult) return;
    
    if (this.data.player2Confirmed) {
      this.setData({
        player2Confirmed: false,
        player2Modifying: true
      });
    } else {
      this.setData({
        player2Confirmed: true,
        player2Modifying: false
      });
      this.checkResult();
    }
  },

  checkResult() {
    if (this.data.player1Confirmed && this.data.player2Confirmed) {
      const result = this.judgeWinner(this.data.player1Choice, this.data.player2Choice);
      let resultText = '';
      
      if (result === 1) {
        resultText = '玩家1获胜！';
        this.setData({ player1Score: this.data.player1Score + 1 });
      } else if (result === 2) {
        resultText = '玩家2获胜！';
        this.setData({ player2Score: this.data.player2Score + 1 });
      } else {
        resultText = '平局！';
      }

      this.setData({
        showResult: true,
        resultText
      });
    }
  },

  judgeWinner(choice1, choice2) {
    if (choice1 === choice2) return 0;
    if (
      (choice1 === 'rock' && choice2 === 'scissors') ||
      (choice1 === 'scissors' && choice2 === 'paper') ||
      (choice1 === 'paper' && choice2 === 'rock')
    ) {
      return 1;
    }
    return 2;
  },

  restartGame() {
    this.setData({
      player1Choice: '',
      player2Choice: '',
      player1Confirmed: false,
      player2Confirmed: false,
      showResult: false,
      resultText: '',
      player1Modifying: false,
      player2Modifying: false
    });
  },

  showRules() {
    wx.showModal({
      title: '游戏规则',
      content: '石头胜剪刀，剪刀胜布，布胜石头。双方选择相同则平局。',
      showCancel: false
    });
  },

  goHome() {
    wx.navigateBack();
  }
}); 