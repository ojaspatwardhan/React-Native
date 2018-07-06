let _singleton = Symbol();
// const COURSE_API_URL = 'http://localhost:8080/api/course';
// const COURSE_API_URL_2 = "http://localhost:8080/api/course/findCourseByCourseName/courseName"

const COURSE_API_URL = 'https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course';
const COURSE_API_URL_2 = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course/findCourseByCourseName/courseName"


export default class AssignmentService {
   constructor(singletonToken) {
       if (_singleton !== singletonToken)
           throw new Error('Cannot instantiate directly.');
   }

   static get instance() {
       if(!this[_singleton])
           this[_singleton] = new AssignmentService(_singleton);
       return this[_singleton]
   }

   createAssignment(assignment, lessonId) {
     return fetch("http://192.168.1.5:8080/api/lesson" + lessonId + "/assignment", {
        body: JSON.stringify(assignment),
        headers: {
           'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(function (response) {
        return response.json();
  });
 }

  findAllAssignments() {
       return fetch("http://192.168.1.5:8080/api/assignment")
           .then(function(response){
               return response.json();
           });
   }
}
