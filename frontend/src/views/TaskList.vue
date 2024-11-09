<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import Task from '@/components/Task.vue'
import { AlertCircle } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const taskStore = useTaskStore()
const { tasks, completedTasks, pendingTasks, error, getAllCount, getCompletedCount, getPendingCount } = storeToRefs(taskStore)

async function onDelete(id: number) {
  await taskStore.deleteTask(id)

  toast({
    description: 'Task successfully deleted!',
  })
}

async function markAsCompleted(id: number) {
  await taskStore.setStatus(id, true)

  toast({
    description: 'Task successfully completed!',
  })
}

async function markAsPending(id: number) {
  await taskStore.setStatus(id, false)

  toast({
    description: 'Task mark as pending!',
  })
}

</script>

<template>

  <div v-if="error" class="flex flex-col gap-4 w-full lg:w-2/3">
    <Alert variant="destructive">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>
  </div>

  <Tabs v-else default-value="all" class="w-full lg:w-2/3">
    <TabsList class="grid w-full grid-cols-1 md:grid-cols-3">
      <TabsTrigger value="all">
        All
      </TabsTrigger>
      <TabsTrigger value="completed">
        completed
      </TabsTrigger>
      <TabsTrigger value="pending">
        Pending
      </TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>
            You have {{ getAllCount }} {{ getAllCount > 1 ? 'tasks' : 'task' }}.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="flex flex-col gap-4 w-full">
            <Task v-for="task in tasks" :key="task.id" :task="task" :onDelete="onDelete" :onComplete="markAsCompleted" :onPending="markAsPending" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="completed">
      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription>
            You have {{ getCompletedCount }} completed {{ getCompletedCount > 1 ? 'tasks' : 'task' }}.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="flex flex-col gap-4 w-full">
            <Task v-for="task in completedTasks" :key="task.id" :task="task" :onDelete="onDelete" :onComplete="markAsCompleted" :onPending="markAsPending" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="pending">
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>
            You have {{ getPendingCount }} pending {{ getPendingCount > 1 ? 'tasks' : 'task' }}.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="flex flex-col gap-4 w-full">
            <Task v-for="task in pendingTasks" :key="task.id" :task="task" :onDelete="onDelete"
              :onComplete="markAsCompleted" :onPending="markAsPending" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

</template>
