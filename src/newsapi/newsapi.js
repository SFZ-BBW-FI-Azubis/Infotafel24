import axios from "axios";

export function fetchLatestITNews() {
  const apiKey = "60325dcadfc0454fb43f8acdb30fd959";
  const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=1&apiKey=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      if (response.data && response.data.articles) {
        const ITNews = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        }));
        return ITNews;
      } else {
        console.error("No articles found in the response.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching IT news:", error);
      throw error;
    });
}

export function fetchLatestGardeningNews() {
  const apiKey = "60325dcadfc0454fb43f8acdb30fd959";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=de&category=sports&pageSize=1&apiKey=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      if (response.data && response.data.articles) {
        const gardeningNews = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        }));
        return gardeningNews;
      } else {
        console.error("No articles found in the response.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching gardening news:", error);
      throw error;
    });
}

export function fetchLatestCommerceNews() {
  const apiKey = "60325dcadfc0454fb43f8acdb30fd959";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=de&category=business&pageSize=1&apiKey=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      if (response.data && response.data.articles) {
        const commerceNews = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        }));
        return commerceNews;
      } else {
        console.error("No articles found in the response.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching ecommerce news:", error);
      throw error;
    });
}

export function fetchLatestGeneralNews() {
  const apiKey = "60325dcadfc0454fb43f8acdb30fd959";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=de&pageSize=1&apiKey=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      if (response.data && response.data.articles) {
        const generalNews = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          imageUrl: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content
        }));
        return generalNews;
      } else {
        console.error("No articles found in the response.");
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching general news:", error);
      throw error;
    });
}

export function fetchLatestHackerNews() {
  const apiUrl = `https://hacker-news.firebaseio.com/v0/newstories.json`;

  return axios
    .get(apiUrl)
    .then((response) => {
      const latestItemId = response.data[0]; // Fetching the latest item
      return axios.get(`https://hacker-news.firebaseio.com/v0/item/${latestItemId}.json`);
    })
    .then((response) => {
      const hackerNews = response.data;
      return [hackerNews]; // Wrap the result in an array to keep consistency with other news fetching functions
    })
    .catch((error) => {
      console.error("Error fetching Hacker News:", error);
      throw error;
    });
}
