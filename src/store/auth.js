const initialState = {
  loggedIn: false,
  countryCode: '+880',
  currentLocation:'',
  userDp:'',
  token: '',
  phoneNumber: '',
  balance:'',
  id: '',
  name: '',
  email: '',
  lat: 76.299965,
  lng: 148.003021,
  currentTheme:'light',
  loading:false,
  fullPageLoader:false,
  paymentSuccess:false,
  online:false,
  registrationPayload:{
    pushToken:'',
    token:'',
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    lat:'',
    lng:'',
    address:'',
    gender:'',
    degrees:'',
    description:'',
    visit:'',
    profilePicture:'',
    llbCertificate:'',
    llMCertificate:'',
    dateOfBirth:'',
    age:'',
    experience:'',
    
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return {...state, loggedIn: action.payload};
    case 'SET_CURRENT_LOCATION':
      return {...state, currentLocation: action.payload};
    case 'UPDATE_REGISTRATION_PAYLOAD':
      return {
        ...state,
        registrationPayload: {
          ...state.registrationPayload,
          [action.key]: action.value,
          },
        };
    case 'SET_REGISTRATION_PAYLOAD':
      return {...state, fullPageLoader: action.payload};
    case 'SET_PAYMENT_SUCCESS':
      return {...state, paymentSuccess: action.payload};
    case 'SET_PHONE_NUMBER':
      return {...state, phoneNumber: action.payload};
    case 'SET_TOKEN':
      return {...state, token: action.payload};
    case 'SET_EMAIL':
      return {...state, email: action.payload};
    case 'SET_NAME':
      return {...state, name: action.payload};
    case 'SET_DP':
      return {...state, userDp: action.payload};
    case 'SET_BALANCE':
      return {...state, balance: action.payload};
    case 'SET_ONLINE':
      return {...state, online: action.payload};
    case 'SET_LOADING_BAR':
      return {...state, loading: action.payload};
    case 'SET_ID':
      return {...state, id: action.payload};
    default:
      return state;
  }
};

export default auth;
