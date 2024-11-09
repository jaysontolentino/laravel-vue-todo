<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class CompleteTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Task $task)
    {
        $task->completed = $request->completed;
        $task->save();

        return response()->json([
            "success" => true,
            "task_status" => $task->completed,
            "data" => $task
        ]);
    }
}
