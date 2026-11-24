"use client";

import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/pokemon/${id}";

export default function PokemonPage() {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemonCharacterById = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.ok) {
        const data = await response.json();

        setHero(data);
      } else {
        setError("Ийм Покемон олдсонгүй");
      }
    } catch (fetchError) {
      setError("Интернет ээ шалгаад дахиад оролдоод үзээрэй");
    }
    setIsLoading(false);
  };
  const showRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetchPokemonCharacterById(randomId);
  };

  useEffect(() => {
    fetchPokemonCharacterById(25);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">⚡ Покемон карт</h1>

      <div className="flex h-[440px] w-80 flex-col items-center justify-center rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
        {isLoading && (
          <p className="text-xl font-semibold text-center. text-slate-400 ">
            ⏳ Ачааллаж байна
          </p>
        )}

        {!isLoading && error !== "" && (
          <p className="text-xl font-semibold text-center ">{error} </p>
        )}

        {!isLoading && error === "" && hero !== null && (
          <div>
            <p className=" self-start text-sm font-bold text-slate-400 ">
              #{hero.id}
            </p>
            <img
              src={hero.sprites.other["official-artwork"].front_default}
              className="h-48 w-48"
            />
            <h2 className=" text-3xl font-bold capitalize flex justify-center ">
              {hero.name}{" "}
            </h2>
            {/* <div className="mt-3 flex gap-2">
              {hero.types.map((item) => {
                return (
                  <span
                    key={item.type.name}
                    className={`rounded-full px-3 py-1 text-sm font-semibold capitalize text-white ${item.type.name} `}
                  >
                    {item.type.name}
                  </span>
                );
              })}
            </div> */}
          </div>
        )}
      </div>

      <button
        onClick={showRandomPokemon}
        disabled={isLoading}
        className="rounded-xl bg-yellow-400 px-8 py-3 text-lg font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50"
      >
        🎲 Санамсаргүй
      </button>
    </main>
  );
}
