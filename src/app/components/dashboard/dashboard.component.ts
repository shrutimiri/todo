import { Component } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Create Variables for hold value
  taskObj: Todo = new Todo();
  taskArray:Todo[] = [];

  addTaskData : string = "";
  editTaskData : string ="";

  constructor(private api:TaskService) {

  }
  ngOnInit():void {
    this.editTaskData = "";
    this.addTaskData = "";
    this.taskObj = new Todo();
    this.taskArray =[];
    this.getAllTask();

  }
  
  // Create Task data 
 
  addTask(){
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
      this.addTaskData = "";
    },err =>{
      alert(err);
    })
  }

  // Get all task Data
  getAllTask(){
    this.api.getAllTask().subscribe(res =>{
      this.taskArray = res;
    },err =>{
      alert("Unable to find task")
    })
  }

  // Edit todo Task
  editTask(){
    this.taskObj.task = this.editTaskData;
    console.log(this.taskObj.task);
    this.api.editTask(this.taskObj).subscribe(res =>{
      console.log(res);
      this.ngOnInit();
    },err=>{
      alert("Unable to update Task")
    })
  }

  // Delete Task
  deleteTask(task:Todo){
    this.api.delete(task).subscribe(res =>{
      this.ngOnInit();
    },err=>{
      alert("Failed to delete task")
    })
  }

  // edit property
  callEdit(task:Todo){
    this.taskObj = task;
    // console.log(this.taskObj)
    this.editTaskData = task.task;
  }

}
