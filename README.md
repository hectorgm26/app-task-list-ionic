# ✅ TaskList - Lista de Tareas Ionic + Angular

Mi segundo proyecto con **Ionic 8** y **Angular** - Una aplicación completa de gestión de tareas con persistencia de datos y funcionalidades avanzadas.

## 📱 Descripción

Aplicación móvil de lista de tareas (To-Do List) que permite:
- ➕ Agregar nuevas tareas
- 🗑️ Eliminar tareas con confirmación
- 🔄 Reordenar tareas arrastrando
- 💾 Persistencia automática de datos
- ⚠️ Validación de tareas duplicadas

Todas las tareas se guardan automáticamente en el almacenamiento local del dispositivo, manteniéndose disponibles incluso después de cerrar la app.

## 🚀 Tecnologías

- **Ionic 8** - Framework para desarrollo móvil híbrido
- **Angular** - Framework web (standalone components)
- **Capacitor** - Para funcionalidades nativas
- **TypeScript** - Lenguaje de programación
- **FormsModule** - Para manejo de formularios y ngModel

## 📦 Plugins de Capacitor

- `@capacitor/preferences` - Almacenamiento local persistente
- `@capacitor/assets` - Generación de iconos para plataformas

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Añadir plataformas (si es necesario)
npx cap add android
npx cap add ios
```

## 🎨 Generación de Iconos

Para generar los iconos de la aplicación para cada plataforma:

```bash
# Android
npm run generate-icons-android

# iOS
npm run generate-icons-ios

# PWA
npm run generate-icons-pwa
```

> **Nota:** Los assets deben estar en la carpeta `resources/` en la raíz del proyecto.

## 🏃‍♂️ Ejecución

### En el navegador
```bash
ionic serve
```

### En dispositivo Android
```bash
ionic cap run android
```

### En dispositivo iOS
```bash
ionic cap run ios
```

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── home/
│   │   ├── home.page.ts         # Lógica de la lista de tareas
│   │   ├── home.page.html       # Interfaz de usuario
│   │   └── home.page.scss       # Estilos
│   ├── services/
│   │   └── alert-service.ts     # Servicio para alertas
│   └── app.component.ts         # Componente raíz
└── ...
```

## 🔑 Características Principales

### 1. Gestión de Tareas
- **Agregar:** Input con validación en tiempo real
- **Eliminar:** Deslizar hacia la izquierda + confirmación
- **Reordenar:** Arrastrar y soltar tareas
- **Validación:** Previene tareas duplicadas (insensible a mayúsculas/minúsculas y espacios)

### 2. Persistencia de Datos
Utiliza `@capacitor/preferences` para guardar el array de tareas como JSON:

```typescript
// Guardar tareas
await Preferences.set({
  key: 'ddr_key_tasks',
  value: JSON.stringify(this.tasks)
});

// Recuperar tareas
const tasks = await Preferences.get({ key: 'ddr_key_tasks' });
const taskArray = JSON.parse(tasks.value);
```

### 3. Servicio de Alertas Reutilizable
Servicio personalizado para mostrar alertas y confirmaciones:

```typescript
@Injectable({ providedIn: 'root' })
export class AlertService {
  // Alerta simple
  alertMessage(header: string, message: string)
  
  // Alerta de confirmación
  alertConfirm(header: string, message: string, functionOk: Function)
}
```

**Características del servicio:**
- Inyección de dependencias moderna sin constructor
- Métodos async/await
- Personalizable con textos de botones
- Ejecuta funciones callback al confirmar

### 4. Componentes Avanzados de Ionic

#### Ion-Item-Sliding
Permite deslizar items para revelar opciones:
```html
<ion-item-sliding>
  <ion-item><!-- Contenido --></ion-item>
  <ion-item-options side="end">
    <ion-item-option color="danger">
      <ion-icon name="trash-outline"></ion-icon>
    </ion-item-option>
  </ion-item-options>
</ion-item-sliding>
```

#### Ion-Reorder-Group
Permite reordenar elementos arrastrando:
```typescript
orderTasks(event: ReorderEndCustomEvent) {
  this.tasks = event.detail.complete(this.tasks);
  this.saveTasks();
}
```

### 5. Control Flow de Angular
Utiliza la nueva sintaxis de control flow (@if, @for):

```html
@if (tasks.length === 0) {
  <ion-label>No hay tareas pendientes</ion-label>
} @else {
  @for (task of tasks; track task) {
    <ion-item>{{ task }}</ion-item>
  }
}
```

### 6. Two-Way Data Binding
Uso de `ngModel` con `FormsModule`:

```html
<ion-input [(ngModel)]="task" placeholder="Escribe tu tarea...">
</ion-input>
```

## 💡 Aprendizajes Clave

- ✅ Creación de servicios reutilizables en Angular
- ✅ Inyección de dependencias moderna con `inject()`
- ✅ Manejo de arrays en TypeScript (find, findIndex, splice, push)
- ✅ Persistencia de objetos complejos usando JSON.stringify/parse
- ✅ Componentes avanzados de Ionic (sliding, reorder)
- ✅ Alertas nativas con AlertController
- ✅ Control flow moderno de Angular (@if, @for)
- ✅ Two-way data binding con ngModel
- ✅ Validación de datos y prevención de duplicados
- ✅ Manejo de eventos personalizados (ReorderEndCustomEvent)

## 🎯 Funcionalidades Implementadas

| Funcionalidad | Descripción |
|--------------|-------------|
| ➕ Agregar tarea | Input con botón deshabilitado si está vacío |
| 🔍 Validación | Previene duplicados (case-insensitive) |
| 🗑️ Eliminar tarea | Deslizar + confirmación de seguridad |
| 🔄 Reordenar | Drag & drop para reorganizar lista |
| 💾 Persistencia | Guardado automático en cada cambio |
| ⚠️ Alertas | Feedback visual para todas las acciones |
| 📱 Responsive | Interfaz adaptada a móviles |

## 🛠️ Conceptos Técnicos Destacados

### Conversión de Datos
```typescript
// Array a String para guardar
JSON.stringify(this.tasks)

// String a Array para leer
JSON.parse(taskPreferences.value)
```

### Búsqueda Case-Insensitive
```typescript
private existsTask(task: string) {
  return this.tasks.find(
    (taskItem) => taskItem.toUpperCase().trim() === task.toUpperCase().trim()
  );
}
```

### Eliminación Segura de Arrays
```typescript
const index = this.tasks.findIndex(/* condición */);
if (index !== -1) {
  this.tasks.splice(index, 1); // Elimina 1 elemento en la posición index
}
```

## 📝 Notas de Desarrollo

- `JSON.stringify()` convierte arrays/objetos a string para guardar en Preferences
- `JSON.parse()` convierte el string de vuelta a array/objeto
- `Array.isArray()` valida que el dato leído sea realmente un array
- `splice(index, 1)` elimina un elemento del array en la posición especificada
- `findIndex()` devuelve `-1` si no encuentra el elemento
- El operador `!` en el template niega el valor (útil para deshabilitar botones)

## 📄 Licencia

Este es un proyecto de práctica personal con fines educativos.

---

⭐ **Mi segundo proyecto con Ionic** - Construyendo apps más complejas paso a paso
