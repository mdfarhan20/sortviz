import Header from "components/Header";
import Visualizer from "components/Visualizer";
import { VisualizerProvider } from "context/VisualizerContext";

export default function App() {

  return (
    <>
      <VisualizerProvider>
        <Header />
        <main>
          <Visualizer />
        </main>
      </VisualizerProvider>
    </>
  );
}