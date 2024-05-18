import { StatusBar,Dimensions,StyleSheet } from "react-native";
import Sizes from "./Sizes";
import { colors } from "../constants/colors";
export const Styles = StyleSheet.create({
    fullPage:{
        flex:1,
        backgroundColor:'#1a0436',
    },
    contentContainer:{
        flex:1,
        marginTop:-200,
        
    },
    detailBox:{height:130,width:120,backgroundColor:'#fff',shadowColor: "#000",margin:10,
    shadowOffset: {
        width: 0,
        height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,borderRadius:10,padding:5},
    fullPageWhite:{
        flex:1,
        marginTop: -(StatusBar.currentHeight+80),
        backgroundColor:'#fff',
    },
    title1:{
        fontSize:17,fontWeight:'bold',letterSpacing:1.2
    },
    searchInput:{
        width:Sizes.fullWidth-60,
        backgroundColor:'#fff',
        borderRadius:15,
        paddingLeft:30

    },
    buttons:{
        padding:10,backgroundColor:colors.white,borderRadius:20,flexDirection:'row',alignSelf:'flex-end',marginRight:18,elevation:10
    },
    buttonsColor:{
        color:colors.blackDeep
    },
    whiteInput:{
        width:'80%',
        borderRadius:20,
        backgroundColor:'#fff',
        padding:10,
        paddingLeft:90,
        marginBottom:20,
        fontSize:16
    },
    prefixContainer:{position:'absolute',top:15,left:55,flexDirection:'row',alignItems:'center',height:20,justifyContent:'center'},
    prefixContainerText:{fontSize:16,color:'#000',marginTop:-8,marginLeft:5},
    div:{
        padding:20,
        width:Sizes.fullWidth,
        marginTop:20,
        marginBottom:20
    },
    logoTitle:{
        color:'#ffffff',
        fontSize:30,
        fontWeight:'bold'
    },
    logoTitleSmall:{
        color:'#ffffff',
        fontSize:12,
        fontWeight:'bold'
    },
    displayFlex:{flexDirection:'row'},
    alignRight:{
        alignItems:'flex-end'
    },
    justifyBetween:{justifyContent:'space-between'},
    alignCenter:{
        alignItems:'center'
    },
    logo:{
        height:100,
        width:100
    }
}) 

export default Styles;