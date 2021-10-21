import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HeaderButton } from 'react-navigation-header-buttons';

export const NavigationButton = props => (
  <HeaderButton
    {...props}
    iconSize={28}
    IconComponent={MaterialCommunityIcons}
    color={'#0071bc'}
  />
)