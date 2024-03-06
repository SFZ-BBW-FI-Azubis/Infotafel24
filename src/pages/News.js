import React, { useEffect, useState } from "react";
import { fetchLatestITNews, fetchLatestGardeningNews, fetchLatestCommerceNews } from "../newsapi/newsapi";

function News() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    document.cookie = `selectedItem=${item}; path=/`;
    setLoading(true); // Set loading to true when fetching new news

    if (item === "Fachinformatiker") {
      fetchLatestITNews()
        .then((fetchedNews) => {
          setNews({ ...news, [item]: fetchedNews });
          setLoading(false); // Set loading to false after fetching news
        })
        .catch((error) => {
          console.error("Error fetching IT news:", error);
          setLoading(false); // Set loading to false in case of error
        });
    } else if (item === "Gärtner") {
      fetchLatestGardeningNews()
        .then((fetchedNews) => {
          setNews({ ...news, [item]: fetchedNews });
          setLoading(false); // Set loading to false after fetching news
        })
        .catch((error) => {
          console.error("Error fetching gardening news:", error);
          setLoading(false); // Set loading to false in case of error
        });
    } else if (item === "E-Commerce") {
      fetchLatestCommerceNews()
        .then((fetchedNews) => {
          setNews({ ...news, [item]: fetchedNews });
          setLoading(false); // Set loading to false after fetching news
        })
        .catch((error) => {
          console.error("Error fetching ecommerce news:", error);
          setLoading(false); // Set loading to false in case of error
        });
    } else {
      setNews({ ...news, [item]: [] });
      setLoading(false); // Set loading to false when no news is fetched
    }
  };

  const categories = ["Fachinformatiker", "Gärtner", "E-Commerce"];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const cookies = document.cookie.split(";");
    const selectedItemCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("selectedItem=")
    );
    if (selectedItemCookie) {
      const selectedItem = selectedItemCookie.split("=")[1];
      setSelectedItem(selectedItem);
    } else {
      // Fetch IT news by default if no item is selected
      fetchLatestITNews()
        .then((fetchedNews) => {
          setNews({ ...news, "Fachinformatiker": fetchedNews });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching IT news:", error);
          setLoading(false);
        });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-Fachinformatiker bg-cover bg-center bg-no-repeat relative`}>
      <div className="bg-black flex bg-opacity-60 h-screen w-full flex-col">
        <div className="navbar flex justify-center">
          <div className="flex text-white border-b-2 border-b-white rounded-sm text-3xl font-thin pt-10 pb-2 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 ml-10 uppercase ${
                  selectedItem === category ? "selected font-normal" : ""
                }`}
                onClick={() => handleItemClick(category)}
                style={{ cursor: "pointer" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div>
          {selectedItem && (
            <div className="items-container flex flex-col items-center">
              {loading ? (
                <p style={{ color: "white", fontSize: "1.5rem", marginTop: "10rem", fontWeight: "bold" }}>Loading...</p>
              ) : (
                <div className="flex">
                  <div className="news-container flex flex-col items-center"
                    style={{
                      color: "white",
                    }}
                  >
                    {news[selectedItem].map((item, index) => (
                      <div key={index} style={{ margin: "3rem", marginLeft: "12rem", border: "1px solid white", borderRadius: "10px", backgroundColor: "black" }}>
                        <h2>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>{item.title}</a>
                        </h2>
                        <p style={{ color: "white", fontSize: "1rem", marginTop: "2rem", marginBottom: "2rem" }}>Description: {item.description}</p>
                        <p style={{ color: "lightblue", fontSize: "1rem", fontWeight: "bold" }}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                        </p>
                      </div>
                    ))}
                  </div>
                  {news[selectedItem].length > 0 && (
                    <img
                      src={news[selectedItem][0].imageUrl}
                      alt="news-image"
                      className="ml-4 mt-2"
                      style={{ color: "white", marginTop: "3rem", maxWidth: "700px", marginRight: "12rem", borderRadius: "10px", border: "1px solid white" }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
