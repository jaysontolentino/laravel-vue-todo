<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { onMounted } from 'vue';
import { useTaskStore } from './stores/taskStore'
import Toaster from '@/components/ui/toast/Toaster.vue'

const taskStore = useTaskStore()

onMounted(() => {
  console.log("App on mounted...")
  taskStore.loadTasks()
})

</script>

<template>
  <div class="h-full min-h-screen bg-sky-50">
    <Header />

    <main class="container mx-auto flex justify-center mt-8 py-6">
      <RouterView />
    </main>
  </div>
  <Toaster />
</template>