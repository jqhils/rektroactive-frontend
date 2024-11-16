<template>
  <div
    class="relative flex items-center p-2 rounded-full
      "
    :class="{ 'bg-gray-700/50': showAddress,
      'bg-transparent': !isConnected,
      'hover:cursor-pointer': isConnected,
      'hover:bg-gray-700': isConnected && showAddress }"
  >
    <template v-if="isConnected">
      <div @click="toggleDropdown" class="flex items-center p-1 rounded-md">
        <img 
          src="~/assets/img/avatar.jpeg"
          alt="Avatar" 
          class="w-8 h-8 rounded-full mr-2 cursor-pointer"
          :class="{'w-10 h-10': !showAddress}"
        >
        <p v-if="showAddress" class="text-green-400 font-mono mr-4 select-none">{{ truncatedAddress }}</p>
      </div>
      <div 
        v-if="showDropdown" 
        @mouseleave="hideDropdown" 
        class="absolute top-12 z-[9999] right-0 bg-gray-800 text-white p-4 mt-4 rounded-lg shadow-lg z-10"
      >
        <p class="mb-2">Account: {{ wallet.address }}</p>
        <p class="mb-2">Balance: {{ parseFloat(wallet.balance || balance).toFixed(4) }} ETH</p>
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
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { ethers } from 'ethers'; // Ethers.js v6 import
import { useVueDapp } from '@vue-dapp/core';
import { VueDappModal, useVueDappModal } from '@vue-dapp/modal';
import '@vue-dapp/modal/dist/style.css';

const isClient = typeof window !== 'undefined';

const { isConnected, wallet, disconnect } = useVueDapp();
const modal = useVueDappModal();

// const avatarUrl = 'https://via.placeholder.com/32'; // Replace with actual avatar URL or logic to generate avatar
const avatarUrl =  '~/assets/img/avatar.jpeg'

const truncatedAddress = computed(() => {
  if (wallet.address) {
    return `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
  }
  return '';
});

const screenWidth = ref(isClient ? window.innerWidth : 0);

const updateScreenWidth = () => {
  if (isClient) {
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
  if (isClient) {
    window.addEventListener('resize', updateScreenWidth);
  }
});

onUnmounted(() => {
  if (isClient) {
    window.removeEventListener('resize', updateScreenWidth);
  }
});

function onClickConnectButton() {
  if (isConnected.value) {
    disconnect();
  } else {
    modal.open();
  }
}

// Create a separate reactive state for the balance
const balance = ref(null);

// Fetch balance using ethers.js v6
const fetchBalance = async () => {
  try {
    if (isConnected.value && wallet.address && wallet.provider) {
      // Use BrowserProvider in ethers v6
      const ethersProvider = new ethers.BrowserProvider(wallet.provider.ethereum || wallet.provider);

      // Fetch the balance (BigInt by default in ethers v6)
      const walletBalance = await ethersProvider.getBalance(wallet.address);

      // Format balance to Ether and store in reactive state
      balance.value = ethers.formatEther(walletBalance); // Use ethers.formatEther directly
    }
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
  }
};

// Watch for wallet connection and fetch balance
onMounted(() => {
  if (isConnected.value) {
    fetchBalance();
  }
});

watchEffect(() => {
  if (isConnected.value) {
    fetchBalance();
  }
});
</script>




<style scoped>
/* Additional styles can be added here if needed */
</style>