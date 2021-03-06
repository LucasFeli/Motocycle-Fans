##  Motocycle-Fans app

# Description 

Pagina dirigida  a los apasionados de las motocicletas

# User Stories

- **Registrarse:** Como anon puedo registrarme en la aplicación para poder empezar a crear mis      propias motocicletas.
- Inicio de sesión: Como usuario, puedo iniciar sesión en la aplicación para poder ver mis motocicletas y administrarlas.
- **Cerrar sesión:** como usuario, puedo cerrar la sesión de la aplicación para que nadie más pueda usarla.
- Ver motocicletas Como usuario, quiero ver una lista de mi proyecto y también una vista de cada proyecto individualmente
- **Agregar:**  Como usuario puedo agregar un proyecto
- **Editar:**  Como usuario puedo editar un motocicletas

 #  Backlog
  - eliminar perfil de usuario
  - editar tareas
  - Crear reuniones entre usuarios


# Client / Frontend


## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | HomePage             | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/motocycles`               | ProjectsListPage     | user only `<PrivateRoute>`  | Page that shows all user´s motocycles in a list                |
| `/motocycles/add`           | AddProjectForm       | user only `<PrivateRoute>`  |New Motocycle form, adds a new motocycle and redirects to motocycles list once motocycle has been added |
| `/motocycles/:id`           | ProjectDetailPage    | user only `<PrivateRoute>`  | Page with the details of a motocycle, a edit and delete buttom ,  |
                                       