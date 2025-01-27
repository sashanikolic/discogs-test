import { useParams } from "react-router";
import { useDiscogsApi } from "../../discogsApi/useDiscogsApi";
import { ArtistReleases } from "./ArtistReleases";

export const Artist = () => {
  const params = useParams();
  const artist_id = Number(params.artist_id);
  if (!Number.isInteger(artist_id)) throw new Error ("must have valid number for artist_id");

  const discogsApi = useDiscogsApi();

  // load initial data
  const { data, isLoading } =  discogsApi.get_artist(artist_id);

  if (isLoading || !data) return null;

  return (
    <div className="flex flex-col gap-4 justify-items-start items-start">
      <div className="text-3xl font-bold">Artist: {data.name}</div>
      <div className="flex flex-row gap-3">
        <img className="h-auto max-w-md" src={(data.images && data.images.length>0) ? data.images[0].uri150 : ""}/>
        <div className="flex flex-col gap-2">
          { data.profile &&
            <div className="flex flex-row gap-1">
              <div className="font-bold">Profile:</div>
              <div>{data.profile}</div>
            </div>
          }
          <div className="flex flex-row gap-1">
            <div className="font-bold">Members:</div>
            { data.members?.map((member) =>
              <div key={member.id}>{member.name} {!member.active && "(Past)"}</div>
            )}
          </div>
        </div>
      </div>
      <div className="text-xl font-bold">Albums:</div>
      <ArtistReleases artist_id={artist_id}/>
    </div>
  )
}