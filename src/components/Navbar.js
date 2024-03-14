import React, { useState, useEffect } from 'react';
import SFZLogo from '../assets/sfzlogo.png';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'News', href: '/', current: true},
  { name: 'Speiseplan', href: '/speiseplan', current: false },
  { name: 'Vertretungsplan', href: '/vertretungsplan', current: false},
  { name: 'Fahrplan', href: '/fahrplan', current: false },
  { name: 'Wetter', href: '/wetter', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='bg-yellow-500 w-screen'>
      <div className='mx-auto max-w-9xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex flex-1 items-center justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <img className='block h-10 w-auto' src={SFZLogo} alt="SFZ Logo" />
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:block'>
            <div className='flex space-x-8 justify-center'>
              {navigation.map((item) => {
                item.current = item.href === location.pathname;
                return (
                  <Link 
                    key={item.name}
                    to={item.href}
                    tabIndex={0} // Add tabIndex attribute
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-gray-900',
                      'rounded-md px-3 py-2 text-xl font-semibold'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center text-black text-3xl font-semibold ml-4">{currentTime}</div>
            </div>
          </div>
          <div className='sm:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type='button'
              className='text-black hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-xl font-semibold'
            >
              Menu
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className='sm:hidden'>
            <div className='flex flex-col space-y-4'>
              {navigation.map((item) => {
                item.current = item.href === location.pathname;
                return (
                  <Link 
                    key={item.name}
                    to={item.href}
                    tabIndex={0} // Add tabIndex attribute
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-gray-900',
                      'rounded-md px-3 py-2 text-xl font-semibold'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
