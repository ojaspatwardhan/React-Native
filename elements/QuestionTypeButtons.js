import React from 'react';
import { ButtonGroup } from 'react-native-elements';

class QuestionTypeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestionIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex = (newIndex) => {
    this.setState({
      selectedQuestionIndex: newIndex
    });
  }

  render() {
    const buttons = [
      "Multiple Choice", "Fill in the blanks", "True or \n false"
    ]
    return(
      <ButtonGroup
        selectedIndex = {this.state.selectedQuestionIndex}
        onPress = {this.updateIndex}
        buttons = {buttons}
        containerStyle = {{height: 75}} />
    );
  }
}

export default QuestionTypeButtons;
