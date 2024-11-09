<script setup lang="ts">
import { useTaskStore, type Task } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { EllipsisVertical, Trash2, CheckIcon, Edit, Redo2 } from 'lucide-vue-next'
import TaskForm from './TaskForm.vue'
import { useToast } from './ui/toast'


interface Props {
    task: Task;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
    onPending: (id: number) => void;
}

const { task, onDelete,onComplete, onPending } = defineProps<Props>()

const isOpenDialog = ref(false)
const { toast } = useToast()
const taskStore = useTaskStore()

const { getTaskById } = storeToRefs(taskStore)

function openEditDialog() {
    isOpenDialog.value = true
}

function saveCallback() {
    isOpenDialog.value = false
    toast({
        description: 'Task successfully updated!',
    })
}

</script>

<template>
    <Card>
        <CardHeader class="flex flex-row justify-between">
            <CardTitle class="text-sky-700">{{ task.title }}</CardTitle>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical class="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem v-if="task.completed" @click="onPending(task.id)">
                        <Redo2 class="w-4 h-4" /> Mark as pending
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem v-else @click="onComplete(task.id)">
                        <CheckIcon class="w-4 h-4" /> Mark as completed
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem @click="openEditDialog">
                        <Edit class="w-4 h-4" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem class="text-red-500" @click="onDelete(task.id)">
                        <Trash2 class="w-4 h-4 " /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>

        <CardContent class="space-y-2">
            {{ task.description }}
        </CardContent>

        <CardFooter>
            <span class="text-xs font-bold flex gap-2 ">
                <span class=" text-slate-600">Status:</span>
                <span v-if="task.completed" class="text-green-500">Completed</span>
                <span v-else class="text-orange-500">Pending</span>
            </span>
        </CardFooter>
    </Card>

    <Dialog v-model:open="isOpenDialog">
        <DialogContent class="sm:max-w-[525px]">
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                    Update todo. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-4 py-4">
                <TaskForm :task="getTaskById(task.id)" action="edit" :onSaveCb="saveCallback" />
            </div>
        </DialogContent>
    </Dialog>
</template>