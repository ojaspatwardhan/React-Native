import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button, Text, List, ListItem } from 'react-native-elements';

let questions = [
  {id: 1, title: "Question 1", subtitle: "MCQ"},
  {id: 2, title: "Question 2", subtitle: "Fill in the blanks"},
  {id: 3, title: "Question 3", subtitle: "True or false"}
]

export default class ExamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      lessonId: 1,
      titleText: "Enter title",
      descriptionText: "Enter exam description",
      widgetType: "Exam",
      points: "0"
    };
    this.fetchExams = this.fetchExams.bind(this);
    this.createExam = this.createExam.bind(this);
    this.setExam = this.setExam.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
    this.testFunction = this.testFunction.bind(this);
  }

  static navigationOptions = {title: "Exams"}

  componentDidMount() {
    this.setState({lessonId: this.props.navigation.getParam("lessonId", 1)}, this.fetchExams);
  }

  fetchExams() {
    console.log(this.state.lessonId)
    console.log("inside fetch exams")
    fetch("http://192.168.1.2:8080/api/lesson/" + this.state.lessonId + "/exam")
    .then((response) => response.json()).then(exams => this.setState({exams: exams}, this.testFunction))
  }

  deleteExam(examId) {
    console.log("Inside delete " + examId)
    fetch("http://192.168.1.2:8080/api/exam/" + examId, {
      method: "DELETE"
    })
    .then(this.fetchExams)
  }

  setExam() {
    console.log("Inside set exam")
    this.setState({
      exam: {
        title: this.state.titleText,
        description: this.state.descriptionText,
        widgetType: this.state.widgetType,
        points: this.state.points
      }
    }, this.createExam)
  }

  createExam() {
    console.log("inside create")
    fetch("http://192.168.1.2:8080/api/lesson/" + this.state.lessonId + "/exam", {
       body: JSON.stringify(this.state.exam),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'POST'
   }).then(function (response) {
      return response.json();
    }).then(this.fetchExams);
  }

  testFunction() {
    console.log(this.state.exams)
  }

  render() {
    return(
      <ScrollView>
        <List>
        {this.state.exams.map((exam, index) =>
            <ListItem
              subtitle = {exam.description}
              title = {exam.title}
              key = {index}
              rightIcon = {<Icon type = {"feather"} name = {"delete"} onPress = {() => this.deleteExam(exam.id)} />}
              onPress = {() => this.props.navigation.navigate("QuestionList", {examId: exam.id})}
              />
        )}
        </List>
        <View style = {{marginTop: 10}}>
          <TextInput
            style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 20}}
            value = {this.state.titleText}
            multiline = {false}
            placeholder = {this.state.titleText}
            onChangeText = {(text) => this.setState({titleText: text})}
            />
            <TextInput
              style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 20, marginTop: 15}}
              value = {this.state.descriptionText}
              multiline = {false}
              placeholder = {this.state.descriptionText}
              onChangeText = {(text) => this.setState({descriptionText: text})}
              />
              <FormLabel>Points</FormLabel>
              <TextInput
                style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 20, marginTop: 15}}
                value = {this.state.points}
                multiline = {false}
                placeholder = "Points"
                onChangeText = {(text) => this.setState({points: text})}
                />
              <FormValidationMessage>
                Points is required
              </FormValidationMessage>
          <Button
            raised = {true}
            title = "Create Exam"
            onPress = {this.setExam}
            titleStyle = {{color: "white"}}
            buttonStyle = {{position: "relative", marginTop: 20, marginRight: 5, backgroundColor: "rgb(72, 242, 112)", borderRadius: 5, borderColor: "transparent"}}
            />
        </View>
      </ScrollView>
    );
  }
}
