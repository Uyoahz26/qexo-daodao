<template>
  <view>
    <img :src="user.img" alt="" style="width: 30%" />
    {{ user.name }}
    <uni-nav-bar
      dark
      :fixed="true"
      shadow
      background-color="#007AFF"
      status-bar
      left-icon="left"
      left-text="返回"
      title="邓丽"
      @click-left="back"
    />
    <u-button type="primary" @click="login">主要按钮</u-button>
    <uni-card is-full :is-shadow="false">
      <text class="uni-h6">
        本asfdsadf导航栏为自定义组件，并非原生导航栏。除非原生导航栏无法满足需求，否则不推荐使用自定义导航栏组件。具体参考https://ask.dcloud.net.cn/article/34921
      </text>
    </uni-card>
  </view>
</template>

<script>
  export default {
    name: 'LoginPage',
  };
</script>

<script setup>
  const user = reactive({
    name: '',
    img: '',
  });
  function back() {
    uni.navigateTo({
      url: `/pages1/page12/page2?value=1433223`,
    });
  }
  function login() {
    uni.login({
      provider: 'weixin',
      success: function (loginRes) {
        console.log('loginRes: ', loginRes);
        uni.login({
          provider: 'weixin',
          success: function (loginRes) {
            console.log('loginRes', loginRes.authResult);
            // 获取用户信息
          },
        });
      },
    });
    uni.getUserProfile({
      desc: 'sdfsafdsdf',
      lang: 'zh_CN',
      success: function (infoRes) {
        user.name = infoRes.userInfo.nickName;
        user.img = infoRes.userInfo.avatarUrl;
        console.log('infoRes: ', infoRes.userInfo);
        console.log('用户昵称为：' + infoRes.userInfo.nickName);
      },
    });
  }
  function init() {
    login();
    uni.getUserProfile({
      desc: '就。。。用在页面展示',
      lang: 'zh_CN',
      success: function (userInfo) {
        console.log('userInfo', userInfo);
      },
    });
  }
  init();
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo {
    height: 200rpx;
    width: 200rpx;
  }
  .text-area {
    display: flex;
    justify-content: center;
  }
  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
  .toTop {
    bottom: calc(var(--window-bottom) + 10px);
  }
</style>
