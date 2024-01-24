import React from 'react';
import ImageBG from './imageBG';
import { Title } from 'react-native-paper';
import { AccountCover, AccountContainer, AuthInput, ErrorContainer, AuthButton, Spacer, AnimationWrapper } from './account.styles';
import { NavigationProp } from '@react-navigation/core';
import LottieView from 'lottie-react-native';

export const AuthLanding: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
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


