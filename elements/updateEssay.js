import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class updateEssay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      titleText: "",
      descriptionText: "",
      points: 0,
      examId: 1
    };
    this.updateQuestion = this.updateQuestion.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    console.log(this.props.navigation.getParam("question"));
    this.setState({
      titleText: this.props.navigation.getParam("question").title,
      descriptionText: this.props.navigation.getParam("question").subtitle,
      points: this.props.navigation.getParam("question").points
    })
  }

  setQuestion = () => {
    console.log("essay set question");
    this.setState({
      essay: {
        examId: this.props.navigation.getParam("examId"),
        id: this.props.navigation.getParam("question").id,
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        points: this.state.points,
        type: "Essay"
      }
    }, this.updateQuestion);
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  updateQuestion() {
    console.log(this.state.essay);
    fetch("http://192.168.1.2:8080/api/exam/" + this.props.navigation.getParam("question").id + "/essay", {
       body: JSON.stringify(this.state.essay),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'PUT'
   }).then(function (response) {
      return response.json();
    }).then(question => this.setState({question: question}, this.callbackFunction));
  }

  handleNavigation() {
    console.log("Inside handleNavigation")
    const refreshFunction = this.props.navigation.state.params.refreshFunction;
    console.log(refreshFunction)
    console.log(typeof refreshFunction)
    if(typeof refreshFunction === 'function') {
      refreshFunction();
      this.props.navigation.navigate("QuestionList");
    }
  }

  callbackFunction() {
    // console.log(this.state.question)
    this.props.navigation.navigate("QuestionList", {status: "updated"})
  }

  render() {
    return(
      <ScrollView>
        <ScrollView>
          <Text h4>Essay</Text>
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
          </View>
          <View style = {{marginTop: 20}}>
            <Text h4>Preview</Text>
            <View style = {{flexDirection: "row"}}>
              <Text h4>{this.state.titleText}</Text>
              <Text h4 style = {{position: "relative", marginLeft: 40}}>{this.state.points}</Text>
            </View>
            <Text h4>{this.state.descriptionText}</Text>
            <TextInput
              style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 60}}
              multiline = {true}
              editable = {true}
              value = "Enter answer here"
              />
          </View>
          <View style = {{marginBottom: 10, marginTop: 10, flexDirection: "row"}}>
            <Button
              raised = {true}
              title = "Update Question"
              onPress = {this.setQuestion}
              titleStyle = {{color: "white"}}
              buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
              />
              <Button
                raised = {true}
                title = "Cancel"
                onPress ={() => this.props.navigation.goBack()}
                titleStyle = {{color: "white"}}
                buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(244, 66, 113)", borderRadius: 5, borderColor: "transparent"}}
                />
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}
