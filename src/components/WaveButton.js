import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const WaveButton = () => {
   
  
    return (
        <Pressable
            style={styles.button}
            onPress={() => console.log('pressed')}
            android_ripple={{color: 'green'}}>
            <Text style={styles.buttonText}>Button</Text>
        </Pressable>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        borderRadius: 8,
        padding: 6,
        height: 50,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'cyan',
      },
      buttonText: {
        fontSize: 16,
        color: 'black',
      },
  });
  
  export default WaveButton;
  