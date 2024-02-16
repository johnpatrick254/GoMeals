import React from 'react'
import { Image, View } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import star from '../../../assets/star';
import open from '../../../assets/open';
import { SvgXml } from 'react-native-svg';
import { RestaurantInfo } from '../../utils/types/restaurant.type';
import { Favorite } from './Favorite';
import { API_KEY} from "@env";

export const Title = styled.Text`
color:${(props: any) => props.theme.colors.ui.primary};
font-size:${(props: any) => props.theme.fontSizes.title};
font-weight:${(props: any) => props.theme.fontWeights.bold};
font-family:${(props: any) => props.theme.fonts.heading};
`

const Icon = styled.Image`
height:18px;
width:18px
`
export const RestaurantCard = styled(Card)`
background-color:${(props: any) => props.theme.colors.bg.primary};
padding:${(props: any) => props.theme.sizes[0]};
margin-bottom:${(props: any) => props.theme.sizes[1]};
position:relative;
`
const RestaurantCardCover = styled(Card.Cover)`
background-color:#fff;
position:relative;
`
const Info = styled(View)`
padding:${(props: any) => props.theme.sizes[0]};
`
const Rating = styled(View)`
flex-direction:row;
`
const RatingWrapper = styled(View)`
padding:${(props: any) => props.theme.sizes[0]} 0;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const Address = styled(Text)`
font-family:${(props: any) => props.theme.fonts.body};
font-size:${(props: any) => props.theme.fontSizes.caption};
`
const IsClosed = styled(Text)`
font-family:${(props: any) => props.theme.fonts.body};
font-size:${(props: any) => props.theme.fontSizes.caption};
color:red;
`
export const RestaurantInfoCard: React.FC<Pick<RestaurantInfo, "name" | "icon" | "photos" | "vicinity" | "rating" | "opening_hours">> = ({
    name,
    icon,
    photos,
    vicinity,
    rating,
    opening_hours
}) => {
    console.log(opening_hours)
    const stars = rating ?? 1
    const ratingStars = Array.from(new Array(Math.ceil(+stars)))
    return (
        <RestaurantCard
        >
            <Favorite
                rest={
                    {
                        name,
                        icon,
                        photos,
                        vicinity,
                        rating,
                        opening_hours
                    }
                }
            />
            <RestaurantCardCover source={{ uri: (photos[0]?.photo_reference != "") ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${API_KEY}&photo_reference=${photos[0].photo_reference}` : 'https://media.cnn.com/api/v1/images/stellar/prod/230320152734-02-mexican-foods-birria.jpg?c=original&q=h_618,c_fill' }} />
            <Info>
                <Title>{name}</Title>
                <RatingWrapper>
                    <Rating>
                        {
                            ratingStars.map((_, i) => {
                                return <SvgXml key={i} xml={star} width={20} height={20} />
                            })
                        }
                    </Rating>
                    <Rating style={{ gap: 10 }}>
                        {
                            opening_hours && (opening_hours?.open_now) ? <SvgXml xml={open} width={20} height={20} /> : <IsClosed>TEMPORARILY CLOSED</IsClosed>
                        }
                        <Icon source={{ uri: icon }} />
                    </Rating>
                </RatingWrapper>
                <Address>{vicinity}</Address>

            </Info>
        </RestaurantCard>

    )
}
