import React from 'react';
import SFZLogo from '../assets/sfzlogo.png';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Speiseplan', href: '/speiseplan', current: true },
  { name: 'Vertretungsplan', href: '/vertretungsplan', current: false},
  { name: 'Fahrplan', href: '/fahrplan', current: false },
  { name: 'Wetter', href: '/wetter', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

//suiiiiiiiiiiii

function Navbar() {
  const location = useLocation();

  return (
    <div className='bg-accent'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <img className='block h-10 w-auto' src={SFZLogo} alt="SFZ Logo" />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {navigation.map((item) => (
                  
                  item.current ? item.current = item.href === location.pathname : item.current = false,

                  console.log(`${item.href === location.pathname} - ${item.name}`),

                  <Link 
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-white bg-black',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
