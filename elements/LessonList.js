import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

export default class LessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      courseId: 1,
      moduleId: 1
    };
  }

  componentDidMount() {
    const moduleId = this.props.navigation.getParam("moduleId", 1);
    fetch("http://192.168.1.2:8080/api/module/" + moduleId + "/lesson").then(response => (response.json())).then(lessons => {
      this.setState({lessons: lessons})
    })
  }

  static navigationOptions = {title: "Lessons"}

  render() {
    return(
      <ScrollView>
        {this.state.lessons.map((lesson, index) =>
          <ListItem
            onPress = {() => this.props.navigation.navigate("Widgets", {lessonId: lesson.id})}
            title = {lesson.title}
            key = {index} />
        )}
      </ScrollView>
    );
  }
}
