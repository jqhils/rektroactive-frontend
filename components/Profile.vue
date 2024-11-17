<template>
  <section class="profile p-6 rounded-lg border border-gray-700 text-left text-gray-300 shadow-lg text-left text-gray-300">
    <h2 class="text-3xl font-bold text-green-400 mb-5">Profile</h2>
    <div class="wallet-info mb-8">
      <h3 class="text-2xl font-semibold text-gray-100">Wallet Information</h3>
      <p class="mt-2"><strong>Address:</strong> {{ truncatedAddress }}</p>
      <p class="mt-2"><strong>Balance:</strong> {{ balance }} ETH</p>
    </div>
    <div class="degenerate-facts space-y-8">
      <h3 class="text-2xl font-semibold text-gray-100">Biggest Fumbles</h3>
      <div class="fact">
        <p><strong>Biggest Loss:</strong> {{ biggestLoss }} ETH on {{ biggestLossCoin }}</p>
      </div>
      <div class="fact">
        <p><strong>Most Hilarious Trade:</strong> Bought {{ hilariousTradeAmount }} {{ hilariousTradeCoin }} at the peak</p>
      </div>
      <div class="fact">
        <p><strong>Most Regretted Sale:</strong> Sold {{ regrettedSaleAmount }} {{ regrettedSaleCoin }} just before it skyrocketed</p>
      </div>
      <div class="fact">
        <p><strong>Number of Rug Pulls:</strong> {{ rugPulls }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVueDapp } from '@vue-dapp/core';
import { ethers } from 'ethers';

const { wallet, isConnected } = useVueDapp();

const truncatedAddress = computed(() => {
  if (wallet.address) {
    return `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
  }
  return '';
});

const balance = ref('0.00');
const biggestLoss = ref('0.00');
const biggestLossCoin = ref('SHIB');
const hilariousTradeAmount = ref('1000000');
const hilariousTradeCoin = ref('DOGE');
const regrettedSaleAmount = ref('500000');
const regrettedSaleCoin = ref('PEPE');
const rugPulls = ref(3);

const fetchBalance = async () => {
  if (isConnected.value && wallet.address && wallet.provider) {
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const walletBalance = await provider.getBalance(wallet.address);
    balance.value = ethers.utils.formatEther(walletBalance);
  }
};

onMounted(() => {
  if (isConnected.value) {
    fetchBalance();
  }
});
</script>

<style scoped>
.profile {
  background-color: #1f2937; /* Tailwind gray-800 */
}
.fact {
  border-left: 4px solid #10b981; /* Tailwind green-400 */
  padding-left: 15px;
}
</style>