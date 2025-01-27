import { useDiscogsApi } from "../../discogsApi/useDiscogsApi";
import { AlbumCard } from "../../components/AlbumCard";

interface ArtistReleasesProps {
  artist_id: number;
}

export const ArtistReleases = (props: ArtistReleasesProps) => {
   const discogsApi = useDiscogsApi();

  // load initial data (only 50 releases for the artist)
  const { data, isLoading } =  discogsApi.get_artist_releases(props.artist_id, {page:1, per_page:50});
  if (isLoading || !data) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* filter out only releases */}
      {!isLoading && data.releases.filter(entry=>entry.type=='release').map((release,idx) =>
        /* there are some duplicates.. so key must be tied to index (or list cleaned up) */
        <AlbumCard key={`${release.id}-${idx}`} release_id={release.id} thumb={release.thumb} title={release.title}/>
      )}
    </div>
  )
}