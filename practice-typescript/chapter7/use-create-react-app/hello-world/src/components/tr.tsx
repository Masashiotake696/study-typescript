import * as React from 'react'
import { Row } from '../types/data'

const Component: React.FC<Row> = props => (
  <tr>
    <th>{props.age}</th>
    {props.answers.map((answer, i) => { // (parameter) answer: number
      if (answer === null) {
        return <td key={i}>-</td>
      }
      return <td key={i}>{`${answer * 100}%`}</td>
    })}
  </tr>
)

export default Component