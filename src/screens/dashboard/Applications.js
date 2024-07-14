import { StyleSheet, View, Image,Pressable } from 'react-native'
import React,{useState} from 'react'
import Container from '../../components/Container'
import { Colors, Text, TextField,Button } from 'react-native-ui-lib'
import DrawerContainer from '../../components/DrawerContainer'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../constants/colors'
import { BasicModalPopup } from '../../components/ModalsPopup'
import { bankRequestCreate } from '../../data/api/BankRequestCreate'
import { useDispatch,useSelector } from 'react-redux'
import { fireMessage } from '../../utility/flashMessageFire'
import updatePayload from '../../data/api/RefreshApp'
const Applications = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.auth?.id);
  const token = useSelector(state => state?.auth?.token);
  const balance = useSelector(state => state?.auth?.balance);
  const [bankName,setBankName] = useState('');
  const [accountNumber,setAccountNumber] = useState('');
  const [amount,setAmount] = useState('');
  const createBankRequest = async()=>{
    const dataset = {
      amount:amount,
      account_number:accountNumber,
      bank_name:bankName,
      lawyer_id:userId
    }
    const withdrow = await bankRequestCreate(dataset);
    console.log("value is",withdrow);
    if(withdrow?.hasOwnProperty("success") && !withdrow?.success){
      return fireMessage(withdrow?.message,"danger");
    }else{
      const tokenCurrent = await updatePayload(token);
      setBankName("");
      setAccountNumber("");
      setAmount("");
      await dispatch({ type: 'SET_BALANCE', payload: tokenCurrent?.user?.balance });
      return fireMessage("Request created successfully","success");
    }
  }
  return (<DrawerContainer>
    <View style={styles.container}>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>টাকা উত্তোলন করুন</Text>
      </View>
      <View style={{marginTop:60,padding:10,margin:10,width:'90%',borderRadius:10,height:70,elevation:10,backgroundColor:Colors.grey30}}>
        <Text text80BL color={Colors.white}>বর্তমান ব্যালেন্স: {balance} ৳</Text>
        <Text text80BL color={Colors.white}>প্রত্যাহারযোগ্য ব্যালেন্স: {balance} ৳</Text>
      </View>
      <View style={{paddingHorizontal:20,paddingRight:30}}>
        <TextField
                    value={bankName}
                    placeholder={'ব্যাঙ্কের নাম লিখুন'}
                    floatingPlaceholder
                    floatingPlaceholderColor="#000"
                    onChangeText={(value)=>{setBankName(value)}}
                    fieldStyle={{borderBottomColor:'#ddd',borderBottomWidth:2}}
                    enableErrors
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={['Field is required']}
                    maxLength={30}
                  />
        <TextField
                    keyboardType={'numeric'}
                    value={accountNumber}
                    placeholder={'অ্যাকাউন্ট নম্বর লিখুন'}
                    floatingPlaceholder
                    floatingPlaceholderColor="#000"
                    onChangeText={(value)=>{setAccountNumber(value)}}
                    fieldStyle={{borderBottomColor:'#ddd',borderBottomWidth:2}}
                    enableErrors
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={['Field is required']}
                    maxLength={30}
                  />
        <TextField
                    keyboardType={'numeric'}
                    value={amount}
                    placeholder={'পরিমান লিখুন'}
                    floatingPlaceholder
                    floatingPlaceholderColor="#000"
                    onChangeText={(value)=>{setAmount(value)}}
                    fieldStyle={{borderBottomColor:'#ddd',borderBottomWidth:2}}
                    enableErrors
                    validate={['required', (value) => value.length > 6]}
                    validationMessage={['Field is required']}
                    maxLength={30}
                  />
        <Button onPress={()=>{createBankRequest()}} label={'প্রত্যাহারের অনুরোধ করুন'} size={Button.sizes.medium} backgroundColor={Colors.yellow30} color={Colors.dark}  />
      </View>
      
    </View>
  </DrawerContainer>)
}

export default Applications

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-200
    },
    navigationText:{
      fontWeight:'bold',
      fontSize:12,
      opacity:0.5,
      color:'#000'
    },
    menus:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:15
    },
    navigationsContainer:{
      alignSelf:'center',
      width:'70%',
      padding:10,
      borderRadius:10,
      margin:10,
      marginTop:50,
      backgroundColor:'#ffffff',
      elevation:20
    },
    nameConteiner:{
      alignSelf:'center',
      padding:10
    },
    name:{
      fontSize:14,
      color:'orange',
      fontWeight:'bold',
      textTransform:'uppercase',
      
    },
    phone:{
      fontSize:10,
      color:'grey',
      fontWeight:'bold',
      textTransform:'uppercase',
      letterSpacing:0.3,
      opacity:0.6,
      alignSelf:'center'
    },
    avatar:{
      height:80,width:80,
    },

    avatarContainer:{
      padding:10,
      backgroundColor:'#fff',
      width:100,
      height:100,
      borderRadius:50,
      alignSelf:'center',
      elevation:10
    }
})