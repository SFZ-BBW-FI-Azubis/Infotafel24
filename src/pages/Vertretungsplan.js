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
    <div className="bg-site-background min-h-screen flex flex-col">
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
      <div className="table-container flex-grow">
        <table className="mx-auto h-full">
          <tbody className="min-h-screen border-white border-2 text-3xl font-thin">
            <tr className="border-white border-2">
              <td className="text-white bordered">Row 1, Cell 1</td>
              <td className="text-white bordered">Row 1, Cell 2</td>
              <td className="text-white bordered">Row 1, Cell 3</td>
              <td className="text-white bordered">Row 1, Cell 4</td>
              <td className="text-white bordered">Row 1, Cell 5</td>
              <td className="text-white bordered">Row 1, Cell 6</td>
              <td className="text-white bordered">Row 1, Cell 7</td>
              <td className="text-white bordered">Row 1, Cell 8</td>
              <td className="text-white bordered">Row 1, Cell 9</td>
              <td className="text-white bordered">Row 1, Cell 10</td>
            </tr>
            <tr className="border-white border-2">
              <td className="text-white bordered">Row 2, Cell 1</td>
              <td className="text-white bordered">Row 2, Cell 2</td>
              <td className="text-white bordered">Row 2, Cell 3</td>
              <td className="text-white bordered">Row 2, Cell 4</td>
              <td className="text-white bordered">Row 2, Cell 5</td>
              <td className="text-white bordered">Row 2, Cell 6</td>
              <td className="text-white bordered">Row 2, Cell 7</td>
              <td className="text-white bordered">Row 2, Cell 8</td>
              <td className="text-white bordered">Row 2, Cell 9</td>
              <td className="text-white bordered">Row 2, Cell 10</td>
            </tr>
            <tr className="border-white border-2">
              <td className="text-white bordered">Row 3, Cell 1</td>
              <td className="text-white bordered">Row 3, Cell 2</td>
              <td className="text-white bordered">Row 3, Cell 3</td>
              <td className="text-white bordered">Row 3, Cell 4</td>
              <td className="text-white bordered">Row 3, Cell 5</td>
              <td className="text-white bordered">Row 3, Cell 6</td>
              <td className="text-white bordered">Row 3, Cell 7</td>
              <td className="text-white bordered">Row 3, Cell 8</td>
              <td className="text-white bordered">Row 3, Cell 9</td>
              <td className="text-white bordered">Row 3, Cell 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vertretungsplan;
