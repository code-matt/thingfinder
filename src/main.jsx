import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx'

function initApp () {
  console.log('hiiii')
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}

document.addEventListener('deviceready', initApp, false)
