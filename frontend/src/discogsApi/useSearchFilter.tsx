import { createContext, useContext, useState } from "react";
import { useDebounce } from "use-debounce";

interface AlbumSearchContext {
  search: DiscogsDatabaseTypes.SearchParams;

  /** debunced version for the api to use */
  debouncedSearch: DiscogsDatabaseTypes.SearchParams;
  pagination?: DiscogsTypes.Pagination;
  setPagination: (pagination: DiscogsTypes.Pagination) => void;

  /** Helper method for changing search params */
  changeSearch: (search: Partial<DiscogsDatabaseTypes.SearchParams>) => void;

  /** Helper method for paging */
  changePage: (pageNum:number) => void;

}

const SearchCtx = createContext<AlbumSearchContext|undefined>(undefined);

export const AlbumSearchContextProvider = (props: { search?: DiscogsDatabaseTypes.SearchParams, children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<DiscogsTypes.Pagination|undefined>();
  const [search, setSearch] = useState<DiscogsDatabaseTypes.SearchParams>(props.search || {} );
  const [ debouncedSearch ] = useDebounce(search, 500, { leading: true });

  const changePage = (pageNum:number) => {
    setSearch((oldVal) => {
      return {
        ...oldVal,
        page: pageNum,
      }
    })
  }
  const changeSearch = (newSearch: Partial<DiscogsDatabaseTypes.SearchParams>) => {
    setSearch((oldVal) => {
      return {
        ...oldVal,
        ...newSearch,
        page:1, // reset page when search changes
      }
    })
  }
  return (
    <SearchCtx.Provider value={{
      search,
      debouncedSearch,
      pagination,
      setPagination,
      changeSearch,
      changePage,
    }}>
      {props.children}
    </SearchCtx.Provider>
  )
}
export const useAlbumSearchContext = () => {
  const ctx = useContext(SearchCtx);
  if (!ctx) throw new Error("AlbumSearchContext must be used within a AlbumSearchContextProvider");
  return ctx;
}
