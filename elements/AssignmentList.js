import React from 'react';
import { Alert, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FormLabel, Text, List, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Enter title",
      descriptionText: "Enter description",
      answerText: "Enter answer",
      points: "0",
      lessonId: 1,
      assignments: []
    };
    this.assignmentService = AssignmentService.instance;
    this.createAssignment = this.createAssignment.bind(this);
    this.findAllAssignments = this.findAllAssignments.bind(this);
    this.setAssignment = this.setAssignment.bind(this);
  }

  static navigationOptions = {title: "Create Assignment"}

  componentDidMount() {
    const lessonId = this.props.navigation.getParam("lessonId", 1);
    this.setState({lessonId: lessonId});
  }

  setAssignment() {
    this.setState({
      assignment: {
        title: this.state.titleText,
        description: this.state.descriptionText,
        points: this.state.points,
        answer: this.state.answerText
      }
    }, this.createAssignment);
  }

  createAssignment() {
    console.log("Inside create")
    console.log(this.state.assignment)
    console.log(this.state.lessonId)
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/lesson/" + this.state.lessonId + "/assignment", {
       body: JSON.stringify(this.state.assignment),
       headers: {
          'Content-Type': 'application/json'
       },
       method: 'POST'
   }).then(function (response) {
      return response.json();
    }).then(Alert.alert("Assignment saved"));
   }

   previewAssignments = () => {
     this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId});
   }

  findAllAssignments() {
    this.assignmentService.findAllAssignments().then((assignments) => {
      this.setState({assignments: assignments})
    });
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
              <View style = {{marginBottom: 10, marginTop: 10, flexDirection: "row"}}>
                <Button
                  raised = {true}
                  title = "Submit"
                  titleStyle = {{color: "white"}}
                  buttonStyle = {{position: "relative", right: 15, backgroundColor: "rgb(103, 160, 252)", borderRadius: 5, borderColor: "transparent"}}
                  />
                <Button
                  raised = {true}
                  title = "Cancel"
                  onPress = {() => this.props.navigation.goBack()}
                  titleStyle = {{color: "white"}}
                  buttonStyle = {{position: "relative", right: 15, backgroundColor: "rgb(244, 66, 113)", borderRadius: 5, borderColor: "transparent"}}
                  />
                <Button
                  onPress = {this.setAssignment}
                  raised = {true}
                  title = "Save Assignment"
                  titleStyle = {{color: "white"}}
                  buttonStyle = {{position: "relative", right: 15,backgroundColor: "rgb(72, 242, 112)", borderRadius: 5, borderColor: "transparent"}}
                  />
              </View>
              <Button
                onPress = {this.previewAssignments}
                raised = {true}
                title = "Preview Assignments"
                titleStyle = {{color: "white"}}
                iconRight = {{
                  name: 'assignment',
                  size: 20,
                  color: 'white'
                }}
                buttonStyle = {{position: "relative", marginBottom: 10, alignItems: "center", backgroundColor: "rgb(61, 234, 247)", borderRadius: 5, borderColor: "transparent"}}
                />
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center'
  },
});
