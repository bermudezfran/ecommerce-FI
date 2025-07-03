import { IndexRoute } from './router/IndexRoute'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <IndexRoute />
    </BrowserRouter>
  )
}

export default App
