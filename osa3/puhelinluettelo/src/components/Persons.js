

const Persons = (props) => {
  
    return (
      <div>
      {props.PersonsToShow.map((person) => (
        <div key={person.id}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => props.Remove(person.name, person.id)}>delete</button>
        </div>
        ))}
      </div>
    )
  }
export default Persons