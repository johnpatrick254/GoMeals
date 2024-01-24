import React from 'react';
import { RestaurantInfo } from '../../utils/types/restaurant.type';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Favorite } from './Favorite';
import { theme } from '../../utils/theme/theme';

const isAndroid = Platform.OS === 'android';

export const RestMiniCard: React.FC<{ rest: Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours"> }> = ({ rest }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.secondary,
        padding:8,
        maxWidth:120,
        height:145,
        borderRadius:5
        
      }}>
      <Favorite key={rest.name} rest={rest} />
      {isAndroid ? (
        <WebView
          source={{
            uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill',
          }}
          style={{
            flex: 0,
            backgroundColor: theme.colors.bg.secondary,
            height: 100,
            width: 130,
            resizeMode:'cover',
            padding: 0,
            borderRadius: 4,
            margin: 0,
          }}
          containerStyle={{ margin: 0, flex: 0 }}
        />
      ) : (
        <Image
          source={{
            uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill',
          }}
          style={{ height: 190, width: 190 }}
        />
      )}
      <Text>{rest.name}</Text>
    </View>
  );
};
