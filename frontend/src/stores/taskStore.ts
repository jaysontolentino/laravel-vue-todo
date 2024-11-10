import { defineStore } from "pinia"
import axios from "axios"

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

type AddTaskPayload = {
  title: string;
  description?: string;
}

type UpdateTaskPayload = {
  title?: string;
  description?: string;
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: "",
  }),
  getters: {
    allTasks(state) {
      return state?.tasks
    },
    completedTasks(state) {
      return state?.tasks.filter((task: Task) => task?.completed)
    },
    pendingTasks(state) {
      return state?.tasks.filter((task: Task) => !task.completed)
    },
    getTaskById(state) {
      return (taskId: number) => state?.tasks.find(task => task.id === taskId)
    },
    getAllCount(state)  {
      return state?.tasks.length
    },
    getCompletedCount(): number {
      return this.completedTasks.length
    },
    getPendingCount(): number {
      return this.pendingTasks.length
    },
    sortedTask(state) {
      return (tasks: Task[], type: 'asc'|'desc' = 'asc') => {
        return tasks.sort((task1, task2) => {
          const date1 = task1.created_at ? new Date(task1.created_at) : new Date()
          const date2 = task2.created_at ? new Date(task2.created_at) : new Date()
  
          if (date1 < date2) {
            return type === 'asc' ? -1 : 1;
          } else if (date1 == date2) {
            return 0;
          } else {
            return type === 'asc' ? 1 : -1;
          }
        }) 
      }
    }
  },
  actions: {
    async loadTasks() {
      try {
        this.error = "";
        this.loading = true;
        const res = await axios.get("/api/v1/tasks")
        this.tasks = res.data.data;
        this.loading = false;
      } catch (error: any) {
        if (error.status === 500) {
          this.error = "Something went wrong. Please check the server."
        } else {
          this.error = error?.message
        }
      } finally {
        this.loading = false;
      }
    },
    async addTask(task: AddTaskPayload) {
      try {
        this.error = "";
        this.loading = true;
        const { data } = await axios.post("/api/v1/tasks", task);

        this.tasks.push(data.data);
        this.loading = false;
      } catch (error: any) {
        this.error = error?.message
      } finally {
        this.loading = false;
      }
    },
    async updateTask(id: number, payload: UpdateTaskPayload) {
      try {
        this.error = "";
        this.loading = true;
        const { data } = await axios.put(`/api/v1/tasks/${id}`, payload);

        //mutate the state if successfully updated in the backend
        if (data.success) {
          this.tasks = this.tasks.map(task => {
            if (id === task.id) {
              return {
                ...task,
                ...data.data
              }
            }

            return task;
          });
        }

        this.loading = false;
      } catch (error: any) {
        this.error = error?.message
      } finally {
        this.loading = false;
      }
    },
    async deleteTask(id: number) {
      try {
        this.error = "";
        this.loading = true;
        await axios.delete(`/api/v1/tasks/${id}`);

        // mutate the state if successfully deleted in the backend.
        this.tasks = this.tasks.filter(task => task.id !== id)
        this.loading = false;
      } catch (error: any) {
        this.error = error?.message
      } finally {
        this.loading = false;
      }
    },
    async setStatus(id: number, status: boolean) {
      try {
        this.error = "";
        this.loading = true;
        const { data } = await axios.patch(`/api/v1/tasks/${id}/complete`, { completed: status });
        //mutate the state if successfully updated in the backend
        if (data.success) {
          this.tasks = this.tasks.map(task => {
            if (id === task.id) {
              return {
                ...task,
                ...data.data
              }
            }

            return task;
          });
        }

        this.loading = false;
      } catch (error: any) {
        this.error = error?.message
      } finally {
        this.loading = false;
      }
    },
  }
})