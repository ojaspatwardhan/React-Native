import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class essayPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {}
    };
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  static navigationOptions = {title: "Preview"}

  componentDidMount() {
    this.setState({id: this.props.navigation.getParam("id"), examId: this.props.navigation.getParam("examId")}, this.fetchQuestion)
  }

  fetchQuestion() {
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.id + "/essay")
    .then((response) => response.json()).then(question => this.setState({question: question}, this.testFunction))
  }

  testFunction = () => {
    console.log(this.state.question)
  }

  render() {
    return(
      <View style = {{marginTop: 20}}>
        <Text h4>Preview</Text>
        <View style = {{flexDirection: "row"}}>
          <Text h4 onChangeText={text => this.updateForm({titleText: text})}>{this.state.question.title}</Text>
          <Text h4 style = {{position: "relative", marginLeft: 40}} onChangeText={text => this.updateForm({points: text})}>{this.state.question.points}</Text>
        </View>
        <Text h4 onChangeText={text => this.updateForm({descriptionText: text})}>{this.state.question.subtitle}</Text>
        <TextInput
          style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 60}}
          multiline = {true}
          editable = {true}
          value = "Enter answer here"
          />
          <Button
            raised = {true}
            title = "Update Question"
            onPress = {() => this.props.navigation.navigate("updateEssay", {question: this.state.question, examId: this.state.examId})}
            titleStyle = {{color: "white"}}
            buttonStyle = {{position: "relative", marginLeft: 10, marginTop: 15, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
            />
      </View>
    );
  }
}
