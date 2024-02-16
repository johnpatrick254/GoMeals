import { NavigationProp } from "@react-navigation/native";
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { useContext, useState } from "react";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { CartButton } from "../account/account.styles";
import { checkoutContext } from "../../services/checkout/checkoutcontext";
import React from "react";
import Toast from "react-native-toast-message";

export const DetailsMenu: React.FC<{ navigation: NavigationProp<any, any>, rest }> = ({ navigation, rest }) => {
    const { addCard } = useContext(checkoutContext)
    const onsubmit = (item: string, price: number) => {
        addCard({ item: item, price: price }, rest);
        Toast.show({
            type: 'success',
            text1: 'Added to Cart Successfully',
          });
    }

    const [expanded, setExpanded] = useState(false);
    const [expandedDinner, setDinnerExpanded] = useState(false);
    const [expandedLunch, setLunchExpanded] = useState(false);
    const breakFirst = [{ name: "French Omelette", price: 40 }, { name: "Black Tea", price: 35 }]
    const lunch = [{ name: "Fish w/ Rice", price: 65 }, { name: "Fried Chicken and Fries", price: 99 }, { name: "XXL Pizza", price: 50 }, { name: "Cheese Taco", price: 200 }]
    const dinner = [{ name: "Sushi w/ Rice", price: 129 }, { name: "Fried Eggs and Bacon", price: 70 }, { name: "Special Cheese Taco", price: 315 }]
    return <>
        <ScrollView
            style={{ flex: 1 }}
        >
            <ListItem.Accordion
                content={
                    <>
                        <Icon name={'bread-slice'} type="material-community" style={{ paddingRight: 15 }} size={30} />
                        <ListItem.Content
                        >
                            <ListItem.Title
                            >Break First</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                {breakFirst.map((l, i) => (
                    <ListItem key={i}
                        style={{ paddingLeft: 45 }}
                    >


                        <Text>${l.price}</Text>
                        <Text>{l.name}</Text>
                        <CartButton
                            icon="cart-plus"
                            color="black"
                            mode="contained-tonal"
                            compact={true}
                            onPress={() => onsubmit(l.name, l.price)}
                        >
                            Add
                          
                        </CartButton>
                    </ListItem>
                ))}
            </ListItem.Accordion>
            <ListItem.Accordion
                content={
                    <>
                        <Icon name={'lunch-dining'} style={{ paddingRight: 15 }} size={30} />
                        <ListItem.Content>
                            <ListItem.Title>Lunch</ListItem.Title>
                        </ListItem.Content>
                    </>
                }

                isExpanded={expandedLunch}
                onPress={() => {
                    setLunchExpanded(!expandedLunch);
                }}
            >
                {lunch.map((l, i) => (
                    <ListItem key={i}
                        style={{ paddingLeft: 45 }}
                    >


                        <Text>${l.price}</Text>
                        <Text>{l.name}</Text>
                        <CartButton
                            icon="cart-plus"
                            color="black"
                            mode="contained-tonal"
                            compact={true}
                            onPress={() => onsubmit(l.name, l.price)}
                        >
                            Add
                          
                        </CartButton>
                    </ListItem>
                ))}
            </ListItem.Accordion>
            <ListItem.Accordion
                content={
                    <>
                        <Icon name={'food-turkey'} style={{ paddingRight: 15 }} type="material-community" size={30} />
                        <ListItem.Content>
                            <ListItem.Title>Dinner</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                leftRotate={true}

                isExpanded={expandedDinner}
                onPress={() => {
                    setDinnerExpanded(!expandedDinner);
                }}
            >
                {dinner.map((l, i) => (
                    <ListItem key={i}
                        style={{ paddingLeft: 45 }}
                    >


                        <Text>${l.price}</Text>
                        <Text>{l.name}</Text>
                        <CartButton
                            icon="cart-plus"
                            color="black"
                            mode="contained-tonal"
                            onPress={() => onsubmit(l.name, l.price)}
                            compact={true}
                        >
                            Add
                        </CartButton>
                    </ListItem>
                ))}
            </ListItem.Accordion>
        </ScrollView>
    </>
}