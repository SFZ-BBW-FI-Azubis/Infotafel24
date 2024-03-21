import React, { useEffect, useState } from "react";

function Vertretungsplan() {
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
    "Sonstige",
  ];

  const year = [
    "erstes",
    "zweites",
    "drittes"
  ];

  const tableData = [
    ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3", "Row 1, Cell 4", "Row 1, Cell 5", "Row 1, Cell 6", "Row 1, Cell 7", "Row 1, Cell 8", "Row 1, Cell 9", "Row 1, Cell 10"],
    ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3", "Row 2, Cell 4", "Row 2, Cell 5", "Row 2, Cell 6", "Row 2, Cell 7", "Row 2, Cell 8", "Row 2, Cell 9", "Row 2, Cell 10"],
    ["Row 3, Cell 1", "Row 3, Cell 2", "Row 3, Cell 3", "Row 3, Cell 4", "Row 3, Cell 5", "Row 3, Cell 6", "Row 3, Cell 7", "Row 3, Cell 8", "Row 3, Cell 9", "Row 3, Cell 10"],
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
    style={{
      fontSize: "300px",
    }}>Coming soon</div>
    /*<div className="bg-site-background min-h-screen flex flex-col">
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
      <div className="sub-navbar flex justify-center">
        <div className="flex text-white border-b-2 border-b-white rounded-sm text-3xl font-thin pt-10 pb-2 flex-wrap">
          {year.map((item, index) => (
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
      <div className="table-container flex-grow flex justify-center items-center">
        <table className="mx-auto">
          <tbody className="border-white border-2 text-3xl font-thin">
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-white bordered">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="text-white bordered" style={{ border: "1px solid white", height: "150px", width: "200px" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>*/
  );
}

export default Vertretungsplan;
