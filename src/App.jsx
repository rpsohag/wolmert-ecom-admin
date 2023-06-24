import { RouterProvider } from 'react-router-dom'
import './App.css'
import "./assets/css/bootstrap.min.css"
import "./assets/css/font-awesome.min.css"
import "./assets/css/feathericon.min.css"
import "./assets/css/select2.min.css"
import "./assets/css/style.css"
import router from './router/router'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
