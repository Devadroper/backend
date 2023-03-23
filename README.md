# JAVI LEE ESTA PARTE

- Crea una github app, esta explicado en <a href="https://coderhouse.zoom.us/rec/play/KQaSX9IU2NofIXdSIx0mEK1gLtJhJAdXBeKTyNfx-y8f4FvzTAozFKgqRoX4DCiwCaBwAPZ139rkH5g5.uHNsG8lwBOpULfVX?continueMode=true&_x_zm_rtaid=vVBmo6HSTYCPDE6U4nbosQ.1678826780639.2e3736dc4499ac0465f6453017dc1a3c&_x_zm_rhtaid=828">esta clase</a>, minuto 20:45.
- Despues agrega las dos claves que te va a dar la github app en el .env.

<hr>

## Lista de TODO'S

### ENTREGA ACTUAL
- Login con JWT o session (ver cual seria mejor).
- (solo JWT) estrategia current y devolver al usuario el token.
- ruta /api/sessions/current para devolver al usuario una respuesta.
### ENTREGA SIGUIENTE
- Capas de routing, controlador, dao y vistas delegadas.
- Hacer un .env x
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