import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

/**
 * It calculates the Sum of the values
 * of a certain property for each
 * element of array a using reduce.
 * @param {*} array
 * @param {*} property
 */
const sum = (array, property) => {
    return array.reduce((sum, element) => sum + element[property], 0);
}

const Course = ({course}) =>
  <>
    <Header level={2} title={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={sum(course.parts,'exercises')} />
  </>

export default Course

// This component "Course" was already in a seperate module.
// The other components are also transfered to seperate
// .jsx files inside the "components" package.