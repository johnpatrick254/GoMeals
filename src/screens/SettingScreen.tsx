import React, { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../services/auth/auth.context'
import { getAuth } from 'firebase/auth'
import { NavigationProp,useFocusEffect } from "@react-navigation/native";
import { Avatar, Button, List } from 'react-native-paper'
import styled from 'styled-components'
import { colors } from '../utils/styles/colors'
import { FadeInView } from '../components/shared/FadeInView'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingItem = styled(List.Item)`
padding:${props => props.theme.space[3]};
fontweight:bold;
`
const AvatarContainer = styled(View)`
display:flex;
align-items:center;
gap:16px;
padding:${props => props.theme.space[3]}
`
const SettingScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState<string | null>(null)
  const logout = () => {
    const auth = getAuth()
    auth.signOut();
  }
  const getProfilePic = async (currentUser:any) => {
    const photoURI = await AsyncStorage.getItem(`profile-${currentUser.id}`)
    setPhoto(photoURI);
  }
  useFocusEffect(() => {
    getProfilePic(user);
  })

  return (
    <SafeAreaView>
      <FadeInView>
        <AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("camera")}>
            {
              photo
                ?
                <Avatar.Image size={150} source={{ uri: photo }} style={{ backgroundColor: colors.bg.primary }} />
                :
                <Avatar.Icon size={150} icon={'account-edit'} color='orange' style={{ backgroundColor: colors.bg.primary }} />
            }
          </TouchableOpacity>
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