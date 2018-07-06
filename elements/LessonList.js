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
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/module/" + moduleId + "/lesson").then(response => (response.json())).then(lessons => {
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
