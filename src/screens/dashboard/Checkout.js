import { StyleSheet, Text, View,Image,TextInput,ScrollView, Pressable,NativeModules } from 'react-native'
import React,{useState,useEffect} from 'react'
import Container from '../../components/Container'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import StackContainer from '../../components/StackContainer'
import Sizes from '../../themes/Sizes'
import Entypo from "react-native-vector-icons/Entypo"
import SSLCommerzPayment  from "sslcommerz-lts"
const store_id = 'sftec65551332a89bc'
const store_passwd = 'sftec65551332a89bc@ssl'
const is_live = false
const Checkout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [purpose,setPurpose] = useState("");
  const [promocode,setPromocode] = useState("");
  const checkoutNow = async() =>{
    await dispatch({ type: 'SET_FULL_LOADING', payload: true });
    const data = {
        total_amount: 200,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: 'https://ukilvai.com/termsandconditions',
        fail_url: 'https://ukilvai.com/privacy',
        cancel_url: 'https://ukilvai.com/refundpolicies',
        ipn_url: 'https://ukilvai.com/',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: "Fahim Hasan",
        cus_email: "fahim@mail.com",
        cus_add1: "Dhaka bangladesh",
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: "8801711432259",
        cus_fax: '01711111111',
        ship_name: "Mohammadpur dhaka",
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        navigation.navigate('PaymentWindow',{uri:GatewayPageURL});
    });
  }

  return (
  
        <StackContainer title='Checkout'>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.maatingDetailsText}>Meeting details</Text>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.lawyerImageOverlay}>
                        <Image source={require('../../assets/lawyer1.jpg')} style={styles.lawyerImageStyle} />
                    </View>
                    <View style={styles.cardDetailsSection}>
                        <Text style={styles.lawyerNameText}>Adv abdus salam patwary</Text>
                        <Text style={styles.lawyerLocationText}>Dhaka Joudge court</Text>
                        <Text style={styles.lawyerDesignation}>7 Years experienced, BA. LLB</Text>
                        <Text style={styles.lawyerDesignation}>Divorce Lawyer</Text>
                        <View style={styles.overlayContentTop}>
                            <View style={styles.starContainer}>
                                <Text style={styles.ratingText}>4.5 (13)</Text>
                                <Entypo name="star" size={15} color={'#FFD700'} />
                            </View>
                        </View>
                        <Text style={styles.lawyerDesignation}>Meeting type: Online meeting</Text>
                    </View>
                    </View>
                </View>
                <Text style={styles.maatingDetailsText}>Enter appointment details</Text>
                <View>
                    <TextInput placeholder='Enter appointment purpose' value={purpose} onChangeText={(value)=>setPurpose(value)} style={styles.inputTextAreaStyle}  />
                </View>
                <Text style={styles.maatingDetailsText}>Enter Promo code</Text>
                <View>
                    <TextInput placeholder='Enter Promocode' keyboardType='numeric' value={promocode} onChangeText={(value)=>setPromocode(value)} style={styles.inputStyle}  />
                </View>
                <Text style={styles.maatingDetailsText}>Payment Details</Text>
                <View style={styles.tableContents}>
                    <View style={styles.tableHeaderBg}>
                        <View style={[styles.tableHeaderContents,{width:'10%'}]}>
                            <Text style={styles.tableHeaderText}>SL</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'60%'}]}>
                            <Text style={styles.tableHeaderText}>Name</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'30%'}]}>
                            <Text style={styles.tableHeaderText}>Price</Text>
                        </View>
                    </View>
                    <View style={styles.tableBodyBg}>
                        <View style={[styles.tableHeaderContents,{width:'10%'}]}>
                            <Text style={styles.tableBodyText}>1</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'60%'}]}>
                            <Text style={styles.tableBodyText}>Online meeting</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'30%'}]}>
                            <Text style={styles.tableBodyText}>200 BDT</Text>
                        </View>
                    </View>
                    <View style={styles.tableBodyBg}>
                        <View style={[styles.tableHeaderContents,{width:'10%'}]}>
                            <Text style={styles.tableBodyText}>2</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'60%'}]}>
                            <Text style={styles.tableBodyText}>VAT</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'30%'}]}>
                            <Text style={styles.tableBodyText}>50 BDT</Text>
                        </View>
                    </View>
                    <View style={styles.tableBodyBg}>
                        <View style={[styles.tableHeaderContents,{width:'10%'}]}>
                            <Text style={styles.tableBodyText}>3</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'60%'}]}>
                            <Text style={styles.tableBodyText}>DISCOUNT (Promocode)</Text>
                        </View>
                        <View style={[styles.tableHeaderContents,{width:'30%'}]}>
                            <Text style={styles.tableBodyText}>10%</Text>
                        </View>
                    </View>
                    <View
                    style={styles.hrRef}
                    ></View>
                    <View style={styles.tableBodyBg}>
                        <View style={[styles.tableHeaderContents,{width:'70%'}]}>
                            <Text style={styles.tableBodyText}>Total bill</Text>
                        </View>
                        
                        <View style={[styles.tableHeaderContents,{width:'30%'}]}>
                            <Text style={styles.tableBodyText}>225 BDT</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={()=>{checkoutNow()}} android_ripple={{color: 'orange'}} style={styles.payNowButton}><Text style={styles.payNowText}>Pay Now</Text></Pressable>
            </ScrollView>
        </StackContainer>
   
    
  )
}

export default Checkout

const styles = StyleSheet.create({
    payNowText:{
        color:'#fff'
    },
    payNowButton:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#000',
        padding:10,
        borderRadius:5,
        elevation:5,
        alignItems:'center',
        justifyContent:'center',
        marginTop:50
    },
    hrRef:{
        width:'100%',
        height:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    tableHeaderText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:14
    },
    tableBodyText:{
        color:'#000',
        fontWeight:'bold',
        fontSize:14
    },
    tableHeaderContents:{
        width:'33%',
        padding:5,
        alignItems:'flex-start',
        justifyContent:'center',
        height:30
    },
    tableContents:{
        width:'100%',
        padding:5
    },
    tableHeaderBg:{
        width:'100%',
        backgroundColor:'#333232',
        padding:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    tableBodyBg:{
        width:'100%',
        padding:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    inputTextAreaStyle:{
        width:Sizes.fullWidth - 30,
        borderColor:'#ccc',
        borderRadius:10,
        borderWidth:1,
        height:150,
        padding:10,
        flexWrap:'wrap',
        textAlignVertical: 'top',
    },
    inputStyle:{
        width:Sizes.fullWidth - 30,
        borderColor:'#ccc',
        borderRadius:10,
        borderWidth:1,
        height:50,
        padding:10,
        flexWrap:'wrap',
        textAlignVertical: 'top',
    },
    maatingDetailsText:{
        fontSize:15,
        color:'#000',
        fontWeight:'bold',
        marginBottom:10,
        textTransform:'uppercase',
        letterSpacing:1.5,
        marginTop:10
    },
    starContainer:{
        flexDirection:'row'
    },
    ratingText:{
        color:'#ccc',
        fontSize:10,
        fontWeight:'bold',
        marginTop:1,
        marginRight:5
    },
    container:{
        padding:10,
        paddingBottom:150
    },
    cardDetailsSection:{
        padding:10
    },
    lawyerNameText:{
        width:Sizes.fullWidth/2-30,
        fontSize:12,
        fontWeight:'bold',
        color:'#000'
    },
    lawyerLocationText:{
        width:Sizes.fullWidth/2-30,
        fontSize:11,
        fontWeight:'bold',
        color:'orange',
        marginBottom:20
    },
    lawyerDesignation:{
        width:Sizes.fullWidth/2-40,
        fontSize:11,
        color:'#ccc',
    },
    cardContent:{
        flexDirection:'row'
    },
    card:{
        elevation:3,
        backgroundColor:'white',
        width:Sizes.fullWidth-30,
        alignSelf:'center',
        borderRadius:5,
        height:200,
        marginBottom:20
    },
    lawyerImageStyle:{
        height:180,
        borderRadius:10,
        width:Sizes.fullWidth/2 -30
    },
    lawyerImageOverlay:{
        borderWidth:1,
        borderColor:'orange',
        width:Sizes.fullWidth/2 -28,
        borderRadius:10,
        backgroundColor:'#fff',
        margin:10
    }
})