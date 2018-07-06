import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.1.2:8080/api/course",{method: "GET"}).then(response => (response.json())).then(courses => {
      this.setState({courses: courses});
    })
  }

  static navigationOptions = {title: "Courses"}

  render() {
    return(
      <ScrollView>
        {this.state.courses.map((course, index) =>
          <ListItem
            onPress={() => this.props.navigation.navigate("ModuleList", {courseId: course.id})}
            title={course.title}
            key={index} />
        )}
      </ScrollView>
    );
  }
}
