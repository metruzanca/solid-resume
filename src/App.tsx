import { Component, createSignal, onMount } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import Resume from './pages/Resume';
import Landing from './pages/Landing';
import { GhAppContext } from './lib/ghAppContext';
import OAuth from './pages/OAuth';
import { GH_LOCALSTORAGE_KEY } from './constants';

const App: Component = () => {
  const [ghApp, setGhApp] = createSignal({});

  onMount(() => {
    const data = localStorage.getItem(GH_LOCALSTORAGE_KEY)
    if (data) {
      const ghApp = JSON.parse(data)
      setGhApp(ghApp)
    }
  })

  return (
    <GhAppContext.Provider value={ghApp}>
      <Routes>
        <Route path='/' element={ <Landing/> }/>
        <Route path='/oauth' element={<OAuth onOAuthComplte={setGhApp}/> }/>
        <Route path='/:username' element={ <Resume/> }/>
      </Routes>
    </GhAppContext.Provider>
  )
}

export default App;
