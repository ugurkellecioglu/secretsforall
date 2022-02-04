const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return { ...state, loading: true };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'USER_LOADING':
      return { ...state, loading: true };
    case 'USER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'USER_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'SECRETS_LOADING':
      return { ...state, loading: true };
    case 'SECRETS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SECRETS_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'SECRET_LOADING':
      return { ...state, loading: true };
    case 'SECRET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SECRET_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
};

export default reducer;
