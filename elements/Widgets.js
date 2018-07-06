import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      lessonId: 1
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  static navigationOptions = {title: "Widgets"}

  updateIndex = (newIndex) => {
    newIndex == 0 ? this.props.navigation.navigate("AssignmentList", {lessonId: this.state.lessonId}) : this.props.navigation.navigate("ExamList", {lessonId: this.state.lessonId})
  }

  componentDidMount() {
    const lessonId = this.props.navigation.getParam("lessonId", 1);
    this.setState({lessonId: lessonId})
  }

  render() {
    const buttons = [
      "Assignment",
      "Exam"
    ]
    return(
      <ScrollView>
        <ButtonGroup
          onPress = {this.updateIndex}
          buttons = {buttons}
          />
      </ScrollView>
    );
  }
}
