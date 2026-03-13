type ScheduleEntry = {
  sport: string;
  time: string;
  location: string;
};

export default function Schedule() {
  const schedule: Record<string, ScheduleEntry> = {
    Lundi: { sport: "Natation", time: "20h30 - 21h30", location: "Centre aquatique Arsenal" },
    Mardi: { sport: "Course à pied", time: "19h à 20h30", location: "la piste du stade Ladoumègue" },
    Mercredi: { sport: "-", time: "-", location: "-" },
    Jeudi: { sport: "Natation", time: "20h30 - 21h30", location: "Centre aquatique Arsenal" },
    Vendredi: { sport: "-", time: "-", location: "-" },
    Samedi: { sport: "Vélo", time: "Matin", location: "À déterminer" },
    Dimanche: { sport: "-", time: "-", location: "-" },
  };

  const days = Object.keys(schedule);

  return (
    <div id='horaires' className='mt-12 mx-auto max-w-7xl px-6 lg:px-8'>
      <h2 className='text-center font-semibold text-2xl mb-8 text-gray-900 dark:text-white'>
        Horaires du Club de Triathlon
      </h2>

      <div className="overflow-x-auto">
        <table className='mx-auto w-full max-w-4xl border-collapse border border-[#ff0454]'>
          <thead>
            <tr className='bg-[#ff0454] text-white'>
              <th className='border border-[#ff0454] px-4 py-2'>Sport / Jour</th>
              {days.map((day, index) => (
                <th key={index} className='border border-[#ff0454] px-4 py-2'>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className='odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-800'>
              <td className='border border-[#ff0454] px-4 py-2 text-center font-semibold'>Sport</td>
              {days.map((day, index) => (
                <td key={index} className='border border-[#ff0454] px-4 py-2 text-center'>{schedule[day].sport}</td>
              ))}
            </tr>
            <tr className='odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-800'>
              <td className='border border-[#ff0454] px-4 py-2 text-center font-semibold'>Horaire</td>
              {days.map((day, index) => (
                <td key={index} className='border border-[#ff0454] px-4 py-2 text-center'>{schedule[day].time}</td>
              ))}
            </tr>
            <tr className='odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-800'>
              <td className='border border-[#ff0454] px-4 py-2 text-center font-semibold'>Lieu</td>
              {days.map((day, index) => (
                <td key={index} className='border border-[#ff0454] px-4 py-2 text-center'>{schedule[day].location}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

