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
  deleteModal: any;

  title = 'consumindoApiTarefas';
  url = 'http://localhost:5257/task';

  task$!: Observable<Task>;
  tasks$!: Observable<Task[]>;

  inputName = '';
  inputIsCompleted: boolean | null = null;

  selectedTaskId: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('deleteTaskModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }
  }

  /**
   * Opens the delete task confirmation modal.
   * Utilizes Bootstrap's modal functionality to display the modal
   * with the ID 'deleteTaskModal'.
   * @param task The task to be deleted.
   */
  OpenDeleteModal(task: Task) {
    this.selectedTaskId = task.id;
    this.deleteModal?.show();
  }

  /**
   * Closes the delete task confirmation modal.
   * Utilizes Bootstrap's modal functionality to hide the modal
   * with the ID 'deleteTaskModal'.
   */
  closeDeleteModal() {
    this.deleteModal?.hide();
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
      this.getAllTasks();
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

  /**
   * Deletes a task with the given id from the server.
   * Sends a DELETE request to the server with the task id.
   * After a successful response, closes the delete task confirmation modal
   * and refreshes the list of tasks.
   * @param id The id of the task to delete.
   */
  deleteTask(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.closeDeleteModal();
      this.getAllTasks();
    })
  }
}
