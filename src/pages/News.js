import React, { useEffect, useState } from "react";
import {
  fetchLatestITNews,
  fetchLatestGardeningNews,
  fetchLatestCommerceNews,
  fetchLatestGeneralNews,
  fetchLatestHackerNews,
} from "../newsapi/newsapi";

function News() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [news, setNews] = useState({});
  const [hackerNews, setHackerNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setLoading(true);

    switch (item) {
      case "Fachinformatiker":
        fetchLatestITNews()
          .then((fetchedNews) => {
            setNews({ ...news, [item]: fetchedNews });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching IT news:", error);
            setLoading(false);
          });

        fetchLatestHackerNews()
          .then((fetchedHackerNews) => {
            setHackerNews(fetchedHackerNews);
          })
          .catch((error) => {
            console.error("Error fetching Hacker News:", error);
          });
        break;
      case "Gärtner":
        fetchLatestGardeningNews()
          .then((fetchedNews) => {
            setNews({ ...news, [item]: fetchedNews });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching gardening news:", error);
            setLoading(false);
          });
        break;
      case "E-Commerce":
        fetchLatestCommerceNews()
          .then((fetchedNews) => {
            setNews({ ...news, [item]: fetchedNews });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching ecommerce news:", error);
            setLoading(false);
          });
        break;
      case "Allgemein":
        fetchLatestGeneralNews()
          .then((fetchedNews) => {
            setNews({ ...news, [item]: fetchedNews });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching general news:", error);
            setLoading(false);
          });
        break;
      default:
        fetchLatestGeneralNews()
          .then((fetchedNews) => {
            setNews({ ...news, [item]: fetchedNews });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching general news:", error);
            setLoading(false);
          });
        break;
    }
  };

  const categories = ["Allgemein", "Fachinformatiker", "Gärtner", "E-Commerce"];

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    const cookies = document.cookie.split(";");
    const selectedItemCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("selectedItem=")
    );
    if (selectedItemCookie) {
      const selectedItem = selectedItemCookie.split("=")[1];
      setSelectedItem(selectedItem);
    } else {
      fetchLatestITNews()
        .then((fetchedNews) => {
          setNews({ ...news, Fachinformatiker: fetchedNews });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching IT news:", error);
          setLoading(false);
        });
    }

    return () => {
      if (isMobile) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      className={`min-h-screen flex flex-col bg-Fachinformatiker bg-cover bg-center bg-no-repeat relative`}
    >
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
                <p
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    marginTop: "10rem",
                    fontWeight: "bold",
                  }}
                >
                  Loading...
                </p>
              ) : (
                <div className="flex">
                  <div
                    className="news-container flex flex-col items-center"
                    style={{
                      color: "white",
                      maxWidth: "800px",
                      overflowY: "auto",
                    }}
                  >
                    {news[selectedItem].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "5px",
                          margin: "auto",
                          marginTop: "3rem",
                          border: "1px solid white",
                          borderRadius: "10px",
                          backgroundColor: "black",
                          textAlign: isMobile ? "center" : "left",
                          width: isMobile ? "75%" : "auto",
                          maxWidth: "600px",
                          marginRight: isMobile ? "auto" : "2rem",
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
                          {item.description}
                        </p>
                        <p
                          style={{
                            color: "lightblue",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                          }}
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Zum Artikel
                          </a>
                        </p>
                      </div>
                    ))}
                    {selectedItem === "Fachinformatiker" && (
                      <div className="hacker-news-container">
                        <h2
                          style={{
                            color: "white",
                            fontSize: "1.5rem",
                            marginTop: isMobile ? "0rem" : "3rem",
                            fontWeight: "bold",
                            alignItems: "center",
                          }}
                        ></h2>
                        {hackerNews.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              padding: "5px",
                              border: "1px solid white",
                              margin: "auto",
                              borderRadius: "10px",
                              backgroundColor: "black",
                              textAlign: isMobile ? "center" : "left",
                              width: isMobile ? "75%" : "auto",
                              maxWidth: "600px",
                              marginRight: isMobile ? "auto" : "2rem",
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
                              {item.text}
                            </p>
                            <p
                              style={{
                                color: "lightblue",
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                              }}
                            >
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Zum Artikel
                              </a>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {!isMobile &&
                    news[selectedItem].length > 0 &&
                    news[selectedItem][0].imageUrl && (
                      <img
                        src={news[selectedItem][0].imageUrl}
                        alt="News Image, not able to be exlpained, somewhat random"
                        className="ml-4 mt-2"
                        style={{
                          maxWidth: "500px",
                          objectFit: "cover",
                          color: "white",
                          margin: "auto",
                          marginTop: "3rem",
                          borderRadius: "10px",
                          border: "1px solid white",
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
