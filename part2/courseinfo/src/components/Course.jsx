import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

/**
 * It calculates the Sum of property p
 * for each element of array a using
 * a for-loop.
 * @param {*} array
 * @param {*} property
 */
// const sum = (a, p) =>
// {
//     let sum = 0
//     for (let i = 0; i < a.length; i++) {
//         console.log(a[i][p]);
//         sum += a[i][p];
//         // a[i].p doesn't work
//     }
//     return sum
// }

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
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={sum(course.parts,'exercises')} />
  </>

export default Course