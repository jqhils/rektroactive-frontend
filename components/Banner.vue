<template>
  <div class="fixed top-0 right-0 p-4">
    <button 
      class="bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      @click="connectWallet"
    >
      Connect Wallet
    </button>
  </div>
</template>

<script setup>
function connectWallet() {
  // Add your web3 wallet connection logic here
  console.log('Connecting to wallet...');
}
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
