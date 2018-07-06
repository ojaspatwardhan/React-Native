import React from 'react';
import { Alert, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Text, List, ListItem, Button } from 'react-native-elements';

export default class updateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "",
      descriptionText: "",
      answerText: "Enter answer",
      points: "",
      lessonId: 1,
      assignment: {}
    };
    this.updateAssignment = this.updateAssignment.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  componentDidMount() {
    console.log(this.props.navigation.getParam("assignment"))
    console.log(this.props.navigation.getParam("lessonId"))
    const lid = this.props.navigation.getParam("lessonId", 1);
    this.setState({
      lessonId: lid,
      titleText: this.props.navigation.getParam("assignment").title,
      descriptionText: this.props.navigation.getParam("assignment").description,
      points: this.props.navigation.getParam("assignment").points
    });
  }

  setAssignment = () => {
    console.log("inside set")
    this.setState({
      assignment: {
        id: this.props.navigation.getParam("assignment").id,
        lessonId: this.props.navigation.getParam("lessonId"),
        title: this.state.titleText,
        description: this.state.descriptionText,
        points: this.state.points,
        answer: this.state.answerText
      }
    }, this.updateAssignment);
  }

  updateAssignment() {
    console.log("Inside create")
    console.log(this.state.assignment)
    console.log(this.state.lessonId)
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/lesson/" + this.props.navigation.getParam("lessonId") + "/assignment", {
       body: JSON.stringify(this.state.assignment),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'PUT'
   }).then(function (response) {
      return response.json();
    }).then(assignment => this.setState({assignment: assignment}, this.callbackFunction));
   }

   callbackFunction() {
     console.log(this.state.question)
     this.props.navigation.navigate("Assignment", {status: "updated"})
   }

  render() {
    return(
      <ScrollView style={{marginTop: 15, padding: 5}}>
        <TextInput
          style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 60}}
          value = {this.state.titleText}
          multiline = {true}
          placeholder = {this.state.titleText}
          onChangeText = {(text) => this.setState({titleText: text})}
          />
          <TextInput
            style = {{marginTop: 15, backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 60}}
            value = {this.state.descriptionText}
            multiline = {true}
            placeholder = {this.state.descriptionText}
            onChangeText = {(text) => this.setState({descriptionText: text})}
            />
            <FormLabel>Points</FormLabel>
            <TextInput
              style = {{marginTop: 15, backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 30}}
              value = {this.state.points}
              multiline = {true}
              placeholder = {this.state.points}
              onChangeText = {(points) => this.setState({points: points})}
              />
          <View style = {{marginTop: 20}}>
            <Text h2>Preview</Text>
            <View style = {{flexDirection: "row"}}>
              <Text h3 style = {{marginTop: 15}}>{this.state.titleText}</Text>
              <Text h3 style = {{marginTop: 15, position: "relative", left: 100}}>{this.state.points}</Text>
            </View>
            <Text h5 style = {{marginTop: 15}}>{this.state.descriptionText}</Text>
            <Text h4 style = {{marginTop: 15}}>Assignment answer</Text>
            <TextInput
              style = {{marginTop: 15, backgroundColor: "white", height: 80, borderColor: "gray", borderWidth: 1}}
              value = {this.state.answerText}
              onChangeText = {(text) => this.setState({answerText: text})}
              placeholder = {this.state.answerText}
              />
            <View style = {{marginTop: 10}}>
              <Text h4>Upload file</Text>
              <Button
                raised = {true}
                icon = {{name: "add-circle-outline", color: "white", size: 20}}
                onPress = {() => Alert.alert("Select file")}
                title = "Choose file"
                titleStyle = {{color: "white"}}
                buttonStyle = {{marginTop: 5, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
                />
            </View>
            <View style = {{marginTop: 10}}>
              <Text h4>Submit a link</Text>
              <TextInput style = {{marginTop: 10, backgroundColor: "white", borderColor: "gray", borderWidth: 1, height: 30}} />
              <Button
                raised = {true}
                onPress = {this.setAssignment}
                title = "Update Assignment"
                titleStyle = {{color: "white"}}
                iconRight = {{
                  name: 'assignment-turned-in',
                  size: 20,
                  color: 'white'
                }}
                buttonStyle = {{position: "relative", marginTop: 15, marginBottom: 10, alignItems: "center", backgroundColor: "rgb(61, 234, 247)", borderRadius: 5, borderColor: "transparent"}}
                />
            </View>
          </View>
      </ScrollView>
    );
  }
}
