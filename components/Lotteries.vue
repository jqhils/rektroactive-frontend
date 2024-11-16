<template>
  <section class="lotteries p-6 rounded-lg border border-gray-700 text-left text-gray-300">
    <h2 class="text-3xl font-bold text-green-400 mb-4">Active Lotteries</h2>
    <div class="lottery-list mb-6 border-b border-gray-700 pb-6">
      <h3 class="text-xl font-semibold text-gray-100">Select a Lottery</h3>
      <ul class="space-y-3 mt-3">
        <li v-for="lottery in paginatedLotteries" :key="lottery.id" @click="selectLottery(lottery)" class="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 border border-gray-700" :class="{ 'bg-gray-700': selectedLottery && selectedLottery.id === lottery.id }">
          <p><strong>Ticker:</strong> {{ lottery.ticker }}</p>
          <p><strong>Last Registration Date:</strong> {{ formatDate(lottery.lastRegistrationDate) }} UTC</p>
        </li>
      </ul>
      <div class="pagination mt-4 flex justify-center space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Prev</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Next</button>
      </div>
    </div>
    <div v-if="selectedLottery" class="lottery-details space-y-6 border border-gray-700 p-5 rounded-lg mt-6">
      <h3 class="text-xl font-semibold text-gray-100">Lottery Details</h3>
      <div class="detail">
        <p><strong>Ticker:</strong> {{ selectedLottery.ticker }}</p>
        <p><strong>Last Registration Date:</strong> {{ formatDate(selectedLottery.lastRegistrationDate) }} UTC</p>
        <p><strong>Prize Pool:</strong> {{ selectedLottery.prizePool }} ETH</p>
        <p><strong>Description:</strong> {{ selectedLottery.description }}</p>
      </div>
      <div class="participation-form mt-6 border-t border-gray-700 pt-5">
        <h3 class="text-xl font-semibold text-gray-100">Participate in Lottery</h3>
        <form @submit.prevent="participateInLottery">
          <div class="mb-3">
            <label for="amount" class="block text-gray-100">Amount to Enter (ETH):</label>
            <input type="number" id="amount" v-model="participationAmount" class="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400" required>
          </div>
          <button type="submit" class="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300">Enter Lottery</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const lotteries = ref([
  { id: 1, ticker: 'LOTTO1', lastRegistrationDate: '2023-12-01T12:00:00Z', prizePool: '10', description: 'A chance to win big with LOTTO1!' },
  { id: 2, ticker: 'LOTTO2', lastRegistrationDate: '2023-12-15T12:00:00Z', prizePool: '20', description: 'Join LOTTO2 for a massive prize pool!' },
  { id: 3, ticker: 'LOTTO3', lastRegistrationDate: '2023-12-31T12:00:00Z', prizePool: '30', description: 'Don\'t miss out on LOTTO3!' },
  { id: 4, ticker: 'LOTTO4', lastRegistrationDate: '2024-01-15T12:00:00Z', prizePool: '40', description: 'A chance to win big with LOTTO4!' },
  { id: 5, ticker: 'LOTTO5', lastRegistrationDate: '2024-01-31T12:00:00Z', prizePool: '50', description: 'Join LOTTO5 for a massive prize pool!' },
  { id: 6, ticker: 'LOTTO6', lastRegistrationDate: '2024-02-15T12:00:00Z', prizePool: '60', description: 'Don\'t miss out on LOTTO6!' },
]);

const selectedLottery = ref(null);
const participationAmount = ref('');
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
</style>