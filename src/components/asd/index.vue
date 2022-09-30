<template>
  <view>1111</view>
  <button class="button popup-success" @click="dialogToggle('success')">
    <text class="button-text success-text">成功</text>
  </button>
  <view>
    <!-- 提示窗示例 -->
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        :type="msgType"
        cancel-text="关闭"
        confirm-text="同意"
        :title="props?.title || '通知'"
        :content="props?.form?.name + '\n' + props?.form?.email || '欢迎使用 uni-popup!'"
        @confirm="dialogConfirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    name: 'QtAsd',
  };
</script>
<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default() {
        return '';
      },
    },
  });
  let msgType = ref('success');
  let alertDialog = ref(null);
  const dialogConfirm = () => {
    console.log('close');
  };
  const dialogToggle = type => {
    msgType.value = type;
    console.log('formData', props);
    alertDialog.value.open();
  };

  defineExpose({
    dialogToggle,
  });
</script>
