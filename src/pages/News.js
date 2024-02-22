import React, { useEffect, useState } from "react";

function News() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    setSelectedItem(item);
    // Save selected item in cookies
    document.cookie = `selectedItem=${item}; path=/`;
  };

  const items = [
    "Fachinformatiker",
    "Gärtner",
    "E-Commerce",
    "Kaufleute",
    "Niclas",
    "Sonstige",
  ];

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Retrieve selected item from cookies
    const cookies = document.cookie.split(";");
    const selectedItemCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("selectedItem=")
    );
    if (selectedItemCookie) {
      const selectedItem = selectedItemCookie.split("=")[1];
      setSelectedItem(selectedItem);
    }

    // Re-enable scrolling when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="bg-site-background min-h-screen flex flex-col bg-news-it bg-cover bg-center bg-no-repeat"
    >
      <div className="navbar flex justify-center">
        <div className="flex text-white border-b-2 border-b-white rounded-sm text-3xl font-thin pt-10 pb-2 flex-wrap">
          {items.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 ml-10 uppercase ${
                selectedItem === item ? "selected font-normal" : ""
              }`}
              onClick={() => handleItemClick(item)}
              style={{ cursor: "pointer" }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        {selectedItem === "Fachinformatiker" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for Fachinformatiker.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
        {selectedItem === "Gärtner" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for Gärtner.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
        {selectedItem === "E-Commerce" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for E-Commerce.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
        {selectedItem === "Kaufleute" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for Kaufleute.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
        {selectedItem === "Niclas" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for Niclas.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
        {selectedItem === "Sonstige" && (
          <div className="items-container">
            <p>This is a placeholder paragraph for Sonstige.</p>
            <img src="placeholder-image.jpg" alt="Placeholder Image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
