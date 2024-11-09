<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

use function Pest\Laravel\json;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks.
     */
    public function index()
    {
        $tasks = Task::all();

        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $task = Task::create($data);

        return response()->json([
            "success" => true,
            "data" => new TaskResource($task)
        ]);
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task)
    {
        $task = Task::findOrFail($task->id);
        return new TaskResource($task);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return response()->json([
            'success' => true,
            'data' => new TaskResource($task)
        ]);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'success' => true,
            'data' => new TaskResource($task)
        ]);
    }
}
