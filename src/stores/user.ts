import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { COOKIE_TOKEN_KEY } from '@/utils/constants';

// 定义用户信息接口
interface UserInfo {
  name?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

export const useUserStore = defineStore('user', () => {
  // 用户信息状态
  const userInfo = ref<UserInfo>({});

  // 是否已登录的计算属性
  const isLoggedIn = computed(() => !!userInfo.value.token);

  // 获取用户信息
  function getUserInfo(key: keyof UserInfo) {
    return userInfo.value[key];
  }

  // 设置用户信息
  function setUserInfo(info: UserInfo) {
    userInfo.value = { ...userInfo.value, ...info };
  }

  // 清除用户信息（登出时使用）
  function logout() {
    userInfo.value = {};
    Cookies.remove(COOKIE_TOKEN_KEY);
  }

  // 更新用户信息的部分字段
  function updateUserInfo(field: keyof UserInfo, value: any) {
    if (field in userInfo.value) {
      userInfo.value[field] = value;
    }
  }

  return {
    userInfo,
    isLoggedIn,
    getUserInfo,
    setUserInfo,
    updateUserInfo,
    logout,
  };
});
