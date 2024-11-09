<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import TaskForm from './TaskForm.vue'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const isOpenDialog = ref(false)

function saveCallback() {
    isOpenDialog.value = false
    toast({
        description: 'New task created!',
    })
}
</script>

<template>
    <Dialog v-model:open="isOpenDialog">
        <DialogTrigger as-child>
            <Button class="bg-sky-600">
                Create Task
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                    Add new todo. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-4 py-4">
                <TaskForm action="add" :onSaveCb="saveCallback" />
            </div>
        </DialogContent>
    </Dialog>
</template>