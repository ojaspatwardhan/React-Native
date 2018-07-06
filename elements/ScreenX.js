import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class ScreenX extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {title: "Screen X"};

  render() {
    const parameter = this.props.navigation.getParam("parameter", "value");
    return(
      <ScrollView>
        <Text h3>Screen {parameter}</Text>]
      </ScrollView>
    );
  }
}
