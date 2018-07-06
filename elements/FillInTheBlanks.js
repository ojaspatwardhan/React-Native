import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ButtonGroup, Button, Text, List, ListItem } from 'react-native-elements';

export default class FillInTheBlanks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Title",
      descriptionText: "Description",
      points: 0,
      examId: 1,
      blanks: "2 + 2 = [four=4]\n5 + [four=4] = 9"
    };
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  static navigationOptions = {title: "Fill in the blanks"}

  updateForm = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.setState({examId: this.props.navigation.getParam("examId", 1)});
  }

  setQuestion = () => {
    this.setState({
      fillInTheBlanks: {
        title: this.state.titleText,
        subtitle: this.state.descriptionText,
        points: this.state.points,
        blanks: this.state.blanks,
        type: "FIB"
      }
    }, this.createQuestion);
  }

  createQuestion = () => {
    console.log("fib create question");
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/exam/" + this.state.examId + "/blank", {
       body: JSON.stringify(this.state.fillInTheBlanks),
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
        <Text h4>Fill in the blanks</Text>
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
            title = "Create Question"
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
