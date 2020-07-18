import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { rows } from './data/data'
import Thead from './components/thead'
import Tbody from './components/tbody'

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1>健康に関する調査</h1>
      <table>
        <Thead />
        <Tbody rows={rows} />
      </table>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)