<template>
  <section class="lotteries p-6 rounded-lg border border-gray-700 text-left text-gray-300">
    <h2 class="text-3xl font-bold text-green-400 mb-4">Active Lotteries</h2>
    <div class="lottery-list mb-6 border-b border-gray-700 pb-6">
      <h3 class="text-xl font-semibold text-gray-100">Select a Lottery</h3>
      <ul class="space-y-3 mt-3">
        <li v-for="lottery in paginatedLotteries" :key="lottery.id" @click="selectLottery(lottery)" class="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 border border-gray-700" :class="{ 'bg-gray-700': selectedLottery && selectedLottery.id === lottery.id }">
          <div class="flex justify-between items-center">
            <div>
              <p><strong>Ticker:</strong> ${{ lottery.ticker }}</p>
              <p><strong>Last Registration Date:</strong> {{ formatDate(lottery.lastRegistrationDate) }} UTC</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-400">Block Height</p>
              <p class="text-lg font-semibold">{{ formatNumber(lottery.blockHeight) }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination mt-4 flex justify-center space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>
    <div v-if="selectedLottery" class="lottery-details space-y-6 border border-gray-700 p-5 rounded-lg mt-6">
      <h3 class="text-xl font-semibold text-gray-100">Lottery Details</h3>
      <div class="detail">
        <p><strong>Ticker:</strong> ${{ selectedLottery.ticker }}</p>
        <p><strong>Block Height:</strong> {{ formatNumber(selectedLottery.blockHeight) }}</p>
        <p><strong>Last Registration Date:</strong> {{ formatDate(selectedLottery.lastRegistrationDate) }} UTC</p>
        <p><strong>Prize Pool:</strong> {{ formatNumber(selectedLottery.prizePool) }} {{ selectedLottery.ticker }}</p>
      </div>
      <div class="participation-form mt-6 border-t border-gray-700 pt-5">
        <h3 class="text-xl pb-2 font-semibold text-gray-100">Eligibility</h3>
        <div class="flex items-center space-x-2">
          <p class="block text-gray-100">Amount of ${{ selectedLottery.ticker }} you owned at block {{ formatNumber(selectedLottery.blockHeight) }}:</p>
          <p class="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400">{{ userOwnedAmount }}</p>
        </div>
        <div class="pt-4 px-4">
          <button
            type="submit"
            :disabled="userOwnedAmount <= 0"
            class="w-full bg-green-500 hover:bg-green-400 
            text-white font-bold px-4 py-2 rounded-md 
            transition-transform transform hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-green-300 
            disabled:opacity-50 disabled:cursor-not-allowed"
            @click="participateInLottery"
          >
            Enter Lottery
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const lotteries = ref([
  { id: 1, ticker: 'PEPE', currentShares: 13000000, lastRegistrationDate: '2023-12-01T12:00:00Z', prizePool: 69420000, blockHeight: 15000000 },
  { id: 2, ticker: 'SHIB', currentShares: 67000000, lastRegistrationDate: '2023-12-15T12:00:00Z', prizePool: 13371337, blockHeight: 17000000 },
  { id: 3, ticker: 'DOGE', currentShares: 42000000, lastRegistrationDate: '2024-01-01T12:00:00Z', prizePool: 42000000, blockHeight: 18000000 },
  { id: 4, ticker: 'ADA', currentShares: 50000000, lastRegistrationDate: '2024-01-15T12:00:00Z', prizePool: 25000000, blockHeight: 19000000 },
  { id: 5, ticker: 'BTC', currentShares: 21000000, lastRegistrationDate: '2024-02-01T12:00:00Z', prizePool: 10000000, blockHeight: 20000000 },
  { id: 6, ticker: 'ETH', currentShares: 115000000, lastRegistrationDate: '2024-02-15T12:00:00Z', prizePool: 50000000, blockHeight: 21000000 },
]);

const selectedLottery = ref(null);
const participationAmount = ref('');
const userOwnedAmount = ref(0); // Mock data for the amount of memecoin owned by the user at the historic block height
const currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() => Math.ceil(lotteries.value.length / itemsPerPage));

const paginatedLotteries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return lotteries.value.slice(start, end);
});

const selectLottery = (lottery) => {
  selectedLottery.value = lottery;
  // Mock logic to set the userOwnedAmount based on the selected lottery
  userOwnedAmount.value = lottery.id === 2 ? 100 : 0; // Example: 100 for SHIB, 0 for others
};

const participateInLottery = () => {
  if (selectedLottery.value) {
    alert(`Entered ${participationAmount.value} ETH into ${selectedLottery.value.ticker}`);
    participationAmount.value = '';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().replace('T', ' ').replace('Z', '');
};

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.lotteries {
  background-color: #1f2937; /* Tailwind gray-800 */
}
.lottery-list li {
  border-left: 4px solid transparent;
}
.lottery-list li:hover,
.lottery-list li.bg-gray-700 {
  border-left-color: #10b981; /* Tailwind green-400 */
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>