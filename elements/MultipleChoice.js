import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Title",
      descriptionText: "Description",
      points: 0,
      options: "option1\noption2\noption3\noption4",
      correctOption: 0,
      examId: 1
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.setState({examId: this.props.navigation.getParam("examId", 1)})
  }

  setCorrectOption(index, value) {
    this.setState({
      correctOption: value + 1
    })
  }

  setQuestion = () => {
    console.log("inside setQuestion")
    this.setState({
      question: {
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        options: this.state.options,
        correctOption: this.state.correctOption,
        points: this.state.points,
        type: "MCQ"
      }
    }, this.createQuestion);
  }

  createQuestion() {
    console.log("inside create")
    console.log("Exam Id is" + this.state.examId)
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.examId + "/choice", {
       body: JSON.stringify(this.state.question),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'POST'
   }).then(function (response) {
      return response.json();
    }).then(this.handleNavigation);
  }

  handleNavigation() {
    console.log("Inside handleNavigation")
    const refreshFunction = this.props.navigation.state.params.refreshFunction;
    console.log(refreshFunction)
    console.log(typeof refreshFunction)
    if(typeof refreshFunction === 'function') {
      refreshFunction();
      this.props.navigation.goBack();
    }
  }

  render() {
    return(
      <ScrollView>
        <Text h4>MCQ</Text>
        <View>
          <FormLabel>Title</FormLabel>
          <FormInput onChangeText={text => this.updateForm({titleText: text})} />
          <FormValidationMessage>
            Title is required
          </FormValidationMessage>
          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={text => this.updateForm({descriptionText: text})} />
          <FormValidationMessage>
            Description is required
          </FormValidationMessage>
          <FormLabel>Points</FormLabel>
          <FormInput onChangeText={text => this.updateForm({points: text})} />
          <FormValidationMessage>
            Points is required
          </FormValidationMessage>
          <TextInput
            style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 60}}
            multiline = {true}
            editable = {true}
            value = {this.state.options}
            onChangeText = {text => this.updateForm({options: text})}
            />
          <FormLabel>Select Correct Choice</FormLabel>
            <RadioGroup onSelect = {(index, value) => this.setCorrectOption(index, value)} selectedIndex = {this.state.correctOption}>
              {this.state.options != null && this.state.options.split("\n").map((option, index) => (
                <RadioButton key = {index} value = {index}>
                  <Text>{option}</Text>
                </RadioButton>
              ))}
            </RadioGroup>
          <View style = {{marginBottom: 10, marginTop: 10, flexDirection: "row"}}>
            <Button
              raised = {true}
              title = "Create Question"
              onPress = {this.setQuestion}
              titleStyle = {{color: "white"}}
              buttonStyle = {{position: "relative", marginLeft: 50, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
              />
              <Button
                raised = {true}
                title = "Cancel"
                onPress ={() => this.props.navigation.goBack()}
                titleStyle = {{color: "white"}}
                buttonStyle = {{position: "relative", marginLeft: 15, backgroundColor: "rgb(244, 66, 113)", borderRadius: 5, borderColor: "transparent"}}
                />
          </View>
          <Text h3>Preview</Text>
          <View style = {{flexDirection: "row"}}>
            <Text h4>{this.state.titleText}</Text>
            <Text h4 style = {{position: "relative", marginLeft: 15}}>{this.state.points}</Text>
          </View>
          <Text h4>{this.state.descriptionText}</Text>
          <FormLabel>Choices</FormLabel>
            <RadioGroup>
              {this.state.options != null && this.state.options.split("\n").map((option, index) => (
                <RadioButton key = {index} value = {index}>
                  <Text>{option}</Text>
                </RadioButton>
              ))}
            </RadioGroup>
        </View>
      </ScrollView>
    );
  }
}
