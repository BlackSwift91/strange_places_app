import React from 'react'

import { HeaderButton } from 'react-navigation-header-buttons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const NavigationButton = props => (
  <HeaderButton
    {...props}
    iconSize={28}
    IconComponent={MaterialCommunityIcons}
    color={'#0071bc'}
  />
)