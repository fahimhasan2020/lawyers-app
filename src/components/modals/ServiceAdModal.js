import React,{useEffect, useState} from 'react'
import { View,Modal, Pressable, StyleSheet } from 'react-native'
import { Text,TextField,Slider, Colors,WheelPicker, Picker, FloatingButton } from 'react-native-ui-lib'
import { getCategories } from '../../data/api/GetCategories';
import Entypo from "react-native-vector-icons/Entypo"
import { useDispatch,useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import { serviceCreateApi } from '../../data/api/ServiceCreate';
import { showMessage } from 'react-native-flash-message';
import { fireMessage } from '../../utility/flashMessageFire';
const ServiceAdModal = ({showServiceModal=false,setShowServiceModal=()=>{}}) => {
  const [categories,setCategories] = useState([]);
  const userId = useSelector(state=>state.auth.id);
  const [name,setName] = useState("");
  const [details,setDetails] = useState("");
  const [maximumRange,setMaximumRange] = useState(100);
  const [currentValue,setCurrentValue] = useState(0);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const saveService = async()=>{
    const datas = {
      name:name,
      details:details,
      lawyer_id:userId,
      category_id:currentValue,
      minimum_range:100,
      maximum_range:maximumRange
    };
    
    const createOne = await serviceCreateApi(datas);
    if(createOne?.success){
      fireMessage("Service added successfully","success");
    }else{
      fireMessage("Failed to add service","danger");
    }
    setName("");
    setDetails("");
    setCurrentValue(0);
    setCategories("");
    setShowServiceModal(false);
  }
  const fetchDatas = async()=>{
    const categoriesSystem = await getCategories();
    console.log(categoriesSystem);
    setCategories(categoriesSystem);
  }
  useEffect(()=>{
    fetchDatas();
  },[])
  return (
    <View>
        <Modal
        visible={showServiceModal}
        animationType={'slide'}
        transparent={false} 
        onRequestClose={() => {
           setShowServiceModal(!showServiceModal);
        }}
        >
          <View style={{margin:10,marginHorizontal:20}}>
            <Text text50BL style={{lineHeight:50,textAlign:'center',alignSelf:'center'}}>সার্ভিস এড করুন</Text>
            <TextField
            value={name}
            placeholder={'সার্ভিসের নাম লিখুন'}
            floatingPlaceholder
            floatingPlaceholderColor="#000"
            onChangeText={(value)=>{setName(value)}}
            fieldStyle={{borderBottomColor:'#ddd',borderBottomWidth:2}}
            enableErrors
            validate={['required', (value) => value.length > 6]}
            validationMessage={['Field is required']}
            maxLength={30}
          />
            <TextField
            value={details}
            placeholder={'সার্ভিসের বর্ননা দিন'}
            floatingPlaceholder
            floatingPlaceholderColor="#000"
            onChangeText={(value)=>{setDetails(value)}}
            textAlignVertical="top"
            fieldStyle={{borderBottomColor:'#ddd',borderBottomWidth:2,height:100}}
            enableErrors
            multiline={true}
            validate={['required', (value) => value.length > 6]}
            validationMessage={['Field is required']}
            showCharCounter
            maxLength={100}
          />
          <Text marginT-s3>সর্বনিম্ন পরিষেবা ফি - ( {maximumRange} টাকা )</Text>
          <Slider
            value={0}
            minimumValue={100}
            maximumValue={10000}
            minimumTrackTintColor={Colors.yellow20}
            thumbTintColor={Colors.yellow20}
            onValueChange={(value) => {
              setMaximumRange(parseInt(value));}
            }
          />
          <SelectDropdown
              data={categories}
              onSelect={(selectedItem, index) => {
                setCurrentValue(selectedItem?.id);
                console.log(currentValue);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.b_name) || 'বিভাগ নির্বাচন করুন'}
                    </Text>
                    <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.b_name}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
           <Pressable onPress={()=>saveService()} style={styles.createButton}><Text>সেভ করুন</Text></Pressable>
          </View>
          
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  createButton:{
    backgroundColor:Colors.yellow20,
    padding:10,
    paddingHorizontal:15,
    borderRadius:5,
    elevation:10,marginTop:30,
    textAlign:'center',
    alignItems:'center'
  },
  dropdownButtonStyle: {
    width: '100%',
    marginTop:25,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
})

export default ServiceAdModal
