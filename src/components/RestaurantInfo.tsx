import React from 'react'
import { Image, View } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import star from '../../assets/star';
import open from '../../assets/open';
import { SvgXml } from 'react-native-svg';

export type RestaurantInfoProps = {
    name: string;
    icon: string;
    photo: string[];
    address: string;
    isOpenNow: boolean;
    rating: (1 | 2 | 3 | 4 | 5)
    isClosedTemp: boolean;
    cousine: string
}
const Title = styled.Text`
color:${(props:any)=>props.theme.colors.ui.primary};
font-size:${(props:any)=>props.theme.fontSizes.title};
font-weight:${(props:any)=>props.theme.fontWeights.bold};
font-family:${(props:any)=>props.theme.fonts.heading};
`
const RestaurantCard = styled(Card)`
background-color:${(props:any)=>props.theme.colors.bg.primary};
padding:${(props:any)=>props.theme.sizes[0]};
margin-bottom:${(props:any)=>props.theme.sizes[1]};
`
const RestaurantCardCover = styled(Card.Cover)`
background-color:#fff;
`
const Info = styled(View)`
padding:${(props:any)=>props.theme.sizes[0]};
`
const Rating = styled(View)`
flex-direction:row;
`
const RatingWrapper = styled(View)`
padding:${(props:any)=>props.theme.sizes[0]} 0;
flex-direction:row;
justify-content:space-between;
align-items:center;
`
const Address = styled(Text)`
font-family:${(props:any)=>props.theme.fonts.body};
font-size:${(props:any)=>props.theme.fontSizes.caption};
`
const IsClosed = styled(Text)`
font-family:${(props:any)=>props.theme.fonts.body};
font-size:${(props:any)=>props.theme.fontSizes.caption};
color:red;
`
export const RestaurantInfoCard: React.FC<RestaurantInfoProps> = ({
    name,
    icon,
    photo,
    address,
    rating,
    cousine,
    isOpenNow,
    isClosedTemp
}) => {
 
    const ratingStars = Array.from(new Array(Math.floor(rating)))

    return (
        <RestaurantCard
        >
            {/* <Card.Title  title={name} subtitle={cousine} /> */}
            <RestaurantCardCover source={{ uri: photo[0] }} />
            <Info>
            <Title>{name}</Title>
            <RatingWrapper>

            <Rating>

            {
                ratingStars.map((_,i)=>{
                    return <SvgXml key={i} xml={star} width={20} height={20}/>
                })
                
            }
            </Rating>
            <Rating style={{gap:10}}>
            {
                (isOpenNow && !isClosedTemp) ? <SvgXml xml={open} width={20} height={20} /> : <IsClosed>TEMPORARILY CLOSED</IsClosed>
            }
             <SvgXml  xml={icon} width={20} height={20}/>
            </Rating>
            </RatingWrapper>
            <Address>{address}</Address>
            </Info>

        </RestaurantCard>

    )
}
