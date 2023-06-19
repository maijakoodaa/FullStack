import { v4 as uuidv4 } from 'uuid';

const Persons = (props) => {
    return (
      <div>
      {props.PersonsToShow.map((person) => (
        <p key={uuidv4()}>{person.name} {person.number}</p>))}
      </div>
    )
    
  }
export default Persons