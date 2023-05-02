## Lista de TODO'S

### PRE ENTREGA PROYECTO FINAL
- Factory (opcional), DAO y DTO.
- El DAO sera devuelto por Factory u otro.
- Implementar Repository con el DAO.
- /current, enviar un DTO al usuario.
- Middleware para la estrategia "current". Admin: crea, actualiza y elimina. User: Enviar mensajes, agregar prods al cart.
- Crear un modelo de Ticket.
- Implementar /:cid/purchase

<hr>

## Entrega Auth

Dependencias para la entrega de Cookies:

- (I) "bcrypt", "passport" y "passport-local"
- (II) "passport-github2" y "jsonwebtoken"

Implementaciones:

- Carpeta utils para guardar passport.js.
- .env para rutas privadas de keys.
- en utils se agrego el metodo de hasheo de contraseña y se agrego el jwt.
- en login.hbs se agrego el login/register por github.
- en session.router.js se agregaron las sesiones de github y local con passport.

<hr>

## Entrega Cookies

Dependencias para la entrega de Cookies:

- (I) "cookie-parser" y "express-session".
- (II) "session-file-store".

Implementaciones:

- views: error (login y singup), singup, login, perfil.
- UserManager: createUser y loginUser.
- Modelo user.model.js.
- Carpeta "sessions" para grabar en mongo los usuarios conectados.
- Ruta views.router.js para agregar todas las views que se reflejan de .hbs.
