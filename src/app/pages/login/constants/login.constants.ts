export enum LoginConsts {
  MESSAGE_WELCOME = 'Bienvenido al sistema',
  ROUTE_HOME = '/home',
  ERROR_USER_NOT_FOUND = 'user not found',
  ERROR_USER_NOT_EXISTS = 'El usuario no existe, verifica tu información',
  ERROR_LOGIN = 'Error al iniciar sesión, verifica la información',
  ROUTE_NOT_FOUND = '/not-found',
  KEY_REQUIRED = 'required',
  ERROR_EMAIL_REQUIRED = 'El correo electrónico es requerido',
  KEY_EMAIL = 'email',
  ERROR_EMAIL_INVALID = 'Ingresa un correo válido',
  EMPTY_STRING = '',
  FUNCTION_UNAVAILABLE = 'Función no disponible. Continuamos trabajando...'
}

export enum LoginTags {
  title = 'User-Manager-System',
  signIn = 'Iniciar sesión',
  email = 'Correo electrónico',
  password = 'Contraseña',
  passwordRequired = 'La contraseña es requerida',
  passwordForgotten = '¿Olvidaste tu contraseña?',
  create = 'Crear cuenta'
}