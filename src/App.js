import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import Timer from "./Timer"

function App() {
  const timestamps = [1644486028000]
  const [time, setTIme] = useState(timestamps)
  
console.log('hello')
  return (
    <div className="App">
      {
        time.map((x) => (
          <Timer key={x} x={x} />
        ))
      }
  
    </div>
  );
}

export default App;
