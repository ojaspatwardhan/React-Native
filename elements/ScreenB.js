import React from 'react';
import { ScrollView, Button } from 'react-native';
import { Text } from 'react-native-elements';

export default class ScreenB extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {title: "Screen B"};

  render() {
    return(
      <ScrollView>
        <Text h3>Screen B</Text>
        <Button title="Home" onPress={() => this.props.navigation.goBack()} />
      </ScrollView>
    );
  }
}
