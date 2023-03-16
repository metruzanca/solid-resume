import { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import Resume from './pages/Resume';
import Landing from './pages/Landing';



const App: Component = () => {
  return (
    <Routes>
      <Route path='/' element={ <Landing/> }/>
      <Route path='/:username' element={ <Resume/> }/>
    </Routes>
  )
}

export default App;
