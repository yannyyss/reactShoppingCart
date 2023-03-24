import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar/Navbar'
import Store from './pages/Store/Store'
import { ShoppinCartContextProvider } from './context/ShoppinCartContext'

function App() {
  return (
    <ShoppinCartContextProvider>
      <Navbar/>
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Store/>}/>
        </Routes>
      </Container>
    </ShoppinCartContextProvider>
  )
}

export default App
