import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  //fetching the api key form the .env.local file
  const apiKey = process.env.REACT_APP_API_KEY

  //defining a state for the progress bar above the navbar
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <NavBar />
        {/* setting the height, color and the progress of the loading bar */}
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          {/* defining different routes for all the category, passing progress, api key andas props , setting the key, country and category for each routes */}
          <Route excat path="/newsapp" element={<News setProgress={setProgress} apiKey={apiKey} key="business" country="in" category="business" />} />
          <Route excat path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" country="in" category="entertainment" />} />
          <Route excat path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" country="in" category="health" />} />
          <Route excat path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" country="in" category="science" />} />
          <Route excat path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" country="in" category="sports" />} />
          <Route excat path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;