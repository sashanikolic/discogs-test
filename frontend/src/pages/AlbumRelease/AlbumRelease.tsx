import { useNavigate, useParams } from 'react-router'
import { useDiscogsApi } from "../../discogsApi/useDiscogsApi";

export const AlbumRelease = () => {
  const navigate = useNavigate();

  const params = useParams();
  const release_id = Number(params.release_id);
  if (!Number.isInteger(release_id)) throw new Error ("must have valid number for release_id");

  const discogsApi = useDiscogsApi();
  const { data, isLoading } =  discogsApi.get_release(release_id);

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-col gap-4 justify-items-start items-start">
      <div className="text-3xl font-bold">Album: {data.title}</div>
      <div className="flex flex-row gap-3">
        <img className="h-auto max-w-md" src={(data.images && data.images.length>0) ? data.images[0].uri150 : ""}/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <div className="font-bold">Artist{data.artists.length>0 && "s"}:</div>
            { data.artists.map((artist) =>
              <a href="#" key={artist.id} onClick={(e)=> {e.preventDefault(); navigate(`/artist/${artist.id}`)}}>{artist.name}</a>
            )}
          </div>
          <div className="flex flex-row gap-1">
            <div className="font-bold">Year:</div>
            <div>{data.year}</div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="font-bold">Genres:</div>
            <div>{data.genres ? data.genres.join(", "): ""}</div>
          </div>
        </div>
      </div>
    </div>
  )
}