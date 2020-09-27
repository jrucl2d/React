import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./contexts/color";

function App() {
  // Provider로 값을 제공해줄 수 있다. 기본값이 있어도 provider이 있으면 사용 안 함. Provider에 value 안 넣으면 오류남.
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
