import { AlbumSearchContextProvider } from "../../discogsApi/useSearchFilter";
import { AlbumList } from "./AlbumList";

export const Albums = () => {
  const initialSearch: DiscogsDatabaseTypes.SearchParams = {
    year: 2024,
    country: "canada",
    type: "release",
    format: "album",
  };

  return (
    <AlbumSearchContextProvider search={initialSearch}>
      <div className="flex flex-col gap-4 justify-items-start items-start">
        <div className="text-3xl font-bold">Album List</div>
        <AlbumList/>
      </div>
    </AlbumSearchContextProvider>
  )
}