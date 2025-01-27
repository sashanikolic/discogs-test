import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface DiscogsApi {
  database_search: (searchParams: DiscogsDatabaseTypes.SearchParams) => {data: DiscogsDatabaseTypes.SearchResponse|null, isLoading: boolean, error: boolean};
  get_release: (release_id: number) => { data: DiscogsDatabaseTypes.Release|null, isLoading: boolean, error: boolean };
  get_artist: (artist_id: number) => { data: DiscogsDatabaseTypes.Artist|null, isLoading: boolean, error: boolean };
  get_artist_releases: (artist_id: number, pagination?: Pick<DiscogsTypes.Pagination, "page"|"per_page">) => { data: DiscogsDatabaseTypes.ArtistReleasesResponse|null, isLoading: boolean, error: boolean };
}

const axiosClient = axios.create({
  baseURL: "https://api.discogs.com/",
  headers: {
    //"User-Agent": "SashaTestApp/1.0 +http://example.com/sashatestapp"
  },
  params: {
    key: "EBnasIoqVJTZIZyeRhpg",
    secret: "vvDlBjBtqsxaigdlwEvXGxbABSwiZWgq",
  }
})

const database_search = (searchParams: DiscogsDatabaseTypes.SearchParams): { data: DiscogsDatabaseTypes.SearchResponse|null, isLoading: boolean, error: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<DiscogsDatabaseTypes.SearchResponse|null>(null);
  useEffect(()=>{
    axiosClient.get('/database/search', {
      params: searchParams,
    }).then((val)=>{
      setIsLoading(false);
      setData(val.data);
      setError(null);
    }).catch((err)=>{
      setError(err);
      setIsLoading(false);
      setData(null);
    });
  },[searchParams])
  return {
    isLoading,
    error,
    data,
  }
}

const get_release = (release_id: number): { data: DiscogsDatabaseTypes.Release|null, isLoading: boolean, error: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<DiscogsDatabaseTypes.Release|null>(null);
  useEffect(()=>{
    axiosClient.get(`/releases/${release_id}`).then((val)=>{
      setIsLoading(false);
      setData(val.data);
      setError(null);
    }).catch((err)=>{
      setError(err);
      setIsLoading(false);
      setData(null);
    });
  },[release_id])
  return {
    isLoading,
    error,
    data,
  }
}


const get_artist = (artist_id: number): { data: DiscogsDatabaseTypes.Artist|null, isLoading: boolean, error: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<DiscogsDatabaseTypes.Artist|null>(null);
  useEffect(()=>{
    axiosClient.get(`/artists/${artist_id}`).then((val)=>{
      setIsLoading(false);
      setData(val.data);
      setError(null);
    }).catch((err)=>{
      setError(err);
      setIsLoading(false);
      setData(null);
    });
  },[artist_id])
  return {
    isLoading,
    error,
    data,
  }
}

const get_artist_releases = (artist_id: number, pagination?: Pick<DiscogsTypes.Pagination, "page"|"per_page">): { data: DiscogsDatabaseTypes.ArtistReleasesResponse|null, isLoading: boolean, error: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<DiscogsDatabaseTypes.ArtistReleasesResponse|null>(null);
  useEffect(()=>{
    axiosClient.get(`/artists/${artist_id}/releases`, {
      params: pagination
    }).then((val)=>{
      setIsLoading(false);
      setData(val.data);
      setError(null);
    }).catch((err)=>{
      setError(err);
      setIsLoading(false);
      setData(null);
    });
  },[artist_id])
  return {
    isLoading,
    error,
    data,
  }
}
export const DiscogsApiContext = createContext<DiscogsApi|undefined>(undefined);


export const DiscogsApiContextProvider = (props: { children: React.ReactNode }) => {
  return (
    <DiscogsApiContext.Provider value={{
      database_search,
      get_release,
      get_artist,
      get_artist_releases
    }}>
      {props.children}
    </DiscogsApiContext.Provider>
  )
}

export const setTimeOutAsync = async (timeout:number) => {
  return new Promise<void>((resolve)=> {
    setTimeout(()=>{resolve()},timeout);
  })
}

export const useDiscogsApi = () => {
  const ctx = useContext(DiscogsApiContext);
  if (!ctx) throw Error ("useDiscogsApi must be userd within DiscogsApiProvider");

  return ctx;
}
