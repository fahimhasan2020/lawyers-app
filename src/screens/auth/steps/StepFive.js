import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteTextInput } from '../../../components/Inputs'
import { useTranslation } from 'react-i18next';
const StepFive = () => {
  const {t,i18n} = useTranslation();
  return (
    <View>
      <WhiteTextInput keyboardType='numeric' placeholder={t('totalExperience')} />
      <WhiteTextInput keyboardType='numeric' placeholder={t('age')} />
    </View>
  )
}

export default StepFive

const styles = StyleSheet.create({})