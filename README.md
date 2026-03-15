Enlace a repositorio publico : https://github.com/TomLecker/weather_frontend_m7.git

Vue 3 + pinia + firebase

🔐 Sistema de autenticación

Se implementó autenticación con Firebase.

Registro

Los usuarios pueden crear una cuenta con:

correo electrónico

contraseña

Al registrarse:

Se crea el usuario en Firebase Authentication.

Se crea un documento en Firestore dentro de la colección:

users/{uid}

Con la siguiente estructura:

{
  email: "...",
  favoritos: [],
  preferenciaTemp: "C"
}
Login

El login permite:

validar credenciales

iniciar sesión

guardar el usuario en el estado global (Pinia)

Si el login falla se muestra un mensaje de error.

Cerrar sesión

El botón Logout:

Cierra la sesión en Firebase

Limpia el estado del usuario en Pinia

Redirige al usuario a la vista pública

👤 Estado del usuario

El estado del usuario se gestiona en authStore.js.

Contiene:

user
userData
loading
loadingUser
initAuth()

Se implementó initAuth() para:

detectar sesiones activas al iniciar la app

cargar los datos del usuario desde Firestore

restaurar favoritos y preferencias

Esto se ejecuta al iniciar la aplicación desde main.js.

⭐ Sistema de favoritos

Los usuarios autenticados pueden guardar ciudades como favoritas.

Funcionamiento

Desde las tarjetas de clima:

Guardar favorito

Esto ejecuta:

auth.addFavorito(ciudad)

El método:

Actualiza el array favoritos

Guarda los cambios en Firestore

Actualiza el estado en Pinia

📊 Dashboard del usuario

El Dashboard muestra contenido personalizado.

Incluye:

saludo al usuario

lista de ciudades favoritas

selector de unidad de temperatura

Las ciudades favoritas se renderizan reutilizando el componente:

LugarCard.vue

De esta forma las tarjetas del dashboard muestran exactamente los mismos datos que las del inicio.

🌡️ Preferencia de temperatura

Se implementó un selector para elegir:

°C
°F

El valor se guarda en Firestore dentro de:

preferenciaTemp

El cambio se realiza mediante:

auth.cambiarPreferenciaTemp()

Esto permite personalizar la visualización de temperatura según el usuario.

🔒 Protección de rutas

Se implementaron rutas protegidas con Vue Router.

Rutas públicas
/
login
register
acerca
Ruta protegida
/dashboard

Si un usuario no autenticado intenta acceder a /dashboard:

→ redirección a /login
Rutas solo para invitados
/login
/register

Si el usuario ya está logueado:

→ redirección al Home
🚀 Inicialización segura de la sesión

Para evitar problemas de sincronización entre Firebase y el router se implementó:

initAuth()

que:

detecta el usuario autenticado

carga sus datos

habilita el router solo cuando termina

Esto evita errores de sesión al recargar la página.


Estado actual del proyecto

✔ Consulta de clima desde API
✔ Sistema de autenticación
✔ Registro de usuarios
✔ Gestión de sesión
✔ Favoritos guardados en base de datos
✔ Dashboard personalizado
✔ Preferencias de temperatura
✔ Rutas protegidas
✔ Componentes reutilizables
