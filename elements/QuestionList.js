import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Icon, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      examId: 1,
      selectedIndex: 0
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.refreshFunction = this.refreshFunction.bind(this);
    this.testFunction = this.testFunction.bind(this);
  }

  componentDidMount() {
    this.setState({examId: this.props.navigation.getParam("examId", 1)}, this.fetchQuestions)
  }

  deleteQuestion(questionId) {
    console.log("Inside delete " + questionId)
    fetch("http://192.168.1.2:8080/api/exam/" + questionId + "/questions", {
      method: "DELETE"
    })
    .then(this.fetchQuestions)
  }

  componentWillReceiveProps() {
    console.log("inside componentWillReceiveProps")
  }

  fetchQuestions() {
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.examId + "/questions")
    .then((response) => response.json()).then(questions => this.setState({questions: questions}))
    console.log("inside fetch questions " + this.state.questions)
  }

  refreshFunction() {
    console.log("inside refreshFunction")
    this.fetchQuestions();
  }


  updateIndex = (newIndex) => {
    this.setState({
      selectedIndex: newIndex
    });
    if(newIndex == 0) {
      this.props.navigation.navigate("MultipleChoice", {examId: this.state.examId, refreshFunction: this.refreshFunction})
    }
    else if(newIndex == 1) {
      this.props.navigation.navigate("FillInTheBlanks", {examId: this.state.examId, refreshFunction: this.refreshFunction})
    }
    else if(newIndex == 2) {
      this.props.navigation.navigate("TrueOrFalse", {examId: this.state.examId, refreshFunction: this.refreshFunction})
    }
    else {
      this.props.navigation.navigate("Essay", {examId: this.state.examId, refreshFunction: this.refreshFunction})
    }
  }

  previewQuestion = (questionType, id) => {
    if(questionType == "MCQ") {
      this.props.navigation.navigate("MCQPreview", {id: id, examId: this.state.examId});
    }

    else if(questionType == "FIB") {
      this.props.navigation.navigate("FIBPreview", {id: id, examId: this.state.examId});
    }

    else if(questionType == "Essay") {
      this.props.navigation.navigate("essayPreview", {id: id, examId: this.state.examId});
    }

    else {
      this.props.navigation.navigate("trueFalsePreview", {id: id, examId: this.state.examId});
    }
  }

  testFunction() {
    console.log(this.state.questions)
  }

  render() {
    const buttons = [
      "Multiple Choice", "Fill in the blanks", "True or \n false", "Essay"
    ]
    return(
      <ScrollView>
        <Text h4 style = {{position: "relative", marginLeft: 50}}>Choose a type of question</Text>
        <ButtonGroup
          onPress = {this.updateIndex}
          buttons = {buttons}
          />
        <View>
          <List>
            {this.state.questions.map((question, index) =>
              <ListItem
                title = {question.title}
                subtitle = {question.subtitle}
                onPress = {() => this.previewQuestion(question.type, question.id)}
                rightIcon = {<Icon type = {"feather"} name = {"delete"} onPress = {() => this.deleteQuestion(question.id)} />}
                key = {index}
                />
            )}
          </List>
        </View>
      </ScrollView>
    );
  }
}
