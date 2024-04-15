const PersonForm = ({onSubmit, value, onChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {/* I added 'id="nameInput"' bc of dev console msg :)*/}
        name: <input id="nameInput" value={value} onChange={onChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
