export const initialState = {
  username: null,
  posts: [],
};

const reducer = (state, action) => {
  console.log("action triggred");
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.username,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
