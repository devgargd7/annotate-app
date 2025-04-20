import { useState } from 'react'
import './App.css'
import AnnotationTool from './components/AnnotationTool'

function App() {
  return (
    <div className="app-container">
      <h1>Image Annotation Tool</h1>
      <AnnotationTool />
    </div>
  )
}

export default App
