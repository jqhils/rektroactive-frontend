<template>
  <div
    class="relative flex items-center p-2 rounded-full shadow-lg
      bg-gray-700/50"
    :class="{ 'bg-transparent': !isConnected,
      'hover:cursor-pointer': isConnected,
      'hover:bg-gray-700': isConnected }"
  >
    <template v-if="isConnected">
      <div @click="toggleDropdown" class="flex items-center p-1 rounded-md">
        <img 
          :src="avatarUrl" 
          alt="Avatar" 
          class="w-8 h-8 rounded-full mr-2 cursor-pointer" 
        >
        <p v-if="showAddress" class="text-green-400 font-mono mr-4 select-none">{{ truncatedAddress }}</p>
      </div>
      <div 
        v-if="showDropdown" 
        @mouseleave="hideDropdown" 
        class="absolute top-12 right-0 bg-gray-800 text-white p-4 mt-4 rounded-lg shadow-lg z-10"
      >
        <p class="mb-2">Account: {{ wallet.address }}</p>
        <p class="mb-2">Balance: {{ wallet.balance }}</p>
        <div>status: {{ wallet.status }}</div>
        <div>isConnected: {{ isConnected }}</div>
        <div>error: {{ wallet.error }}</div>

        <div v-if="isConnected">
          <div>chainId: {{ wallet.chainId }}</div>
          <div>address: {{ wallet.address }}</div>
        </div>
        <button 
          @click="disconnect" 
          class="bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Disconnect
        </button>
      </div>
    </template>
    <template v-else>
      <button 
        @click="onClickConnectButton" 
        class="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Connect Wallet
      </button>
    </template>
    <VueDappModal dark auto-connect />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useVueDapp } from '@vue-dapp/core';
import { VueDappModal, useVueDappModal } from '@vue-dapp/modal';
import '@vue-dapp/modal/dist/style.css';

const { isConnected, wallet, disconnect } = useVueDapp();
const modal = useVueDappModal();

const avatarUrl = 'https://via.placeholder.com/32'; // Replace with actual avatar URL or logic to generate avatar

const truncatedAddress = computed(() => {
  if (wallet.address) {
    return `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
  }
  return '';
});

const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
  }
};

const showAddress = computed(() => screenWidth.value >= 768); // Adjust the width as needed

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const hideDropdown = () => {
  showDropdown.value = false;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateScreenWidth);
  }
  console.log(wallet);
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScreenWidth);
  }
});

function onClickConnectButton() {
  if (isConnected.value) {
    disconnect();
  } else {
    modal.open();
    hideDropdown();
  }
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>