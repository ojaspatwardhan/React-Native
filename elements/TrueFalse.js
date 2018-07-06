import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox } from 'react-native-elements';

export default class TrueFalse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      points: 0,
      isTrue: false
    };
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={text => this.updateForm({title: text})} />
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>
        <FormInput onChangeText={text => this.updateForm({description: text})} />
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>
        <CheckBox title={"The answer is " + this.state.isTrue} onPress={() => this.updateForm({isTrue: !this.state.isTrue})} checked = {this.state.isTrue} />
        <Button title="Save" backgroundColor="green" color="white" />
        <Button title="Cancel" backgroundColor="red" color="white" />
        <Text h3>Preview</Text>
        <Text h4>{this.state.title}</Text>
        <Text h4>{this.state.description}</Text>
      </View>
    );
  }
}
