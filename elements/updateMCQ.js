import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class updateMCQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "",
      descriptionText: "",
      points: 0,
      options: "option1\noption2\noption3\noption4",
      correctOption: 0,
      examId: 1
    };
  }

  componentDidMount() {
    console.log(this.props.navigation.getParam("question"));
    this.setState({
      titleText: this.props.navigation.getParam("question").title,
      descriptionText: this.props.navigation.getParam("question").subtitle,
      points: this.props.navigation.getParam("question").points,
      options: this.props.navigation.getParam("question").options,
      correctOption: this.props.navigation.getParam("question").correctOption
    })
  }

  setQuestion = () => {
    console.log("inside setQuestion")
    this.setState({
      question: {
        examId: this.props.navigation.getParam("examId"),
        id: this.props.navigation.getParam("question").id,
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        options: this.state.options,
        correctOption: this.state.correctOption,
        points: this.state.points,
        type: "MCQ"
      }
    }, this.updateQuestion);
  }

  setCorrectOption(index, value) {
    this.setState({
      correctOption: value + 1
    })
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  updateQuestion() {
    console.log(this.state.question);
    fetch("http://192.168.1.2:8080/api/exam/" + this.props.navigation.getParam("question").id + "/choice", {
       body: JSON.stringify(this.state.question),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'PUT'
   }).then(function (response) {
      return response.json();
    }).then(question => this.setState({question: question}, this.testFunction));
  }

    testFunction() {
      console.log(this.state.question)
      this.props.navigation.navigate("QuestionList")
    }

  render() {
    let choiceIndex = this.props.navigation.getParam("question").correctOption
    choiceIndex = choiceIndex - 1
    return(
      <ScrollView>
        <Text h4>MCQ</Text>
        <View>
          <FormLabel>Title</FormLabel>
          <FormInput value = {this.state.titleText} onChangeText={text => this.updateForm({titleText: text})} />
          <FormValidationMessage>
            Title is required
          </FormValidationMessage>
          <FormLabel>Description</FormLabel>
          <FormInput value = {this.state.descriptionText} onChangeText={text => this.updateForm({descriptionText: text})} />
          <FormValidationMessage>
            Description is required
          </FormValidationMessage>
          <FormLabel>Points</FormLabel>
          <FormInput value = {this.state.points.toString()} onChangeText={text => this.updateForm({points: text})} />
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
            <RadioGroup onSelect = {(index, value) => this.setCorrectOption(index, value)} selectedIndex = {choiceIndex}>
              {this.state.options != null && this.state.options.split("\n").map((option, index) => (
                <RadioButton key = {index} value = {index}>
                  <Text>{option}</Text>
                </RadioButton>
              ))}
            </RadioGroup>
          <View style = {{marginBottom: 10, marginTop: 10, flexDirection: "row"}}>
            <Button
              raised = {true}
              title = "Update Question"
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
        </View>
      </ScrollView>
    );
  }
}
