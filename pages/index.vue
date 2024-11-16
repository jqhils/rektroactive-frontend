<template>
  <div class="home text-center mx-auto p-5 max-w-4xl">
    <Banner />
    <header class="p-8 pt-16 border-b border-gray-600 text-green-400">
      <h1 class="text-5xl font-bold">Rektroactive</h1>
      <p class="text-2xl mt-2">Your past degenerate plays, your future lottery wins.</p>
    </header>
    <main class="my-10">
      <HeroSection />
      <HowItWorks />
      <Features class="mt-10" />
      <CallToAction class="mt-10" />
      <Testimonials class="mt-10" />
      <!-- <Partners class="mt-10" /> -->
      <Faq class="mt-10" />
    </main>
    <footer class="p-5 border-t border-gray-600 text-gray-400">
      <p>&copy; 2023 Rektroactive</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  font-family: 'Courier New', Courier, monospace;
}
</style>
