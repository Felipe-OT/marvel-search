import { NextResponse } from "next/server";

type HeroType = {
  thumbnail: { path: string | string[] };
  comics: { available: number };
  events: { available: number };
  series: { available: number };
};

export default async function getResults(searchParams: string) {

  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchParams}&apikey=d158498c097567406c1e29f6202a5f4f&hash=43a2930ceed84cfe63db8b5efe33599c&ts=1`
  );


  if (!res.ok) return { msg: "We didn't find what you want", status: 500 };

  const data = await res.json();


  if(data.data.results.length == 0) return { msg: "We didn't find what you want", status: 500 };



  const removeImgNotFound = data.data.results.filter((item: HeroType) => {
    if (item.thumbnail.path.indexOf("image_not_available") > -1) {
      return false;
    } else if (
      item.comics.available !== 0 &&
      item.events.available !== 0 &&
      item.series.available !== 0
    ) {
      return true;
    }
  });

  return removeImgNotFound;
}
