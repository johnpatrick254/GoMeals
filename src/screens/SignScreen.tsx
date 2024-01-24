import React, { useContext, useState } from 'react';
import ImageBG from '../components/account/imageBG';
import { AccountContainer, AccountCover, AuthButton, AuthInput, ErrorContainer, ErrorText } from '../components/account/account.styles';
import { AuthContext } from '../services/auth/auth.context';
import { signIn } from '../services/auth/auth.service';
import { ActivityIndicator, Title } from 'react-native-paper';


export const SignInScreen: React.FC = () => {
  const { isError, isLoading, setIsAuthenticated, setIsError } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>('');

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const user = await signIn(email, password);
      if (user) setIsAuthenticated(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setIsError(true);
      setError(error.message.toString());
      console.log(error)
    };
  };
  return (
    <ImageBG>
      <AccountCover />
      <AccountContainer>
        <Title>Go Meals</Title>
        <AuthInput
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
              Login
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


