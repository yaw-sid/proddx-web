<template>
  <footer>
    <p>&copy;Proddx - {{ new Date().getFullYear() }}</p>
  </footer>
</template>

<style scoped>
footer {
  @apply bg-gray-100 p-6;
}

p {
  @apply text-center;
}
</style>