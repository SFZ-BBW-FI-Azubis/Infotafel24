import React, { useEffect, useState } from "react";
import { fetchLatestNews } from "../newsapi/newsapi";

function News() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleItemClick = (item) => {
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

    // Fetch latest news when component mounts
    fetchLatestNews()
      .then((fetchedNews) => {
        setNews(fetchedNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });

    // Update news every 10 minutes
    const intervalId = setInterval(fetchNews, 10 * 60 * 1000);

    // Re-enable scrolling when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
      clearInterval(intervalId);
    };
  }, []);

  const fetchNews = () => {
    setLoading(true);
    fetchLatestNews()
      .then((fetchedNews) => {
        setNews(fetchedNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-Fachinformatiker bg-cover bg-center bg-no-repeat relative`}
    >
      <div className="bg-black flex bg-opacity-60 h-screen w-full flex-col">
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
          {selectedItem && (
            <div className="items-container flex flex-col items-center">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex">
                  <div
                    className="news-container flex flex-col items-center"
                    style={{
                      color: "white",
                    }}
                  >
                    {news.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "3rem",
                          marginLeft: "12rem",
                          border: "1px solid white",
                          borderRadius: "10px",
                          backgroundColor: "black",
                        }}
                      >
                        <h2>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "white",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            {item.title}
                          </a>
                        </h2>
                        <p
                          style={{
                            color: "white",
                            fontSize: "1rem",
                            marginTop: "2rem",
                            marginBottom: "2rem",
                          }}
                        >
                          Description: {item.description}
                        </p>
                        <p
                          style={{
                            color: "lightblue",
                            fontSize: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.url}
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
                  {news.length > 0 && (
                    <img
                      src={news[0].imageUrl}
                      alt="news-image"
                      className="ml-4 mt-2"
                      style={{
                        color: "white",
                        marginTop: "3rem",
                        maxHeight: "500px",
                        marginRight: "12rem",
                      }}
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

/*

*/

/*

*/