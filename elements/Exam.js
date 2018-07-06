import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

const questions = [
  {
    title: "Question 1", subtitle: "MCQ", icon: "list"
  },
  {
    title: "Question 2", subtitle: "Fill in the blank", icon: "code"
  },
  {
    title: "Question 3", subtitle: "MCQ", icon: "check"
  }
]

export default class Exam extends React.Component {
  render() {
    return(
      <View style={{padding: 10}}>
        <Text h4>List</Text>
        {questions.map((question, index) => (
          <ListItem key={index} leftIcon={{name: question.icon}} title={question.title} subtitle={question.subtitle} />
        ))}
      </View>
    );
  }
}
