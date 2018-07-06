import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem, CheckBox } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class updateTrueFalse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      points: 0,
      isTrue: false
    };
    this.updateQuestion = this.updateQuestion.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  componentDidMount() {
    console.log(this.props.navigation.getParam("question"));
    this.setState({
      titleText: this.props.navigation.getParam("question").title,
      descriptionText: this.props.navigation.getParam("question").subtitle,
      points: this.props.navigation.getParam("question").points,
      isTrue: this.props.navigation.getParam("question").true
    })
  }

  setQuestion = () => {
    console.log("tf set question");
    this.setState({
      trueFalse: {
        examId: this.props.navigation.getParam("examId"),
        id: this.props.navigation.getParam("question").id,
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        points: this.state.points,
        true: this.state.isTrue,
        type: "TF"
      }
    }, this.updateQuestion);
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  updateQuestion() {
    console.log(this.state.trueFalse);
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/exam/" + this.props.navigation.getParam("question").id + "/truefalse", {
       body: JSON.stringify(this.state.trueFalse),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'PUT'
   }).then(function (response) {
      return response.json();
    }).then(question => this.setState({question: question}, this.callbackFunction));
  }

  callbackFunction() {
    // console.log(this.state.question)
    this.props.navigation.navigate("QuestionList", {status: "updated"})
  }

  render() {
    return(
      <ScrollView>
        <Text h4>True or False</Text>
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
          <CheckBox title={"The answer is " + this.state.isTrue} onPress={() => this.updateForm({isTrue: !this.state.isTrue})} checked={this.state.isTrue} />
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
    );
  }
}
