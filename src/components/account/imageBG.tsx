import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { StatusBar as StatusBarReact, SafeAreaView } from 'react-native';


 
const ImageBG:React.FC<{children:React.ReactNode}> = ({children}) => (
  <View style={styles.container}>
    <ImageBackground source={require("../../../assets/home-bg.jpg")} resizeMode="cover" style={styles.image}>
      {children}
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity:1,
        zIndex:-1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        alignContent: "center",
        paddingTop: StatusBarReact.currentHeight ? StatusBarReact.currentHeight : 1
    
      },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

});

export default ImageBG;