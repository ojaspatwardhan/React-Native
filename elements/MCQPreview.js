import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class MCQPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      options: "option1\noption2\noption3\noption4"
    };
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  static navigationOptions = {title: "Preview"}

  componentDidMount() {
    this.setState({id: this.props.navigation.getParam("id")}, this.fetchQuestion)
  }

  fetchQuestion() {
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.id + "/choice")
    .then((response) => response.json()).then(question => this.setState({question: question, options: question.options}, this.testFunction))
  }

  testFunction = () => {
    console.log(this.state.question)
    console.log(this.state.options)
  }

  render() {
    return(
      <ScrollView>
        <Text h3>Preview</Text>
        <View style = {{flexDirection: "row"}}>
          <Text h4>{this.state.question.title}</Text>
          <Text h4 style = {{position: "relative", marginLeft: 15}}>{this.state.question.points}</Text>
        </View>
        <Text h4>{this.state.question.subtitle}</Text>
          <RadioGroup>
            {this.state.options != null && this.state.options.split("\n").map((option, index) => (
              <RadioButton key = {index} value = {index}>
                <Text>{option}</Text>
              </RadioButton>
            ))}
          </RadioGroup>
          <Button
            raised = {true}
            title = "Update Question"
            onPress = {() => this.props.navigation.navigate("updateMCQ", {question: this.state.question, examId: this.props.navigation.getParam("examId")})}
            titleStyle = {{color: "white"}}
            buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
            />
      </ScrollView>
    );
  }
}
