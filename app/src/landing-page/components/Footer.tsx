interface NavigationItem {
  name: string;
  href: string;
};

export default function Footer({ footerNavigation }: {
  footerNavigation: {
    app: NavigationItem[];
    company: NavigationItem[];
  };
}) {
  return (
    <div className='mx-auto mt-6 max-w-7xl px-6 lg:px-8 dark:bg-boxdark-2'>
      <footer
        aria-labelledby='footer-heading'
        className='relative border-t border-gray-900/10 dark:border-gray-200/10 py-24 sm:mt-32'
      >
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='text-center mb-10'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            Rueil-malmaison Triathlon
          </h3>
          <p className='mt-2 text-sm text-gray-600 dark:text-white'>
            Plongez dans l’univers du triple effort, roulez vers de nouveaux défis et courez ensemble vers vos objectifs. Ici, passion, dépassement de soi et esprit d’équipe vous accompagnent à chaque étape !
          </p>
        </div>
        <div className='flex items-start justify-between mt-10 gap-20'>
          {/* Section Le Club */}
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>Le club</h3>
            <ul role='list' className='mt-6 space-y-4'>
              <li>
                <ul role='list' className='mt-2 space-y-2'>
                  {footerNavigation.app.filter(item => item.name === 'Les Horaires').map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <ul role='list' className='mt-2 space-y-2'>
                  {footerNavigation.app.filter(item => item.name === 'Les Lieux').map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          {/* Section Nous Contacter */}
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>Nous contacter</h3>
            <ul role='list' className='mt-6 space-y-4'>
              <li>
                <a href="mailto:contact@rueil-malmaison-triathlon.fr" className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                  Email: contact@rueil-malmaison-triathlon.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Section Mentions Légales */}
          <div>
            <ul role='list' className='mt-6 space-y-4'>
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
