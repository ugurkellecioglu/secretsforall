const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true }
    case "error":
      return { ...state, loading: false, error: action.payload }
    case "success":
      return { ...state, loading: false, data: action.payload }
    default:
      return state
  }
}

export default reducer
