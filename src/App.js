import './categories.styles.scss'
import Home from './routes/home/home.component';
import {Routes, Route} from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const App = () => {

  const Shop = () => {
    return (
      <div>
        <h1>I Am The Shop Page</h1>
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
