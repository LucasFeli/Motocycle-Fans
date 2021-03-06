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
| Path                      | Componente            | Permisos                 | Comportamiento                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | Pagina de inicio            | público `<Route>`            | Página de inicio                                                    |
| `/signup`                 | Pagina de Registro           | solo anonimo `<AnonRoute>`    | Formulario de Registro, link to login, navigate to homepage after signup |
| `/login`                  | Pagina inciar sesion           | solo anonimo `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/motocycles`               | Pagina Lista de Motocicletas    | solo usuario `<PrivateRoute>`  | Página que muestra todos los motocicletas del usuario en una lista.                |
| `/motocycles/add`           | Formulario agregar Motocicleta      | solo usuario  `<PrivateRoute>`  |Formulario para crear una motocicleta, agrega una motocicleta nueva y redirige a la lista de motocicletas, una vez que se ha agregado la motocicleta |
| `/motocycles/:id`           | Pagina de detalle de una motocicleta   | solo usuario `<PrivateRoute>`  | Página con los detalles de una moto y dos botones, uno para editar y otro para eliminar una moto  |


## Components

- HomePage
 
- LoginPage

- SignupPage

- MotocycleListPage  
  * Motocycle Card
  * Delete Motocycle Button
  * <Link>  AddProjectForm

  * Add Motocycle Form

- Routes
  * AnonRoute
  * PrivateRoute

- Common
  * Navbar 

## Services

- Auth Service
  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Motocycle Service
  - MotocycleApi.list()
  - MotocycleApi.addMotocycle(motocycle)
  - MotocycleApi.getMotocycleDetails(motocycleId)
  - MotocycleApi.editMotocycle(motocycleId, motocycleBody)
  - MotocycleApi.deleteMotocycle(motocycleId)

# Server / Backend


## Models

**User model**

```javascript
{
  username: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  Motocycles: [ { type: mongoose.Schema.Types.ObjectId, ref: "Motocycle" } ]
}
```

**Motocycle model**

```javascript
{
  Marca: String,
  Año: Number,
  Motor: String,
  image: String,
  description: String,
  
},
```