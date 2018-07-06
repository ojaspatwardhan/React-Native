import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import CourseList from './elements/CourseList';
import ModuleList from './elements/ModuleList';
import LessonList from './elements/LessonList';
import ExamList from './elements/ExamList';
import AssignmentList from './elements/AssignmentList';
import QuestionList from './elements/QuestionList';
import FillInTheBlanks from './elements/FillInTheBlanks';
import MultipleChoice from './elements/MultipleChoice';
import Essay from './elements/Essay';
import TrueOrFalse from './elements/TrueOrFalse';
import Widgets from './elements/Widgets';
import Assignment from './elements/Assignment';
import MCQPreview from './elements/MCQPreview';
import FIBPreview from './elements/FIBPreview';
import essayPreview from './elements/essayPreview';
import trueFalsePreview from './elements/trueFalsePreview';
import updateEssay from './elements/updateEssay';
import updateMCQ from './elements/updateMCQ';
import updateTrueFalse from './elements/updateTrueFalse';
import updateFIB from './elements/updateFIB';
import updateAssignment from './elements/updateAssignment';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {title: "Home"};

  render() {
    return(
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <View style={{padding: 20}}>
          <Button
            onPress={() => this.props.navigation.navigate("CourseList")}
            raised = {true}
            title = "Courses"
            titleStyle = {{color: "white"}}
            iconRight = {{
              name: 'assignment-ind',
              size: 20,
              color: 'white'
            }}
            buttonStyle = {{position: "relative", marginTop: 10, alignItems: "center", backgroundColor: "rgb(50, 242, 235)", borderRadius: 5, borderColor: "transparent"}}
            />
        </View>
      </ScrollView>
    );
  }
}

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  ExamList,
  AssignmentList,
  Widgets,
  Assignment,
  QuestionList,
  MultipleChoice,
  Essay,
  TrueOrFalse,
  FillInTheBlanks,
  MCQPreview,
  FIBPreview,
  essayPreview,
  trueFalsePreview,
  updateEssay,
  updateMCQ,
  updateTrueFalse,
  updateFIB,
  updateAssignment
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
