import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { List, Divider } from "react-native-paper";
import { Text } from "../components/typography/text.component"
import { StatusBar as StatusBarReact, SafeAreaView, StyleSheet } from 'react-native';
import {
  CartIconContainer,
  CartIcon,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from "../components/checkout/checkoutstyles";
import { checkoutContext } from "../services/checkout/checkoutcontext";
import { RestaurantInfoCard } from "../components/restaurants/RestaurantInfo";
import { theme } from "../utils/theme/theme";
import styled from "styled-components";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { fetchPaymentParams } from "../services/checkout/checkoutservice";

const Spacer = styled(View)`
margin:16px 0;
`
export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, clearCart, sum } = useContext(checkoutContext);
  const [paying, setPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newSheet, setNewSheet] = useState(false);
  
  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentParams(sum);
    console.log("INTENT", paymentIntent)
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Go Meals, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "John Doe",
      }
    });
    if (!error) {
      setIsLoading(false);
    }
  };
  useEffect(() => { 
    setIsLoading(true);
    initializePaymentSheet().finally(()=>{
      setIsLoading(false);
    } );
  }, [newSheet]);
  const onPay = async () => {
    setIsLoading(true);
    setPaying(true)
  };


  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setPaying(false)
      setIsLoading(false);
      setNewSheet(!newSheet);
    } else {
      setPaying(false)
      setIsLoading(false);
      setNewSheet(!newSheet);
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

 

  if (!cart?.length || !restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeAreaView>
    );
  };

  if (paying && sum) {
    openPaymentSheet();
  };

  return (
    <SafeAreaView style={styles.container}>
      {restaurant?.name && <RestaurantInfoCard
        name={restaurant.name}
        icon={restaurant.icon}
        photos={restaurant.photos}
        vicinity={restaurant.vicinity}
        rating={restaurant.rating}
        opening_hours={restaurant.opening_hours}
      />}
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Text>Your Order</Text>
        <List.Section>
          {cart.map(({ item, price }, i) => {
            return (
              <List.Item
                key={`item-${i}`}
                title={`${item} -   $${price}`}
              />
            );
          })}
        </List.Section>
        <Text>Total: ${sum }</Text>
        <Spacer />
        <Divider />
        <PayButton
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={() => onPay()}
        >
          Proceed to Pay
        </PayButton>
        <Spacer />
        <ClearButton
          disabled={isLoading}
          icon="cart-remove"
          mode="contained"
          onPress={clearCart}
        >
          Clear Cart
        </ClearButton>
        <Spacer />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
    gap: 15,
    paddingTop: StatusBarReact.currentHeight ? StatusBarReact.currentHeight : 1

  }
})