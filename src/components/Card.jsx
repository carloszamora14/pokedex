import colors from '../constants/colors';
import getPokemonFallbackImage from '../utils/getPokemonFallbackImage';

function Card({ id, name, image, types }) {
  if (!image || !types || !name || !id) {
    return <div>No data</div>;
  }
  return (
    <div className="relative rounded-lg p-4 shadow-lg full-card">
      <div
        className={`p-2 rounded-t-lg card-container}`}
        style={{ backgroundColor: colors[types[0]] }}
      >
        <img
          className="w-full"
          src={image}
          alt={name}
          onError={e => {
            e.target.onerror = null;
            e.target.src = getPokemonFallbackImage(id);
          }}
        />
      </div>
      <div className="p-4 card-container rounded-b-lg bg-gray-800">
        <div className="flex justify-between items-center card-body text-white">
          <div>
            <p className="font-bold capitalize">{name}</p>
            <p>ID: {id}</p>
          </div>
          <img
            src="/assets/star.svg"
            alt="Favorite"
            className="w-10 h-10 cursor-pointer transition-transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
