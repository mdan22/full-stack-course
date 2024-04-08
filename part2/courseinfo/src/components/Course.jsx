import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

/**
 * It calculates the Sum of property p
 * for each element of array a using
 * a for-loop.
 * This might be used again - so it's
 * defined in the Course component.
 * @param {*} a
 * @param {*} p 
 */
const calculateSum = (a, p) =>
{
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        console.log(a[i][p]);
        sum += a[i][p];
        // a[i].p doesn't work
    }
    return sum
}

const Course = ({course}) =>
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={calculateSum(course.parts,'exercises')} />
  </>

export default Course