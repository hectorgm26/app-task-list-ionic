import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonReorderGroup,
  IonReorder,
  ReorderEndCustomEvent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { AlertService } from 'src/app/services/alert-service';
import { Preferences } from '@capacitor/preferences'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonReorder,
    IonReorderGroup,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonList,
    IonButton,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    IonIcon,
    IonLabel,
  ],
})
export class HomePage {
  public task: string = '';
  public tasks: string[] = [];

  // inyección de dependencia usando la forma moderna sin constructor
  private alertService: AlertService = inject(AlertService);

  private readonly KEY_TASKS = 'ddr_key_tasks';

  constructor() {
    addIcons({
      addOutline,
      trashOutline,
    });
  }

  async ionViewWillEnter() {

    const taskPreferences = await Preferences.get({ key: this.KEY_TASKS });

    if (taskPreferences.value) {
      // el metodo JSON.parse convierte un string a un array
      // es necesario, ya que los textos no tienen comportamiento de array, es decir, no se les puede hacer push, splice, etc.
      const tasks = JSON.parse(taskPreferences.value);

      // es necesario este chequeo porque el JSON.parse puede devolver cualquier tipo de dato
      if (Array.isArray(tasks)) {
        this.tasks = tasks; // asignar el array leido al array de tareas
      }
    }
  }

  addTask() {
    console.log('Task added: ', this.task);

    // Si no existe la tarea, ni se repite, agregarla
    if (!this.existsTask(this.task)) {

      this.tasks.push(this.task);
      console.log('Current tasks: ', this.tasks);

      // reiniciar valor para nueva tarea
      this.task = '';

      this.saveTasks();

      // llamada a la alerta
      this.alertService.alertMessage(
        'Éxito.',
        'La tarea ha sido agregada correctamente.'
      );
      
    } else {
      console.log('La tarea ya existe');
      this.alertService.alertMessage('Error.', 'La tarea ya existe.');
    }
  }

  // devuelve la tarea si existe, o undefined si no existe
  // trim elimina espacios en blanco al inicio y al final
  private existsTask(task: string) {
    return this.tasks.find(
      (taskItem) => taskItem.toUpperCase().trim() === task.toUpperCase().trim()
    );
  }

  confirmDelete(task: string) {
    this.alertService.alertConfirm(
      'Confirmación',
      '¿Estás seguro de borrar la tarea?',
      () => this.removeTask(task)
    );
  }

  private removeTask(task: string) {
    console.log('Removing task: ', task);

    const index = this.tasks.findIndex(
      (taskItem) => taskItem.toUpperCase().trim() === task.toUpperCase().trim()
    );

    // Esto porque findIndex devuelve -1 si no encuentra el elemento
    if (index != -1) {
      // El metodo splice elimina elementos de un array, pasandole la posición desde donde eliminar y la cantidad de elementos a eliminar después de esa posición
      // es decir, el index toma el valor pasado como posicicion para empezar, y el 1 indica que solo se elimine un elemento después de esa posición
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  orderTasks(event: ReorderEndCustomEvent) {
    console.log('Antes de ordenar: ' + this.tasks);

    this.tasks = event.detail.complete(this.tasks);

    console.log('Después de ordenar: ' + this.tasks);
    this.saveTasks();
  }

  // Preferences (de Capacitor) solo puede guardar datos en formato string
  // No puede almacenar directamente objetos, arrays, booleanos, etc.
  // Por eso necesitas convertir el array a texto antes de guardarlo y luego volverlo a convertir a array al leerlo.
  saveTasks() {
    Preferences.set({
      key: this.KEY_TASKS,
      value: JSON.stringify(this.tasks),
      // Esto es necesario porque Preferences solo guarda strings, y no arrays
      // Y el JSON.stringify convierte un array a string, haciendo posible su almacenamiento
    });
  }
}
