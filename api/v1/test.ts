import axios from 'axios';

// Use proxies
const API_ENDPOINTS = [
  'http://localhost:3000/musixmatch/lyrics',
  'https://lyrics.shittybot.xyz/musixmatch/lyrics',
];

async function fetchLyricsFromEndpoint(title: string, apiEndpoint: string) {
  try {
    const response = await axios.get(`${apiEndpoint}?title=${encodeURIComponent(title)}`);

    if (!response.data) return undefined;

    return {
      artwork: response.data.artwork_url,
      trackName: response.data.track_name,
      artistName: response.data.artist_name,
      lyrics: response.data.lyrics,
    };
  } catch (error) {
    console.error(`Error on API "${apiEndpoint}": ${error as string}`);
    return undefined;
  }
}

export default async function fetchLyrics(title: string) {
  for (const apiEndpoint of API_ENDPOINTS) {
    const result = await fetchLyricsFromEndpoint(title, apiEndpoint);
    if (result) {
      return result;
    }
  }

  console.log('Lyrics not found with any API endpoint.');
  return undefined;
}

fetchLyrics("Title here").then((result) => {
  if (result) {
    console.log(result);
  } else {
    console.log("Lyrics not found or an error occurred.");
  }
});
