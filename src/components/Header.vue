<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import defaultAvatar from '@/assets/default-avatar.png';

const userStore = useUserStore();

const showDropdown = ref(false);

// 处理登录
const handleLogin = () => {
  window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23li276DdOmpC29BIR&scope=read:user';
}

// 处理下拉菜单选项
const handleMenuClick = (action: string) => {
  if (action === 'logout') {
    userStore.logout();
  } else if (action === 'feedback') {
    // TODO: 实现意见反馈逻辑
  }
}
</script>

<template>
  <header class="header">
    <div class="header-left">
      <img src="@/assets/logo.png" alt="Logo" class="logo">
      <h1 class="project-name">优秀代码合集</h1>
    </div>

    <div class="header-right" @mouseleave="showDropdown = false">
      <div class="user-info" @mouseenter="showDropdown = true">
        <img :src="userStore.getUserInfo('avatar') || defaultAvatar" alt="用户头像" class="avatar">
        <span class="username">{{ userStore.getUserInfo('name') || '游客' }}</span>
      </div>

      <!-- 未登录时点击头像登录 -->
      <div v-if="!userStore.isLoggedIn" class="login-overlay" @click="handleLogin">
        <span>点击登录</span>
      </div>

      <!-- 登录后的下拉菜单 -->
      <div v-if="userStore.isLoggedIn && showDropdown" class="dropdown-menu">
        <div class="menu-item" @click="handleMenuClick('profile')">个人中心</div>
        <div class="menu-item" @click="handleMenuClick('feedback')">意见反馈</div>
        <div class="menu-item" @click="handleMenuClick('logout')">退出登录</div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
}

.project-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.header-right {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  color: #333;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.login-overlay:hover {
  opacity: 1;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;
}

.menu-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}
</style>