<template>
  <div class="page-header">
    <div class="user-greeting">
      <div class="avatar"><i class="fa-solid fa-user"></i></div>
      <div>
        <div class="greeting-prefix">Olá,</div>
        <div class="greeting-name">{{ name }}</div>
      </div>
    </div>
    <div class="ucs-logo">
      <svg class="ucs-logo-icon" viewBox="0 0 60 59" xmlns="http://www.w3.org/2000/svg">
        <image 
          x="-11" 
          y="3" 
          width="80" 
          height="70"
          :href="logoUcsUrl" 
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({ name: { type: String, default: 'Gabriel' } })

import logoUcsUrl from '../assets/images/logo-ucs.png'
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.user-greeting {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 20px;
}
.greeting-prefix {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1;
}
.greeting-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
}
.ucs-logo-icon {
  width: 100px;
  height: 79px;
}
</style>
