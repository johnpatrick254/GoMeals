import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';

export const MainSearchBar = styled(Searchbar)`
background-color:${(props: any) => props.theme.colors.bg.primary};
`;
