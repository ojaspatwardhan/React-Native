import React from 'react';
import { View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const Icons = () => (
  <View>
    <Icon
      raised
      reverse
      color = "#517fa4"
      name = "ios-american-football"
      type = "ionicon"
      onPress={() => Alert.alert("Hello")} />
  </View>
)

export default Icons
