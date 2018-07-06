import React from 'react';
import { ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';

export default class ScreenA extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {title: "Screen A"};

  render() {
    return(
      <ScrollView>
        <Text h3>Screen A</Text>
        <Button title="Home" onPress={() => this.props.navigation.goBack()} />
      </ScrollView>
    );
  }
}
