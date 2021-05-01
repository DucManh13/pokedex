import { Link } from 'react-router-dom';
import { formatText } from '../App'

function TypeBar(props) {
  
  return (<Link to={`/type/${props.url.slice(31)}`}>
    <span className={`badge mr-1 ${props.width?props.width:"w-70"} ${props.name}`} >{formatText(props.name)}</span>
  </Link>);
}
export default TypeBar;
