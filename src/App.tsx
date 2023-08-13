import { useQuery } from "@tanstack/react-query";
import "./App.css";

const getRandomNumberFromApi = async (): Promise<number> => {
  const url = new URL("https://www.random.org/integers/");
  url.searchParams.set("num", "1");
  url.searchParams.set("min", "1");
  url.searchParams.set("max", "500");
  url.searchParams.set("col", "1");
  url.searchParams.set("base", "10");
  url.searchParams.set("format", "plain");
  url.searchParams.set("rdn", "new");
  const res = await fetch(url);
  const numberString = await res.text();
  //throw new Error("Error");
  const number = +numberString;
  return number;
};

function App() {
  const randomQuery = useQuery(["random"], getRandomNumberFromApi);

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
