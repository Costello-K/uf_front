// Base URL for interacting with the backend
export const BASE_URL = process.env.BACKEND_APP_URL

// Names for access and refresh tokens in local storage
export const NAME_ACCESS_TOKEN = 'accessToken';
export const NAME_REFRESH_TOKEN = 'refreshToken';

// Name for type social auth in local storage
export const TYPE_SOCIAL_AUTH = 'typeSocialAuth';

// Maximum file size in Mb
export const LIMIT_AVATAR_SIZE = 2;
const maxFileSize = LIMIT_AVATAR_SIZE * 1024 * 1024;

// Application routes
export const ROUTER_DATA = [
  { path: '', pathToComponent: 'views/HomePage' },
  { path: 'registration', pathToComponent: 'views/UserRegistrationPage', meta: { requiresAuth: false } },
  { path: 'authorization', pathToComponent: 'views/UserAuthorizationPage', meta: { requiresAuth: false } },
  { path: 'users/:id', pathToComponent: 'views/UserProfilePage', meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', pathToComponent: 'views/NotFoundPage' },
];

// Dropdown menu items in the header for non-authorized user
export const HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER = [
  { path: '/registration', title: 'registration' },
  { path: '/authorization', title: 'login' },
];

// User information fields
export const AUTH_USER_INFO_FIELDS = [
  { name: 'username', label: 'Username' },
  { name: 'first_name', label: 'First name' },
  { name: 'last_name', label: 'Last name' },
  { name: 'email', label: 'Email' },
];

// Data for social authorization types
export const SOCIAL_AUTH_DATA = {
  google: {
    title: 'Google',
    name: 'google-oauth2',
  },
  facebook: {
    title: 'Facebook',
    name: 'facebook',
  },
};

// Form field validation rules
export const VALIDATION_RULES = {
  username: [v => !!v || 'Username required'],
  email: [
    v => !!v || 'Email required',
    v => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v)
      || 'Email not valid',
  ],
  first_name: [v => !!v || 'First name required'],
  name: [v => !!v || 'Name required'],
  title: [v => !!v || 'Title required'],
  description: [v => !!v || 'Description required'],
  id: [],
  completed: [],
  last_name: [],
  avatar: [
    v => !v
      || !v.length
      || v[0].size <= maxFileSize
      || `Avatar size' ${LIMIT_AVATAR_SIZE} Mb`,
    v => !v
      || !v.length
      || /\.(png|jpeg|jpg|PNG|JPEG|JPG)$/.test(v[0].name)
      || 'File extensions: .png, .jpeg, .jpg',
  ],
  password: [v => !!v || 'Password required'],
};

// Registration form fields
export const FIELDS_FORM_REGISTRATION = {
  username: { model: 'username', label: 'Username', type: 'text' },
  first_name: { model: 'first_name', label: 'First name', type: 'text' },
  last_name: { model: 'last_name', label: 'Last name', type: 'text' },
  email: { model: 'email', label: 'email', type: 'Email' },
  password: { model: 'password', label: 'password', type: 'Password' },
  confirm_password: { model: 'confirm_password', label: 'Confirm password', type: 'password' },
};

