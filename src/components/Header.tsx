import AlgorithmSelect from "./AlgorithmSelect";


export default function Header() {
  return (
    <header>
      <div className="logo">
        <h1 className="logo--text">SortViz</h1>
      </div>

      <AlgorithmSelect />
    </header>
  );
}