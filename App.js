import React,{useEffect,useState} from 'react'
import { Appearance } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/store/store'
import Index from './src/navigation/Index'
import RNBootSplash from "react-native-bootsplash";
const App = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  useEffect(()=>{
    
    RNBootSplash.hide({ fade: true, duration: 500 });
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
      console.log('Color sceme is:',colorScheme);
    });

    return () => {
      subscription.remove();
    };
  },[])

  return (<Provider store={store}><Index /></Provider>)
}

export default App