const API_KEY = "8ae60b0cf6cbb7574f614d1cef7fcd1e";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  id: number;
}

interface ITv {
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  id: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IgetTvResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getUpcoming() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getTopRated() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getTvOnTheAir() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getTvAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    response => response.json()
  );
}

export function getTvPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
    response => response.json()
  )
}

export function getTvTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    response => response.json()
  )
}