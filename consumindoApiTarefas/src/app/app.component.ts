import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.getAllTasks();
  }

  title = 'consumindoApiTarefas';
  url = 'http://localhost:5257/tasks';

  task$!: Observable<Task>;
  tasks$!: Observable<Task[]>;

  inputName = '';
  inputIsCompleted: boolean | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Opens the delete task confirmation modal.
   * Utilizes Bootstrap's modal functionality to display the modal
   * with the ID 'deleteTaskModal'.
   */
  OpenDeleteModal() {
    const modal = new bootstrap.Modal(document.getElementById('deleteTaskModal')!);
    modal.show();
  }

  /**
   * Adds a new task using the input values for id, name, and completion status.
   * Sends a POST request to the server with the new task details.
   * After a successful response, logs the task to the console and resets the input fields.
   */
  addTask() {
    const newTask = {
      name: this.inputName,
      isCompleted: this.inputIsCompleted
    };

    this.http.post<Task>(`${this.url}/add`, newTask).subscribe((task) => {
      console.log(`Task added: ${task.name}`);
      this.inputName = '';
      this.inputIsCompleted = false;
    });
  }


  /**
   * Sends a GET request to the server to fetch all tasks, and assigns the response
   * to the tasks$ observable.
   */
  getAllTasks() {
    this.tasks$ = this.http.get<Task[]>(this.url);
  }
}
