import { useNavigate } from 'react-router-dom';

interface AlbumCardProps {
  release_id: number;
  thumb: string;
  title: string;
}

export const AlbumCard = ({ release_id, thumb, title }: AlbumCardProps) => {
  const navigate = useNavigate();
  return (
    <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={(e)=> { e.preventDefault(); navigate(`/release/${release_id}`) }}
    >
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={thumb} alt=""/>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      </div>
    </a>
  )
}