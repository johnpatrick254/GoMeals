import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { StatusBar as StatusBarReact, SafeAreaView } from 'react-native';
import { theme } from '../../utils/theme/theme';
import ImageBG from './imageBG';
import { Title } from 'react-native-paper';
import { AuthContext } from '../../services/auth/auth.context';
import { colors } from '../../utils/styles/colors';
import { AccountCover, AccountContainer, AuthInput, ErrorContainer, AuthButton, Spacer, AnimationWrapper } from './account.styles';
import { NavigationProp } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

export const AuthLanding: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submittedData, setSubmittedData] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const { setIsLoading, setIsError, isLoading, isError: error } = useContext(AuthContext);
    return (
        <ImageBG>
            <AccountCover />
            <AnimationWrapper>
                <LottieView
                    key={'animation'}
                    autoPlay
                    style={{ flex: 1 }}
                    loop
                    resizeMode='cover'
                    source={require('../../../assets/watermelon.json')}
                />
            </AnimationWrapper>
            <AccountContainer>
                <Title>Go Meals</Title>
                <AuthButton
                    icon="lock-open-outline"
                    color="black"
                    mode="contained"
                    onPress={() => navigation.navigate('SignIn')}
                >
                    Login
                </AuthButton>
                <AuthButton
                    icon="lock-open-outline"
                    color="black"
                    mode="contained"
                    onPress={() => navigation.navigate('SignUp')}
                >
                    Register
                </AuthButton>
            </AccountContainer>
        </ImageBG>
    );
}


