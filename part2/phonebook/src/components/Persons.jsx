const Persons = ({persons, onDelete}) => {
  return (
    <div>
      {/* using style is a bit advanced but entrys are now displayed like in the picture*/}
       <ul style={{ listStyleType: 'none', padding: 0}}>
        {/* key: I used a dedicated id attribute instead of using name*/}
        {persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => onDelete(person.id)}>remove</button></li>)}
      </ul>
    </div>
  )

}

export default Persons
