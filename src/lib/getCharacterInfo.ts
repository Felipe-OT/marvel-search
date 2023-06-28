type CharacterInfoData = {
  id: string;
  title: string;
  dates: [
    {
      date: string;
      type: string;
    }
  ];
  start: string;
  startYear: number;
  thumbnail: { path: string };
};

export default async function getCharacterInfo(
  characterId: string,
  search: string,
  offset: string
) {
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${characterId}/${search}?limit=20&offset=${offset}&apikey=d158498c097567406c1e29f6202a5f4f&hash=43a2930ceed84cfe63db8b5efe33599c&ts=1`
  );

  const data = await res.json();

  if (!res.ok) throw new Error("Falha ao realizar a pesquisa");

  const formatedData = data.data.results.map((result: CharacterInfoData) => {
    let releaseDate = result.dates?.filter((date) => {
      if (date.type == "onsaleDate") {
        return date.date;
      }
    });

    let newData = {
      id: result.id,
      title: result.title,
      date:
        search == "comics"
          ? releaseDate[0].date
          : search == "events"
          ? result.start
          : result.startYear,
      image: result.thumbnail.path,
    };
    console.log(newData);
    return newData;
  });

  console.log(formatedData);

  return formatedData;
}
