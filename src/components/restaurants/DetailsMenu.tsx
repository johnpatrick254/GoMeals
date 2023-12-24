import { NavigationProp } from "@react-navigation/native";
import { Avatar, Icon, ListItem } from '@rneui/themed';
import { useState } from "react";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native";

export const DetailsMenu: React.FC = () => {
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
     
                         </ListItem>
                ))}
            </ListItem.Accordion>
        </ScrollView>
    </>
}