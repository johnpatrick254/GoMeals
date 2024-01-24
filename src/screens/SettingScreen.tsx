import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../services/auth/auth.context'
import { getAuth } from 'firebase/auth'
import { NavigationProp } from "@react-navigation/native";
import { Avatar, Button, List } from 'react-native-paper'
import styled from 'styled-components'
import { colors } from '../utils/styles/colors'
import { FadeInView } from '../components/shared/FadeInView'

const SettingItem = styled(List.Item)`
padding:${props => props.theme.space[3]}
`
const AvatarContainer = styled(View)`
display:flex;
align-items:center;
gap:16px;
padding:${props => props.theme.space[3]}
`
const SettingScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const logout = () => {
    const auth = getAuth()
    auth.signOut();
  }



  return (
    <SafeAreaView>
      <FadeInView>
        <AvatarContainer>
          <Avatar.Icon size={180} icon={'human'} color='orange' style={{ backgroundColor: colors.bg.primary }} />
          <Text style={{ fontWeight: 'bold' }} >{user.email.toString()}</Text>
        </AvatarContainer>
        <List.Section>
          <SettingItem
            key={'fav'}
            title='Favorites'
            description='View your favorites'
            left={(props) => <List.Icon {...props} icon='heart' color='black' />}
            onPress={() => navigation.navigate('Favourites')}
          />
          <SettingItem
            key={'logout'}

            title='Logout'
            left={(props) => <List.Icon {...props} icon='door' color='black' />}
            onPress={logout}
          />

        </List.Section>
      </FadeInView>
    </SafeAreaView>
  )
}
export default SettingScreen