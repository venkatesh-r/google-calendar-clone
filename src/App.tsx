import "./App.css";
import Home from "./Page/Home";
import { ThemeProvider } from "./utils/theme-context.jsx";

function App() {
  return (
    <>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
