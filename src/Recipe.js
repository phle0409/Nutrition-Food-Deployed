import { useLocation } from 'react-router-dom';

const Recipe = () => {
  const location = useLocation();

  console.log(location);
  return (
    <div>
      <h1>We are in the Recipe component!!!</h1>
  </div>
  );
}

export default Recipe;