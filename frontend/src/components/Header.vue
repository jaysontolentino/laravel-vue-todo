<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NewTaskDialog from './NewTaskDialog.vue'
</script>

<template>
    <header class="flex bg-white border">
        <div class="container mx-auto flex justify-between py-6">
            <div class="logo">
                <RouterLink class="font-bold text-xl text-sky-500" to="/">Todo App</RouterLink>
            </div>

            <nav class="flex gap-4">
                <NewTaskDialog />
            </nav>
        </div>
    </header>
</template>