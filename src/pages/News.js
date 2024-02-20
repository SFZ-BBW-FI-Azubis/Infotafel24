import React, { useEffect, useState } from 'react';

function News() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        console.log('Clicked item:', item);
        setSelectedItem(item);
        // Save selected item in cookies
        document.cookie = `selectedItem=${item}; path=/`;
    };

    const items = ['Fachinformatiker', 'Gärtner', 'E-Commerce', 'Kaufleute', 'Niclas', 'Sonstige'];

    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Retrieve selected item from cookies
        const cookies = document.cookie.split(';');
        const selectedItemCookie = cookies.find(cookie => cookie.trim().startsWith('selectedItem='));
        if (selectedItemCookie) {
            const selectedItem = selectedItemCookie.split('=')[1];
            setSelectedItem(selectedItem);
        }

        // Re-enable scrolling when component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="bg-site-background min-h-screen flex flex-col">
            <div className="navbar flex justify-center">
                <div className='flex text-white border-b-2 border-b-white rounded-sm text-3xl font-thin pt-10 pb-2 flex-wrap'>
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 ml-10 uppercase ${selectedItem === item ? 'selected font-normal' : ''}`}
                            onClick={() => handleItemClick(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {selectedItem && (
                    <div className="items-container">
                        {selectedItem}
                        {/* Render items corresponding to the chosen topic */}
                        {/* Add your logic here */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default News;
