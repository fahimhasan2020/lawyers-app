import { StyleSheet, View, Image,Pressable,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import Container from '../../components/Container'
import { Colors, FloatingButton,Text } from 'react-native-ui-lib'
import DrawerContainer from '../../components/DrawerContainer'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { colors } from '../../constants/colors'
import { BasicModalPopup } from '../../components/ModalsPopup'
import ServiceAdModal from '../../components/modals/ServiceAdModal'
import { useDispatch,useSelector } from 'react-redux'
import { getServicesList } from '../../data/api/GetServices'
import ServiceEditModal from '../../components/modals/ServiceEditModal'
const Service = () => {
  const [showServiceModal,setShowServiceModal] = useState(false);
  const [editDatas,setEditDatas] = useState(null);
  const [showEditServiceModal,setShowEditServiceModal] = useState(false);
  const [serviceList,setServiceList] = useState([]);
  const userId = useSelector(state=>state.auth.id);
  const fetchServices = async()=>{
    const serviceArray = await getServicesList(userId);
    console.log(serviceArray);
    setServiceList(serviceArray);
  }
  useEffect(()=>{
    fetchServices();
  },[showServiceModal,showEditServiceModal]);
  return (<DrawerContainer>
    <View style={styles.container}>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>সার্ভিস লিস্ট</Text>
      </View>
     <FlatList
     style={{marginTop:50}}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{marginLeft:10,paddingBottom:200}}
     data={serviceList}
     renderItem={({item,index})=>( <View style={{width:'80%',height:150,backgroundColor:Colors.grey30,elevation:10,margin:10,borderRadius:10,paddingLeft:20,justifyContent:'center'}}>
      <Text text70BL color={Colors.white}>{item?.name}</Text>
      <Text marginB-s4 text100BL color={Colors.white}>{item?.details}</Text>
      <Text text90BL color={Colors.white}>{item?.maximum_range} BDT</Text>
      <Pressable onPress={()=>{
        setEditDatas(item);
        console.log(editDatas);
        setShowEditServiceModal(true);
      }} style={{position:'absolute',top:20,right:20}}>
        <FontAwesome name="pencil-square-o" size={20} color={Colors.white} />
      </Pressable>
      
    </View>)}
     />
      <FloatingButton visible={true} button={{label: '+ সার্ভিস এড',backgroundColor:Colors.yellow10 ,onPress: () =>{setShowServiceModal(!showServiceModal)}}} />
      <ServiceAdModal showServiceModal={showServiceModal} setShowServiceModal={setShowServiceModal}  />
      <ServiceEditModal datas={editDatas} showServiceModal={showEditServiceModal} setShowServiceModal={setShowEditServiceModal}  />
    </View>
  </DrawerContainer>)
}

export default Service

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