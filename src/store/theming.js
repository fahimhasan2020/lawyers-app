const initialState = {
    darkMode: true,
  };
  
  const themingstore = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DARK_MODE':
        return {...state, darkMode: action.payload};
      default:
        return state;
    }
  };
  
  export default themingstore;