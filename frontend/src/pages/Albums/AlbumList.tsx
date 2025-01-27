import { useEffect } from "react";
import { useDiscogsApi } from "../../discogsApi/useDiscogsApi";
import { AlbumCard } from "../../components/AlbumCard";
import { AlbumListPagination } from "./AlbumListPagination";
import { useAlbumSearchContext } from "../../discogsApi/useSearchFilter";


// last 10 years
const YearsOptions = Array.from(Array(10),(_,idx)=> { return { value: String(2025-idx), label: String(2025-idx)} });

export const AlbumList = () => {
  const discogsApi = useDiscogsApi();
  const searchFilters = useAlbumSearchContext();

  const { data, isLoading } =  discogsApi.database_search(searchFilters.debouncedSearch);
  useEffect(()=> {
    if (!data?.pagination) return;
    searchFilters.setPagination(data.pagination);
  },[data?.pagination, searchFilters])

  return (
    <>
      {/* filters */}
      <div className="flex flex-row gap-2">
        <form className="flex flex-row gap-6">
          <div className="flex flex-row items-center">
            <label htmlFor="year" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchFilters.search.year}
              onChange={(newval)=> { searchFilters.changeSearch({year: newval.target.value})}}
            >
              {YearsOptions.map((opt)=>
                <option key={`select-year-${opt.value}`} value={opt.value}>{opt.label}</option>
              )}
            </select>
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="country" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
            <input id="country" className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchFilters.search.country}
              onChange={(newval)=> { searchFilters.changeSearch({country: newval.target.value})}}
            />
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="query" className="mr-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="query" placeholder="Search Artist, album release" className="w-80 p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchFilters.search.query}
                onChange={(newval)=> { searchFilters.changeSearch({query: newval.target.value})}}
              />
            </div>
          </div>
        </form>
      </div>

      {/* pagination, grid, pagination */}
      <div className="grid grid-cols-2 gap-3">
        {!isLoading && data && data.pagination && data.pagination.pages>1 &&
          <div className="col-span-2 justify-items-end"><AlbumListPagination/></div>
        }
        {!isLoading && data && data.results.map((result)=>
          <AlbumCard key={result.id} release_id={result.id} thumb={result.thumb} title={result.title}/>
        )}
        {!isLoading && data && data.pagination && data.pagination.pages>1 &&
          <div className="col-span-2 justify-items-end"><AlbumListPagination/></div>
        }
        {isLoading && 
          <div className="col-span-2 justify-items-center">
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </div>
    </>
  )
}