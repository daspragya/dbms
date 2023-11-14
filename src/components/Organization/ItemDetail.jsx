import { BrowserRouter as Router, useParams } from "react-router-dom";
import ItemTimeline from "./ItemTimeline";

const ItemDetailsOrg = () => {
  const { id } = useParams();
  console.log(id);
  return <ItemTimeline itemId={id} />;
};

export default ItemDetailsOrg;
