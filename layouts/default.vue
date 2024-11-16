<template>
  <div>
    <header class="top-4 p-4 text-green-400 flex justify-between items-center relative">
      <h1 class="text-2xl font-bold">Rektroactive</h1>
      <nav class="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/lotteries" class="hover:underline">Lotteries</NuxtLink>
        <NuxtLink to="/profile" class="hover:underline">Profile</NuxtLink>
      </nav>
      <div class="md:hidden relative">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div v-if="menuOpen" @mouseleave="closeMenu" class="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
          <NuxtLink to="/" class="block px-4 py-2 hover:bg-gray-700">Home</NuxtLink>
          <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-700">Profile</NuxtLink>
          <NuxtLink to="/about" class="block px-4 py-2 hover:bg-gray-700">About</NuxtLink>
          <NuxtLink to="/contact" class="block px-4 py-2 hover:bg-gray-700">Contact</NuxtLink>
        </div>
      </div>
      <div ref="walletContainer" class="relative">
        <ConnectWallet />
      </div>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer class="text-center p-5 border-t border-gray-600 text-gray-400">
      © {{ new Date().getFullYear() }} Rektroactive
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ConnectWallet from '@/components/ConnectWallet.vue';

const walletContainer = ref(null);
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const handleScroll = () => {
  if (walletContainer.value) {
    if (window.scrollY > 0) {
      walletContainer.value.classList.add('fixed', 'top-4', 'right-4');
      walletContainer.value.classList.remove('relative');
    } else {
      walletContainer.value.classList.remove('fixed', 'top-4', 'right-4');
      walletContainer.value.classList.add('relative');
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
header {
  height: 64px; /* Ensure consistent header height */
}
</style>