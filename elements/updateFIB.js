import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem, CheckBox } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class updateFIB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "",
      descriptionText: "",
      points: 0,
      examId: 1,
      blanks: ""
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
      blanks: this.props.navigation.getParam("question").blanks
    })
  }

  setQuestion = () => {
    console.log("tf set question");
    this.setState({
      fillInTheBlanks: {
        examId: this.props.navigation.getParam("examId"),
        id: this.props.navigation.getParam("question").id,
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        points: this.state.points,
        blanks: this.state.blanks,
        type: "FIB"
      }
    }, this.updateQuestion);
  }

  updateForm = (newState) => {
    this.setState(newState);
  }

  updateQuestion() {
    console.log(this.state.fillInTheBlanks);
    fetch("http://192.168.1.2:8080/api/exam/" + this.props.navigation.getParam("question").id + "/blank", {
       body: JSON.stringify(this.state.fillInTheBlanks),
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
        <Text h4>Fill in the blanks</Text>
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
            onChangeText = {blanks => this.updateForm({blanks: blanks})}
            value = {this.state.blanks}
            />
        </View>
        <View style = {{marginTop: 20}}>
          <Text h4>Preview</Text>
          <View style = {{flexDirection: "row"}}>
            <Text h4>{this.state.titleText}</Text>
            <Text h4 style = {{position: "relative", marginLeft: 40}}>{this.state.points}</Text>
          </View>
          <Text h4>{this.state.descriptionText}</Text>
          <View style = {{marginTop: 20}}>
            {this.state.blanks != '' && this.state.blanks.split("\n").map((blank, index) => {
              var firstBracket = blank.split("[")
              var secondBracket = firstBracket[1].split("]")
              return(
                <View style = {{flexDirection: "row"}} key = {index}>
                  <Text h4>{firstBracket[0]}</Text>
                  <TextInput
                    style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 40, width: 60}}
                    multiline = {true}
                    editable = {true}
                    />
                  <View key = {index}>
                    <Text h4>{secondBracket[1]}</Text>
                  </View>
                </View>
              );
            })}
          </View>
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
              onPress = {() => this.props.navigation.goBack()}
              titleStyle = {{color: "white"}}
              buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(244, 66, 113)", borderRadius: 5, borderColor: "transparent"}}
              />
        </View>
      </ScrollView>
    );
  }
}
