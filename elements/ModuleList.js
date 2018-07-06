import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

export default class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
      courseId: 1
    };
  }

  componentDidMount() {
    const courseId = this.props.navigation.getParam("courseId", 1);
    this.setState({courseId: courseId});
    fetch("https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course/" + courseId + "/module", {method: "GET"}).then(response => (response.json())).then(modules => {
      this.setState({modules: modules});
    })
  }

  static navigationOptions = {title: "Modules"}

  render() {
    return(
      <ScrollView>
        {this.state.modules.map((module, index) =>
          <ListItem
            onPress={() => this.props.navigation.navigate("LessonList", {courseId: this.state.courseId, moduleId: module.id})}
            title={module.title}
            key={index} />
        )}
      </ScrollView>
    );
  }
}
