import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ItemTimeline from './ItemTimeline';

const ItemDetailsOrg = () => {
  const { id } = useParams();
  
  return <ItemTimeline itemId={id} />;
};

export default ItemDetailsOrg;