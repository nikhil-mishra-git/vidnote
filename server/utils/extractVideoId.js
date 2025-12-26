import getYouTubeID from "get-youtube-id";


export const extractVideoId = (url) => {

  let id = getYouTubeID(url);
  return id;

};
