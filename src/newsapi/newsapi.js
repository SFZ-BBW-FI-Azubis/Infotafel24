import axios from "axios";

export function fetchLatestNews() {
  const apiKey = "60325dcadfc0454fb43f8acdb30fd959";
  const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=1&apiKey=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      if (response.data && response.data.articles) {
        const news = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        }));
        return news;
      } else {
        console.error("No articles found in the response.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
      throw error;
    });
}
