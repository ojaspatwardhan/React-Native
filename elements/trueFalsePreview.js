import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem, CheckBox } from 'react-native-elements';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

export default class essayPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      isTrue: false
    };
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  static navigationOptions = {title: "Preview"}

  componentDidMount() {
    this.setState({id: this.props.navigation.getParam("id"), examId: this.props.navigation.getParam("examId")}, this.fetchQuestion)
  }

  fetchQuestion() {
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/exam/" + this.state.id + "/truefalse")
    .then((response) => response.json()).then(question => this.setState({question: question}, this.testFunction))
  }

  testFunction = () => {
    console.log(this.state.question)
  }

  updateForm = (newState) => {
    this.setState(newState);
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
        <CheckBox title={"True or False?"} onPress={() => this.updateForm({isTrue: !this.state.isTrue})} checked={this.state.isTrue} />
          <Button
            raised = {true}
            title = "Update Question"
            onPress = {() => this.props.navigation.navigate("updateTrueFalse", {question: this.state.question, examId: this.state.examId})}
            titleStyle = {{color: "white"}}
            buttonStyle = {{position: "relative", marginLeft: 10, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
            />
      </View>
    );
  }
}
