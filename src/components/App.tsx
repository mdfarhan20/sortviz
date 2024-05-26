import Header from "components/Header";
import Visualizer from "components/Visualizer";
import Controls from "components/Controls";
import { VisualizerProvider } from "context/VisualizerContext";

export default function App() {

  return (
    <>
      <VisualizerProvider>
        <Header />
        <main>
          <Visualizer />
          <Controls />
        </main>
      </VisualizerProvider>
    </>
  );
}