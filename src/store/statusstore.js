const initialState = {
    loggedIn: true,
    showStatus:false,
    statusBarBackgroundColor:'orange',
    statusBarText:'Network connection error'
  };
  
  const statusstore = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SHOW_STATUS':
        return {...state, showStatus: action.payload};
      case 'SET_STATUS_BACKGROUND':
        return {...state, statusBarBackgroundColor: action.payload};
      case 'SET_STATUS_TEXT':
        return {...state, statusBarText: action.payload};
      default:
        return state;
    }
  };
  
  export default statusstore;