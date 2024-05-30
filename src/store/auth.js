const initialState = {
  loggedIn: false,
  countryCode: '+880',
  userDp:'',
  token: '',
  phoneNumber: '',
  id: '',
  name: '',
  email: '',
  lat: 76.299965,
  lng: 148.003021,
  currentTheme:'light',
  loading:false,
  fullPageLoader:false,
  paymentSuccess:false,
  registrationPayload:{
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
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return {...state, loggedIn: action.payload};
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
    case 'SET_EMAIL':
      return {...state, email: action.payload};
    case 'SET_NAME':
      return {...state, name: action.payload};
    case 'SET_DP':
      return {...state, userDp: action.payload};
    case 'SET_ID':
      return {...state, id: action.payload};
    default:
      return state;
  }
};

export default auth;
