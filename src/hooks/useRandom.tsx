import { useQuery } from "@tanstack/react-query";

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

export const useRandom = () => {
  const randomQuery = useQuery(["random"], getRandomNumberFromApi);
  return randomQuery;
};
