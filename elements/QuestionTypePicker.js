import React from 'react';
import { Picker } from 'react-native';

class QuestionTypePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: 0
    };
  }
  render() {
    return(
      <Picker
        selectedValue={this.state.questionType}
        onValueChange={(itemValue, itemIndex) => this.setState({questionType: itemValue})}
        >
       <Picker.Item value="MC" label="Multiple choice" />
       <Picker.Item value="ES" label="Essay" />
       <Picker.Item value="TF" label="True or false" />
       <Picker.Item value="FB" label="Fill in the blanks" />
      </Picker>
    );
  }
}

export default QuestionTypePicker
