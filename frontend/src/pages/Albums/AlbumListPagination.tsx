import { useAlbumSearchContext } from "../../discogsApi/useSearchFilter";


export const AlbumListPagination = () => {
  const searchCtx = useAlbumSearchContext();

  // no pagination (no calls made), do nothing
  if (!searchCtx.pagination) return null;

  /**
   * paging component is composed of
   * Prev (if there currentPage>1)
   * 1 (first page, if curPage!=1 and if there are more than 1 page)
   * ... (if there are items in between 1 and X, and there are more than 1 page)
   * X (current page)
   * ... (if there are items in between X ans N, and there are more than 1 page)
   * N (last page, if there is more than 1 page)
   * Next
   */
  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {searchCtx.pagination.page>1 &&
         <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
               onClick={()=> { searchCtx.changePage(searchCtx.pagination!.page-1)} } 
            >
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
        }
        {searchCtx.pagination.page!=1 &&
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
               onClick={()=> { searchCtx.changePage(1)} } 
            >
              1
            </a>
          </li>
        }
        {searchCtx.pagination.pages>1 && searchCtx.pagination.page-1>0 &&
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </a>
          </li>
        }
        <li>
          <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            {searchCtx.pagination.page}
          </a>
        </li>
        {searchCtx.pagination.pages>1 && searchCtx.pagination.pages-searchCtx.pagination.page>0 &&
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </a>
          </li>
        }
        
        {searchCtx.pagination.pages>1 && searchCtx.pagination.page<searchCtx.pagination.pages &&
        <li>
          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             onClick={()=> { searchCtx.changePage(searchCtx.pagination!.pages)} } 
          >
            {searchCtx.pagination.pages}
          </a>
        </li>
        }
        {searchCtx.pagination.pages>1 && searchCtx.pagination.page<searchCtx.pagination.pages &&
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
               onClick={()=> { searchCtx.changePage(searchCtx.pagination!.page+1)} } 
            >
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </li>
        }
      </ul>
    </nav>
  )
}