import React, { useCallback, useEffect, useState } from 'react';
import MovieCard from '../movieCard/movieCard';
import { TmdbMovieResult } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchPopular, fetchSearchData } from '../../api/api';
import { resultCardsAction } from '../../store/apiCardsSlice';

export default function MoviesList() {
  const searchState = useSelector((state: RootState) => state.search);
  const cardsState = useSelector((state: RootState) => state.apiCards);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchData = useCallback(
    (value: string) => {
      setLoaded(false);
      const fetchFn = value.trim() === '' ? fetchPopular : () => fetchSearchData(value);
      fetchFn().then((result: TmdbMovieResult[] | string) => {
        dispatch(resultCardsAction.setValue({ apiCards: result }));
        setLoaded(true);
      });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(searchState.searchValue);
  }, [searchState.searchValue, fetchData]);

  return (
    <div className="card-list__wrapper">
      {!loaded && <div className="loading"></div>}
      {loaded && typeof cardsState.apiCards === 'string' && (
        <h4 className="home__error">{cardsState.apiCards}</h4>
      )}
      {loaded && typeof cardsState.apiCards !== 'string' && (
        <ul className="card-list">
          {cardsState.apiCards.map((item: TmdbMovieResult) => (
            <li key={item.id} className="card-list__item">
              <MovieCard {...item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
