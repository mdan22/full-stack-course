import Header from "./Header"
import Content from "./Content"
// import Total from "./Total"
// sum not yet needed in part 2.1

const Course = ({course}) =>
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    {/* <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} /> */}
  </>

export default Course