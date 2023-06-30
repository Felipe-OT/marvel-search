import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: Props) {
  console.log(id);
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=d158498c097567406c1e29f6202a5f4f&hash=43a2930ceed84cfe63db8b5efe33599c&ts=1`
  );
  const data = await res.json();

  if (!res.ok) throw new Error("Falha ao realizar a pesquisa");

  return new NextResponse(JSON.stringify(data), {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
  })
}
