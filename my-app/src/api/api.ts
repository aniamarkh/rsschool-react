const urlSearch = 'https://api.themoviedb.org/3/search/movie?';
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?';
const api_key = 'api_key=6a130d2f0e9c0261931fa93ffcdac91a';
const query = '&query=';
const lang = '&language=en-US';
const adult = '&include_adult=false';

export const fetchSearchData = async (value: string) => {
  try {
    const response = await fetch(urlSearch + api_key + query + value + lang + adult);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    return results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return error;
  }
};

export const fetchPopular = async () => {
  try {
    const response = await fetch(urlPopular + api_key + lang + adult);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    return results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return error;
  }
};
