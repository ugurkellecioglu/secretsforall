const getSecretData = (data) => {
  const d = data.map((post) => {
    const comments = post.comments.map((item) => {
      return {
        ...item,
        commentCount: item?.comments?.length ?? 0,
        dislikeCount: item?.dislikes?.length ?? 0,
        likeCount: item?.likes?.length ?? 0
      };
    });
    return {
      ...post,
      comments,
      likeCount: data?.likes?.length ?? 0,
      commentCount: data?.comments?.length ?? 0,
      dislikeCount: data?.dislikes?.length ?? 0
    };
  });
  return d;
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return { ...state, loading: true };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'USER_LOADING':
      return { ...state, loading: false };
    case 'USER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'USER_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'SECRETS_LOADING':
      return { ...state, loading: true };
    case 'SECRETS_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SECRETS_SUCCESS':
      const data = getSecretData(action.payload);
      return { ...state, loading: false, data };
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
