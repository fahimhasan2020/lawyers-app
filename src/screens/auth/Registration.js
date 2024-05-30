import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFive from './steps/StepFive';
import StepFour from './steps/StepFour';
const Registration = () => {
  return (
    <SafeAreaView style={{flex: 1,paddingTop:50}}>
        <Text style={styles.mainHeader}>Completed registration step 0</Text>
    <ProgressSteps 
    activeLabelColor="orange"
    activeStepNumColor="orange"
    completedStepNumColor="orange"
    disabledStepNumColor="black"
    activeStepIconBorderColor="orange">
        <ProgressStep 
        label="Info" 
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnText="Next"
        nextBtnTextStyle={styles.nextBtnTextStyle}
        
        >
            <StepTwo />
        </ProgressStep>
        <ProgressStep 
        label="Address"
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnTextStyle={styles.nextBtnTextStyle}
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepThree />
        </ProgressStep>
        <ProgressStep 
        label="Details"
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnTextStyle={styles.nextBtnTextStyle}
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepFour />
        </ProgressStep>
        <ProgressStep 

        label="Verification"
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        nextBtnStyle={styles.nextBtnStyle}
        finishBtnText="Register"
        nextBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepFive />
        </ProgressStep>
    </ProgressSteps>
</SafeAreaView>
  )
}

export default Registration

const styles = StyleSheet.create({
    mainHeader:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        marginVertical:10,
        alignSelf:'center'

    },
    nextBtnStyle:{
        alignItems:'center',
        color: '#393939',
        justifyContent:'center',
        paddingHorizontal:20,
        height:40,
        borderRadius:10,
        margin:10,
        elevation:10,
        backgroundColor:'white'
    },
    nextBtnTextStyle:{
        color: '#393939'
    }
})