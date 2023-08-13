import { useRandom } from "./hooks/useRandom";
import "./App.css";

function App() {
  const randomQuery = useRandom();

  return (
    <main>
      {randomQuery.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Número aleatorio: {randomQuery.data}</h2>
      )}

      {!randomQuery.isFetching && randomQuery.isError && (
        <h2>Ha ocurrido un error {`${randomQuery.error}`}</h2>
      )}

      <button
        onClick={() => randomQuery.refetch()}
        disabled={randomQuery.isFetching}
      >
        Refetch
      </button>
    </main>
  );
}

export default App;
