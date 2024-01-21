import styled from "styled-components/native";
import { Button, MD3Theme, Text, TextInput, useTheme } from "react-native-paper";
import { colors } from "../../utils/styles/colors";
import { View } from "react-native";
import { theme } from "../../utils/theme/theme";

export const AccountCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  display:flex;
  flex-direction:column;
  flex-wrap:nowrap;
  justify-content:center;
  align-items:center;
  margin-left:auto;
  margin-right:auto;
  border-radius:16px;
  gap:16px;
  width:75%;
  padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[4]};
  margin-top: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]};
width: 250px;

`;

export const AuthInput = styled(TextInput)`
  width: 250px;
  margin-bottom:16px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;
export const ErrorText = styled(Text)`
  font-size: 16px;
  color:red;
`;

export const ErrorContainer = styled(View)`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]};
  margin-bottom: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]};
`;

export const AnimationWrapper = styled(View)`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props: { theme: { space: any[]; }; }) => props.theme.space[2]};
`;

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const getVariant = (position: string | number, size: string | number, theme: { colors?: { brand: { primary: string; secondary: string; muted: string; }; ui: { primary: string; secondary: string; tertiary: string; quaternary: string; disabled: string; error: string; success: string; }; bg: { primary: string; secondary: string; }; text: { primary: string; secondary: string; disabled: string; inverse: string; error: string; success: string; }; }; space: any; lineHeights?: { title: string; copy: string; }; sizes?: string[]; fonts?: { body: string; heading: string; monospace: string; }; fontSizes?: { caption: string; button: string; body: string; title: string; h5: string; h4: string; h3: string; h2: string; h1: string; }; fontWeights?: { regular: number; medium: number; bold: number; }; }) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];
  return `${property}:${value}`;
};

const SpacerView = styled(View)`
    ${({ variant }) => variant};
  `;

export const Spacer = ({ position, size, children }) => {

  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}> {children} </SpacerView>
};

Spacer.defaultProps = {
  position: "top",
  size: "small",
};