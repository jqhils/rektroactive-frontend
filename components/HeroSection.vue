<template>
  <div class="hero p-10 rounded-lg shadow-lg text-center text-gray-300">
    <div class="illustration mx-auto mb-6">
      <img
        src="~/assets/img/crypto-machine.webp"
        alt="Degenerate Crypto Machine"
        class="rounded-lg shadow-lg"
      />
    </div>
    <h2 class="text-4xl font-bold text-green-400 mb-3">A Second Chance at Memecoin Glory</h2>
    <p class="text-lg mb-6">
      Fumbled your bag? Sold your memecoins too early? Don’t let your story end there. 
      Rektroactive gives you a chance to redeem your past plays, recoup your pride, and 
      join a community of fellow degens in turning regrets into rewards.
    </p>
    <button
      class="bg-green-500 hover:bg-green-400 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      @click="connectWallet"
    >
      Connect Wallet & Claim Your Redemption
    </button>
  </div>
</template>

<script setup>
function connectWallet() {
  console.log("Wallet connected! Ready to redeem your past mistakes.");
}
</script>

<style scoped>
.hero img {
  max-width: 100%;
}
</style>
