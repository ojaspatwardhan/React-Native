import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class FIBPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      blanks: "2 + 2 = [four=4]\n5 + [four=4] = 9"
    };
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  componentDidMount() {
    this.setState({id: this.props.navigation.getParam("id")}, this.fetchQuestion)
  }

  fetchQuestion() {
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.id + "/blank")
    .then((response) => response.json()).then(question => this.setState({question: question, blanks: question.blanks}, this.testFunction))
  }

  testFunction = () => {
    console.log(this.state.question)
    console.log(this.state.blanks)
  }

  render() {
    return(
      <View style = {{marginTop: 20}}>
        <Text h4>Preview</Text>
        <View style = {{flexDirection: "row"}}>
          <Text h4>{this.state.question.title}</Text>
          <Text h4 style = {{position: "relative", marginLeft: 40}}>{this.state.question.points}</Text>
        </View>
        <Text h4>{this.state.question.subtitle}</Text>
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
        <Button
          raised = {true}
          title = "Update Question"
          onPress = {() => this.props.navigation.navigate("updateFIB", {question: this.state.question, examId: this.state.examId})}
          titleStyle = {{color: "white"}}
          buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
          />
      </View>
    );
  }
}
