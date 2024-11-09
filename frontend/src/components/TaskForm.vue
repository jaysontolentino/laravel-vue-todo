<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Textarea from './ui/textarea/Textarea.vue'
import { useTaskStore, type Task } from '@/stores/taskStore'

interface Props {
    action: 'add' | 'edit';
    task?: Task;
    onSaveCb?: () => void
}

const { action, task, onSaveCb } = defineProps<Props>()

const taskStore = useTaskStore()

const formSchema = toTypedSchema(z.object({
    title: z.string().min(3).max(50).default(task ? task.title : ''),
    description: z.string().default(task ? task.description : '')
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (formData) => {
    if(action === 'add') {
        await taskStore.addTask(formData)
    } else if(action === 'edit' && task) {
        await taskStore.updateTask(task.id, formData)
    }

    onSaveCb && onSaveCb();
})
</script>

<template>
    <form class="grid gap-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
            <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Task Title..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Task description here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <Button type="submit">
            Save
        </Button>
    </form>
</template>