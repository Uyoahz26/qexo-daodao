<template>
  <view>
    <uni-nav-bar
      dark
      :fixed="true"
      shadow
      background-color="#007AFF"
      status-bar
      left-icon="left"
      left-text="返回"
      title="自定义导航栏"
      @click-left="back"
    />
    <uni-card is-full :is-shadow="false">
      <text class="uni-h6">
        本asfdsadf导航栏为自定义组件，并非原生导航栏。除非原生导航栏无法满足需求，否则不推荐使用自定义导航栏组件。具体参考https://ask.dcloud.net.cn/article/34921
      </text>
    </uni-card>
  </view>
  <uni-notice-bar
    show-icon
    scrollable
    text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
  />
  <u-table>
    <u-tr>
      <u-th>学校</u-th>
      <u-th>班级</u-th>
      <u-th>年龄</u-th>
    </u-tr>
    <u-tr>
      <u-td>浙江大学</u-td>
      <u-td>二年级</u-td>
      <u-td>22</u-td>
    </u-tr>
    <u-tr>
      <u-td>清华大学</u-td>
      <u-td>05班</u-td>
      <u-td>20</u-td>
    </u-tr>
  </u-table>
  <u-input v-model="value" type="text" border />
  <uni-section title="输入框示例" type="line" padding>
    <view class="dialog-box">
      <text class="dialog-text">输入内容：{{ value }}</text>
    </view>
    <button class="button" type="primary" @click="inputDialogShow">
      <text class="button-text">输入对话框</text>
    </button>
  </uni-section>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area w-200">
      <text class="title">{{ title }}</text>
    </view>
    <uni-badge size="small" :text="100" absolute="rightBottom" type="primary">
      <button type="default" @click="gonext">右下</button>
    </uni-badge>
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="purple"></uni-badge>
    <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
    <qt-asd ref="children" :form="formData" />
  </view>
  <view>
    <uni-forms ref="form" :model-value="formData" :rules="rules">
      <uni-forms-item label="姓名" name="name">
        <uni-easyinput v-model="formData.name" type="text" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="email">
        <uni-easyinput v-model="formData.email" type="text" placeholder="请输入用户名" />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="submit">Submit</button>
    <button class="mini-btn" form-type="reset" type="warn" size="mini" @click="clear">Clear</button>
  </view>
  <view>
    <uni-rate></uni-rate>
    <!-- 这里会显示一个五角星，并且点击后会自动亮星 -->
  </view>
  <uni-section title="基础用法" type="line">
    <uni-list>
      <uni-list-item title="列表文字" />
      <uni-list-item title="列表文字" right-text="右侧文字" />
      <uni-list-item title="列表文字" note="列表描述信息" right-text="右侧文字" />
    </uni-list>
  </uni-section>

  <view>
    <!-- 输入框示例 -->
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="输入内容"
        value="1433223!"
        placeholder="请输入内容"
        @confirm="dialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    name: 'HomePage',
  };
</script>

<script setup>
  import { useCommonStore } from '@/store/modules/common';
  const commonStore = useCommonStore();

  const title = ref('Hello');
  const formData = reactive({
    name: '',
    email: '',
  });
  const inputClose = ref(null);
  const inputDialog = ref(null);
  const form = ref(null);
  const children = ref(null);
  const value = ref('');
  const rules = ref({
    // 对name字段进行必填验证
    name: {
      rules: [
        {
          required: true,
          errorMessage: '请输入姓名',
        },
        {
          minLength: 3,
          maxLength: 5,
          errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
        },
      ],
    },
    // 对email字段进行必填验证
    email: {
      rules: [
        {
          required: true,
          errorMessage: '输入用户名',
        },
        {
          format: 'email',
          errorMessage: '请输入正确的邮箱地址',
        },
      ],
    },
  });
  function submit() {
    form.value
      .validate()
      .then(res => {
        console.log('表单数据信息：', res);
        console.log('res.name', res.name);
        console.log('res.email', res.email);
        children.value.dialogToggle();
      })
      .catch(err => {
        console.log('表单错误信息：', err);
      });
    console.log('🚀 ~ file: index.vue ~ line 102 ~ submit ~ form.value', form.value);
  }

  function clear() {
    // form.value.value();
    uni.showLoading({
      title: '加载中',
    });
  }

  function inputDialogShow() {
    inputDialog.value.open();
  }

  function dialogInputConfirm(val) {
    uni.showLoading({
      title: '1.5秒后跳转',
    });

    setTimeout(() => {
      uni.hideLoading();
      console.log(val);
      value.value = val;
      // 关闭窗口后，恢复默认内容
      inputDialog.value.close();
      uni.switchTab({
        url: `/pages/page2/page2?value=${val}`,
      });
    }, 1500);
  }
  console.log(
    'uni.getSystemInfoSync("statusBarHeight"): ',
    uni.getSystemInfoSync('statusBarHeight'),
  );
  function back() {
    uni.navigateTo({
      url: `/pages1/page12/page2?value=1433223`,
    });
  }
  function gonext() {
    uni.navigateTo({
      url: '/pages1/page12/page3',
    });
  }

  function init() {
    console.log('commonStore.baseUrl', commonStore.baseUrl);
    console.log('commonStore.baseUrl', !commonStore.baseUrl);
    if (!commonStore.baseUrl) {
      uni.navigateTo({
        url: `/pages/login/index`,
      });
    }
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
