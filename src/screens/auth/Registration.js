import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFive from './steps/StepFive';
import StepFour from './steps/StepFour';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import {useFormik} from 'formik';
const Registration = () => {
    const { t, i18n } = useTranslation();
    const [registrationStep,setRegistrationStep] = useState(1);
    const registrationPayload = useSelector(state => state.auth.registrationPayload);
    const [validationErrorsStepOne,setValidationErrorsStepOne] = useState(false);
    const [validationErrorsStepTwo,setValidationErrorsStepTwo] = useState(false);
    const [validationErrorsStepThree,setValidationErrorsStepThree] = useState(false);
    const [validationErrorsStepFour,setValidationErrorsStepFour] = useState(false);
    const InfoSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address.').required("email is required"),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required.'),
        firstName: Yup.string('Invalid first name')
          .min(1, 'First name is too short!')
          .max(20, 'First name is too long!')
          .required('First name is required.'),
        lastName: Yup.string('Invalid last name')
          .min(1, 'Last name is too short!')
          .max(20, 'Last name is too long!')
          .required('Last name is required.'),
      });
    
      const infoForm =
        useFormik({
          validationSchema: InfoSchema,
          initialValues: {firstName:registrationPayload?.firstName, lastName:registrationPayload?.lastName,email:registrationPayload?.email,phoneNumber:registrationPayload?.phoneNumber},
          validateOnBlur: true,
          validateOnChange: true,
        });
    
    const onNextFirst = async()=>{
     await infoForm.handleChange("firstName")(registrationPayload?.firstName);
     await infoForm.handleChange("lastName")(registrationPayload?.lastName);
     await infoForm.handleChange("email")(registrationPayload?.email);
     await infoForm.handleChange("phoneNumber")(registrationPayload?.phoneNumber);
     const errors =  await infoForm.validateForm();
     if (Object.keys(errors).length > 0) {
        setValidationErrorsStepOne(true);
      } else {
        setValidationErrorsStepOne(false);
        setRegistrationStep(2);
      }
    }
    const addressSchema = Yup.object().shape({
        address: Yup.string().required("Address is required"),
        lat: Yup.string().required('Apply address from suggested list.'),
        lng: Yup.string().required('Apply address from suggested list.'),
      });
    
      const addressForm =
        useFormik({
          validationSchema: addressSchema,
          initialValues: {address:registrationPayload?.address, lat:registrationPayload?.lat, lng:registrationPayload?.lng},
          validateOnBlur: true,
          validateOnChange: true,
        });
    
    const onNextSecond = async()=>{
     try{
            console.log("address",registrationPayload?.address,"latitude",registrationPayload?.lat,"longitude",registrationPayload.lng);
            await addressForm.handleChange("address")(registrationPayload?.address);
            await addressForm.handleChange("lat")(registrationPayload?.lat.toString());
            await addressForm.handleChange("lng")(registrationPayload?.lng.toString());
            const errors =  await addressForm.validateForm();
            if (Object.keys(errors).length > 0) {
                setValidationErrorsStepTwo(true);
            } else {
                setValidationErrorsStepTwo(false);
                setRegistrationStep(3);
            }
     }catch(e){
        console.log("error is",e);
     }
     
    }

    const DetailsSchema = Yup.object().shape({
        profilePicture: Yup.string().required("Profile picture is required"),
        degrees: Yup.string().required("Degrees is required"),
        visit: Yup.number().required("Consultancy fee is required"),
        description: Yup.string().required("Lawyer details is required"),
        gender: Yup.string().required("Gender is required"),
      });
    
      const detailsForm =
        useFormik({
          validationSchema: DetailsSchema,
          initialValues: {profilePicture:registrationPayload?.profilePicture,visit:registrationPayload?.visit,degrees:registrationPayload?.degrees,description:registrationPayload?.description,gender:registrationPayload?.gender},
          validateOnBlur: true,
          validateOnChange: true,
        });
    
    const onNextThird = async()=>{
     await detailsForm.handleChange("profilePicture")(registrationPayload?.profilePicture);
     await detailsForm.handleChange("degrees")(registrationPayload?.degrees);
     await detailsForm.handleChange("visit")(registrationPayload?.visit);
     await detailsForm.handleChange("description")(registrationPayload?.description);
     await detailsForm.handleChange("gender")(registrationPayload?.gender);
     const errors =  await detailsForm.validateForm();
     if (Object.keys(errors).length > 0) {
        setValidationErrorsStepThree(true);
      } else {
        setValidationErrorsStepThree(false);
        setRegistrationStep(4);
      }
    }

    const VerificationSchema = Yup.object().shape({
        experience: Yup.number().required("Experience is required"),
        age: Yup.number().required("Age is required"),
        llbCertificate: Yup.string().required("LLB certificate is required"),
      });
    
      const verificationForm =
        useFormik({
          validationSchema: VerificationSchema,
          initialValues: {experience:registrationPayload?.experience,age:registrationPayload?.age,llbCertificate:registrationPayload?.llbCertificate,llMCertificate:registrationPayload?.llMCertificate},
          validateOnBlur: true,
          validateOnChange: true,
        });
    
    const onNextFourth = async()=>{
     await verificationForm.handleChange("experience")(registrationPayload?.experience);
     await verificationForm.handleChange("age")(registrationPayload?.age);
     await verificationForm.handleChange("llbCertificate")(registrationPayload?.llbCertificate);
     await verificationForm.handleChange("llMCertificate")(registrationPayload?.llMCertificate);
     const errors =  await verificationForm.validateForm();
     if (Object.keys(errors).length > 0) {
        setValidationErrorsStepFour(true);
      } else {
        completeRegistration();
        setValidationErrorsStepFour(false);
      }
    }

    const completeRegistration = async()=>{
        console.log("completed", registrationPayload);
    }
  return (
    <SafeAreaView style={{flex: 1,paddingTop:50}}>
        <Text style={styles.mainHeader}>{t('registrationStep')} {registrationStep}</Text>
    <ProgressSteps
    activeLabelColor="orange"
    activeStepNumColor="orange"
    completedStepNumColor="orange"
    disabledStepNumColor="black"
    activeStepIconBorderColor="orange">
        <ProgressStep 
        onNext={onNextFirst}
        errors={validationErrorsStepOne}
        label={t('info')} 
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnText={t('next')}
        nextBtnTextStyle={styles.nextBtnTextStyle}
        
        >
            <StepTwo errors={infoForm?.errors} />
        </ProgressStep>
        <ProgressStep 
        errors={validationErrorsStepTwo}
        onNext={onNextSecond}
        onPrevious={()=>{setRegistrationStep(1)}}
        label={t('address')}
        nextBtnText={t('next')}
        previousBtnText={t('previous')}
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnTextStyle={styles.nextBtnTextStyle}
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepThree errors={addressForm?.errors} />
        </ProgressStep>
        <ProgressStep 
        onNext={onNextThird}
        errors={validationErrorsStepThree}
        onPrevious={()=>{setRegistrationStep(2)}}
        previousBtnText={t('previous')}
        nextBtnText={t('next')}
        label={t('details')}
        nextBtnStyle={styles.nextBtnStyle} 
        nextBtnTextStyle={styles.nextBtnTextStyle}
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepFour errors={detailsForm?.errors} />
        </ProgressStep>
        <ProgressStep 
        errors={validationErrorsStepFour}
        onSubmit={onNextFourth}
        onPrevious={()=>{setRegistrationStep(3)}}
        previousBtnText={t('previous')}
        label={t('verification')}
        previousBtnStyle={styles.nextBtnStyle} 
        previousBtnTextStyle={styles.nextBtnTextStyle}
        nextBtnStyle={styles.nextBtnStyle}
        finishBtnText={t('register')}
        nextBtnTextStyle={styles.nextBtnTextStyle}
        >
            <StepFive errors={verificationForm?.errors} />
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