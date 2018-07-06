import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';

export default class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Title",
      descriptionText: "Description",
      points: 0,
      examId: 1
    };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  static navigationOptions = {title: "Essay"}

  updateForm = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.setState({examId: this.props.navigation.getParam("examId", 1)});
  }

  setQuestion = () => {
    console.log("essay set question");
    this.setState({
      essay: {
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        points: this.state.points,
        type: "Essay"
      }
    }, this.createQuestion);
  }

  createQuestion = () => {
    console.log("essay create question");
    console.log(this.state.essay.title);
    fetch("http://192.168.1.2:8080/api/exam/" + this.state.examId + "/essay", {
       body: JSON.stringify(this.state.essay),
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
        <Text h4>Essay</Text>
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
            title = "Create Question"
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
