import './App.css'
import { DiscogsApiContextProvider } from './discogsApi/useDiscogsApi';
import { Route, Routes } from 'react-router-dom';
import { Albums } from './pages/Albums/Albums';
import { AlbumRelease } from './pages/AlbumRelease/AlbumRelease';
import { Artist } from './pages/Artist/Artist';

function App() {
  return (
    <Routes>
      <Route path="/"
        element={
          <DiscogsApiContextProvider>
            <Albums/>
          </DiscogsApiContextProvider>
        }>
      </Route>
      <Route path="/release/:release_id"
        element={
          <DiscogsApiContextProvider>
            <AlbumRelease/>
          </DiscogsApiContextProvider>
        }>
      </Route>
      <Route path="/artist/:artist_id"
        element={
          <DiscogsApiContextProvider>
            <Artist/>
          </DiscogsApiContextProvider>
        }>
      </Route>
    </Routes>
  )
}

export default App
