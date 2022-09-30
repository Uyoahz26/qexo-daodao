let count = 0;

export const hideLoading = () => {
  if (count <= 0) return;

  count--;

  if (count === 0) {
    uni.hideLoading();
  }
};

export const showLoading = (title = '加载中...') => {
  if (count === 0) {
    uni.showLoading({
      title,
      mask: true,
    });

    if (count > 0) {
      uni.hideLoading();
    }
  }

  count++;
};
