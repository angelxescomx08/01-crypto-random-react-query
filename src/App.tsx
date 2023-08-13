import { useEffect, useState } from "react";
import "./App.css";

const getRandomNumberFromApi = async (signal: AbortSignal): Promise<number> => {
  const url = new URL("https://www.random.org/integers/");
  url.searchParams.set("num", "1");
  url.searchParams.set("min", "1");
  url.searchParams.set("max", "500");
  url.searchParams.set("col", "1");
  url.searchParams.set("base", "10");
  url.searchParams.set("format", "plain");
  url.searchParams.set("rdn", "new");
  const res = await fetch(url, { signal });
  const numberString = await res.text();
  const number = +numberString;
  return number;
};

function App() {
  const [number, setNumber] = useState<number>();

  useEffect(() => {
    const { signal, abort } = new AbortController();
    getRandomNumberFromApi(signal).then((num) => setNumber(num));
    return () => {
      abort();
    };
  }, []);

  return (
    <main>
      <h2>Número aleatorio: {number}</h2>
    </main>
  );
}

export default App;
