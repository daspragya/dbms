import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ItemTimeline from './ItemTimeline';

const ItemDetails = () => {
  const { id } = useParams();
  
  return <ItemTimeline itemId={id} />;
};

export default ItemDetails;
