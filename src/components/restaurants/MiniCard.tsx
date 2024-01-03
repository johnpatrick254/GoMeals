import React from 'react'
import { RestaurantInfo } from '../../utils/types/restaurant.type'
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Platform } from "react-native"
import styled from 'styled-components';
import { WebView } from 'react-native-webview';

const isAndroid = Platform.OS === 'android'
export const RestMiniCard: React.FC<{ rest: RestaurantInfo }> = ({ rest }) => {
    return (
        <View style={{ padding: 2, height: 200, width: 190, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderRadius:10,rowGap: 5 }}>
            {isAndroid ?
                <WebView
                    source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill' }}
                    style={{ height: 190, width: 190}}
                />
                :
                <Image
                    source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill' }}
                    style={{ height: 190, width: 190 }}
                />}
            <Text>{rest.name}</Text>
        </View>
    )
}
