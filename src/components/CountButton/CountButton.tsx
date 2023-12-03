import './CountButton.scss';
import { useState } from "react";

function CountButton() {
  const [count, setCount] = useState(0);

  return (
      <div>
        <button
            className="count-button"
            onClick={() => setCount((count) => count + 1)}>
          clicks: {count}
        </button>
        <p>CountButton Component is at <code>src/components/CountButton/CountButton.tsx</code></p>
      </div>
  )
}

export default CountButton;