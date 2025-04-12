<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import http from '@/utils/myFetch';
import { useUserStore } from '@/stores/user';
import { COOKIE_TOKEN_KEY } from '@/utils/constants';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (!code) {
    console.error('未找到code参数');
    return;
  }

  try {
    const result = await http.get(`/api/user/login?code=${code}`);
    if (result.code !== 200) {
      ElMessage.error(result.message);
      return router.push('/');
    }
    userStore.setUserInfo(result.result);
    Cookies.set(COOKIE_TOKEN_KEY, result.result.token, { expires: 30 });
    router.replace('/');
  } catch (error) {
    console.error('登录失败:', error);
  }
})
</script>

<template>
  <div class="tip">登录中...</div>
</template>

<style scoped>
.tip {
  text-align: center;
  padding: 20px;
  font-size: 16px;
}
</style>
