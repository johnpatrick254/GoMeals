import React, { useContext, useRef } from 'react'
import { NavigationProp } from "@react-navigation/native";
import styled from 'styled-components'
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors } from '../utils/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../services/auth/auth.context';

const CameraScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
    const [type, setType] = useState(CameraType.back);
    const { user } = useContext(AuthContext)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const snap = async () => {
        const photo = await cameraRef.current?.takePictureAsync();
        if (photo) {
            await AsyncStorage.setItem(`profile-${user.id}`, photo.uri)
            console.log((photo));
            navigation.goBack()
        } else {
            navigation.goBack()
        }

    }
    const cameraRef = useRef<Camera | null>(null)
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera ref={camera => cameraRef.current = camera} style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={snap}>
                        <Avatar.Icon size={70} icon={'camera'} color='orange' style={{ backgroundColor: colors.bg.primary }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Avatar.Icon size={70} icon={'camera-flip'} color='orange' style={{ backgroundColor: colors.bg.primary }} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );




}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
export default CameraScreen;