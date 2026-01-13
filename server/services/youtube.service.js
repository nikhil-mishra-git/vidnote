import axios from "axios";

export const getVideoMetadata = async (videoId) => {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const { data } = await axios.get(url);
  
  return {
    title: data.title,
    author:data. author_name,
    thumbnail: data.thumbnail_url,
  };
};
