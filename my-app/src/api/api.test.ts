import { rest } from 'msw';
import { fetchPopular, fetchSearchData, fetchMovie } from './api';
import { server } from './mock/server';
import { popularResult, searchResult, movieByIdResult } from './mock/handlers';

describe('api test', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetch popular', async () => {
    const result = await fetchPopular();
    expect(result).toEqual(popularResult.results);
  });

  test('fetch search', async () => {
    const result = await fetchSearchData('movie');
    expect(result).toEqual(searchResult.results);
  });

  test('fetch by id', async () => {
    const result = await fetchMovie(101);
    expect(result).toEqual(movieByIdResult);
  });

  test('handle error', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(await fetchPopular()).toEqual('Error fetching movies data. Please try again later 😓');
    server.use(
      rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(await fetchSearchData('error movie')).toEqual(
      'Error fetching movies data. Please try again later 😓'
    );
    server.use(
      rest.get('https://api.themoviedb.org/3/movie/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(await fetchMovie(0)).toEqual('Error fetching movie data. Please try again later 😓');
  });
});
