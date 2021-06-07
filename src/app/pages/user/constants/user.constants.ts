export enum UserConsts {
  EMPTY_STRING = '',
  KEY_ID = 'id',
  KEY_REQUIRED = 'required',
  KEY_EMAIL = 'email',
  ERROR_EMAIL_REQUIRED = 'El correo electrónico es requerido',
  ERROR_EMAIL_INVALID = 'Ingresa un correo válido',
  MESSAGE_SUCCESS_SAVE = 'Guardado correctamente:',
  ERROR_UPDATE_USER = 'Hubo un error al guardar el usuario',
  DIALOG_TITLE = 'Eliminación de Post',
  DIALOG_RESUME = 'Estas por eliminar el post, esta acción no es reversible',
  DIALOG_IMG_REF = '../../../assets/img/delete.png',
  DIALOG_QUESTION = '¿Deseas eliminar el post?',
  DIALOG_BUTTON_1 = 'Cancelar',
  DIALOG_BUTTON_2 = 'Confirmar',
  DIALOG_WIDTH = '620px',
  CONFIRM = 'Confirm',
  MESSAGE_SUCCESS_DELETE = 'Eliminado correctamente'
}

export const DISPLAYED_COLUMNS = ['title', 'body', 'actions'];

export enum UserTags {
  cardTitle = 'Edición de usuario',
  email = 'Correo electrónico',
  firstName = 'Nombre',
  firstNameRequired = 'El nombre es requerida',
  lastName = 'Apellido',
  lastNameRequired = 'El apellido es requerido',
  save = 'Guardar',
  title = 'Título',
  body = 'Contenido',
  actions = 'Acciones',
  noPosts = 'No hay posts disponibles'
}