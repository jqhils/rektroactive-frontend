<template>
  <div>
    <header class="p-4 text-green-400 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Rektroactive</h1>
      <div ref="walletContainer" class="relative">
        <ConnectWallet class="absolute" />
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

const handleScroll = () => {
  if (walletContainer.value) {
    const headerHeight = walletContainer.value.parentElement.offsetHeight;
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
.home {
  font-family: 'Courier New', Courier, monospace;
}
</style>