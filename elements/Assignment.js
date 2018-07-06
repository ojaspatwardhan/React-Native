import React from 'react';
import { Alert, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, List, ListItem, Button } from 'react-native-elements';

export default class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      answerText: "Enter answer",
      lessonId: 1
    };
    this.fetchAssignments = this.fetchAssignments.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
  }

  componentDidMount() {
    let lid = this.props.navigation.getParam("lessonId", 1);
    this.setState({lessonId: lid}, this.fetchAssignments);
  }

  componentWillReceiveProps(newProps) {
    this.fetchAssignments();
  }

  fetchAssignments() {
    console.log(this.state.lessonId)
    fetch("http://192.168.1.2:8080/api/lesson/" + this.state.lessonId + "/assignment")
    .then((response) => response.json()).then(assignments => this.setState({assignments: assignments}))
  }

  deleteAssignment(assignmentId) {
    var deleteURL = "http://192.168.1.2:8080/api/assignment/AID"
    deleteURL = deleteURL.replace("AID", assignmentId)
    console.log(deleteURL)
    fetch(deleteURL, {
      method: "DELETE"
    }).then((response) => this.fetchAssignments())
  }

  testFunction() {
    console.log(this.state.assignments)
  }

  static navigationOptions = {title: "Assignment"}

  render() {
    return(
      <ScrollView>
        {this.state.assignments.map((assignment, index) => (
          <View style = {{marginTop: 20}} key = {index}>
            <Text h2>Preview</Text>
            <View style = {{flexDirection: "row"}}>
              <Text h3 style = {{marginTop: 15}}>{assignment.title}</Text>
              <Text h3 style = {{marginTop: 15, position: "relative", left: 100}}>{assignment.points}</Text>
            </View>
            <Text h5 style = {{marginTop: 15}}>{assignment.description}</Text>
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
              <View style = {{marginBottom: 10, marginTop: 10, flexDirection: "row"}}>
                <Button
                  raised = {true}
                  title = "Submit"
                  titleStyle = {{color: "white"}}
                  buttonStyle = {{position: "relative", right: 15, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
                  />
                  <Button
                    raised = {true}
                    title = "Delete Assignment"
                    onPress = {() => this.deleteAssignment(assignment.id)}
                    titleStyle = {{color: "white"}}
                    buttonStyle = {{position: "relative", right: 15, backgroundColor: "rgb(244, 66, 113)", borderRadius: 5, borderColor: "transparent"}}
                    />
                    <Button
                      raised = {true}
                      title = "Update"
                      onPress = {() => this.props.navigation.navigate("updateAssignment", {id: assignment.id, assignment: assignment, lessonId: this.state.lessonId})}
                      titleStyle = {{color: "white"}}
                      buttonStyle = {{position: "relative", right: 15, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
                      />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}
