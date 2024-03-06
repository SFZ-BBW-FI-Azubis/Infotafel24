import axios from "axios";

export function fetchLatestNews() {
  return axios
    .get("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((response) => {
      const newsIds = response.data.reverse().slice(0, 1); // Fetching the latest news
      const newsPromises = newsIds.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      );

      return Promise.all(newsPromises)
        .then((newsResponses) => {
          const news = newsResponses.map((response) => ({
            id: response.data.id,
            title: response.data.title,
            url: response.data.url,
            score: response.data.score,
            time: response.data.time,
            by: response.data.by,
            descendants: response.data.descendants,
            type: response.data.type,
            text: response.data.text
          }));
          return news; // Return the array of news objects
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          throw error; // Re-throw the error to be caught by the caller
        });
    })
    .catch((error) => {
      console.error("Error fetching news IDs:", error);
      throw error; // Re-throw the error to be caught by the caller
    });
}
