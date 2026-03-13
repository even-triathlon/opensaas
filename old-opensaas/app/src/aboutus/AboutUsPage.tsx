import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="py-10 lg:mt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Qui sommes-nous ?
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white">
          Bienvenue au Rueil-Malmaison Triathlon, un club affilié à la Fédération Française de Triathlon, fondé en 2025. Nous sommes fiers d'être le club de triathlon de la ville de Rueil-Malmaison, offrant une ambiance conviviale et accessible à tous, en particulier aux débutants.
        </p>
        <div className="my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10">
          <div className="space-y-10 my-10 py-8 px-4 mx-auto sm:max-w-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Nos activités</h3>
            <p className="text-lg text-gray-600 dark:text-white">
              Nos entraînements se déroulent à la piscine du Centre aquatique Arsenal, sur la piste du stade Ladoumègue, et autour de la ville de Rueil-Malmaison pour le vélo. Nous proposons des séances adaptées à tous les niveaux, dans une ambiance détendue et encourageante.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8">Notre mission</h3>
            <p className="text-lg text-gray-600 dark:text-white">
              Notre mission est de promouvoir le triathlon comme un sport accessible et ludique. Nous croyons que chacun peut trouver sa place dans notre club, quel que soit son niveau. Nous nous engageons à accompagner nos membres dans leur progression, tout en favorisant les valeurs de respect, de dépassement de soi et de convivialité.
            </p>

            <button
              onClick={() => navigate('/pricing#contact-form')}
              className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-[#747bcb] rounded-lg hover:bg-[#ff5081]"
            >
              Rejoignez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
