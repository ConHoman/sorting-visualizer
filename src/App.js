import React, { useState, useEffect } from "react";
import { bubbleSort, selectionSort, quickSort } from "./utils";
import "./styles.css";

function App() {
  const [array, setArray] = useState(generateRandomArray(10));  // The array to be sorted
  const [algorithm, setAlgorithm] = useState("bubble");  // Default sorting algorithm
  const [isSorting, setIsSorting] = useState(false);  // Flag to disable UI while sorting
  const [animations, setAnimations] = useState([]);  // Store all swap steps for animation
  const [currentStep, setCurrentStep] = useState(0);  // Track the current animation step

  // Generate a random array
  function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  }

  // Function to trigger sorting
  const handleSort = () => {
    let animationsData = [];
    switch (algorithm) {
      case "selection":
        animationsData = selectionSort([...array]);
        break;
      case "quick":
        animationsData = quickSort([...array]);
        break;
      default:
        animationsData = bubbleSort([...array]);
    }
    setAnimations(animationsData);
    setIsSorting(true);
    setCurrentStep(0);
  };

  // Handle moving through the animation steps
  useEffect(() => {
    if (isSorting && currentStep < animations.length) {
      const timer = setTimeout(() => {
        setArray([...animations[currentStep].array]); // Update the array with the current step
        setCurrentStep(currentStep + 1); // Move to the next step
      }, 500); // Adjust delay for better visibility (500ms per step)

      return () => clearTimeout(timer); // Clean up the timeout on each render
    } else if (currentStep >= animations.length) {
      setIsSorting(false); // End the sorting process once animations are done
    }
  }, [currentStep, isSorting, animations]);

  return (
    <div className="container">
      <h1>Sorting Visualizer</h1>
      <div className="controls">
        <button onClick={() => setArray(generateRandomArray(10))}>Generate New Array</button>
        <button onClick={handleSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Sorting"}
        </button>
        <select
          onChange={(e) => setAlgorithm(e.target.value)}
          value={algorithm}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      <div className="visualization">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 3}px`,
              transform: `translateX(${index * 40}px)`,
              backgroundColor: isSorting
                ? animations[currentStep] && animations[currentStep].swaps.includes(index)
                  ? "blue"
                  : "lightgreen"
                : "lightgreen",
              transition: "height 0.3s ease, transform 0.3s ease",
            }}
          >
            <span
              className="bar-number"
              style={{
                position: "absolute",
                bottom: "5px", // Position the number at the bottom of the bar
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                color: "white",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
