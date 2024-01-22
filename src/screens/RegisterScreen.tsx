import React, { useContext, useEffect, useState } from 'react';
import ImageBG from '../components/account/imageBG';
import { AccountContainer, AccountCover, AuthButton, AuthInput, ErrorContainer, ErrorText } from '../components/account/account.styles';
import { AuthContext } from '../services/auth/auth.context';
import { signUp } from '../services/auth/auth.service';
import { ActivityIndicator } from 'react-native-paper';


export const SignUpScreen: React.FC = () => {
    const {  setIsAuthenticated, setIsError } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<any>('');
    const [loading, setLoading] = useState(false);

    const validateInput = () => {
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
        } else {
            setError(null)
        };
    }
    const onSubmit = async () => {
        try {
            setLoading(true);
            const user = await signUp(email, password);
            if (user) setIsAuthenticated(true);
            console.log(user);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setIsError(true);
            setError(error.message.toString());
            console.log(error)
        };
    };
    useEffect(() => {
        validateInput();
    }, [passwordConfirm])

    return (
        <ImageBG>
            <AccountCover />
            <AccountContainer>
                <AuthInput
                    label='First Name'
                    autoCapitalize="none"
                    value={firstName}
                    onChangeText={(e: React.SetStateAction<string>) => setFirstName(e)}
                />
                <AuthInput
                    label='Last Name'
                    autoCapitalize="none"
                    value={secondName}
                    onChangeText={(e: React.SetStateAction<string>) => setSecondName(e)}
                />
                <AuthInput
                    textContentType='emailAddress'
                    label='E-mail'
                    autoCapitalize="none"
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(e: React.SetStateAction<string>) => setEmail(e)}
                />
                <AuthInput
                    label='Password'
                    value={password}
                    textContentType='password'
                    autoCapitalize="none"
                    secureTextEntry
                    secure
                    onChangeText={(e: React.SetStateAction<string>) => setPassword(e)}

                />
                <AuthInput
                    label='Password confirm'
                    value={passwordConfirm}
                    textContentType='password'
                    autoCapitalize="none"
                    secureTextEntry
                    secure
                    onChangeText={(e: React.SetStateAction<string>) => {
                        setPasswordConfirm(e);
                    }
                    }

                />
                {error &&
                    <ErrorContainer>
                        <ErrorText>
                            {error}
                        </ErrorText>
                    </ErrorContainer>}
                {
                    !loading
                    ?
                    <AuthButton
                        icon="lock-outline"
                        color="black"
                        mode="contained"
                        onPress={onSubmit}
                    >
                        Register
                    </AuthButton>
                    :
                    <ActivityIndicator
                    color='blue'
                    />
                }
            </AccountContainer>
        </ImageBG>
    );
}


