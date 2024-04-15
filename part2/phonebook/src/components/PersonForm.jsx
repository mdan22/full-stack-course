const PersonForm = ({onSubmit, name, number, onChangeName, onChangeNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {/* I added 'id="name"' bc of dev console msg :)*/}
        name: <input id="name" value={name} onChange={onChangeName} autoComplete="name"/> {/* I added autocomplete :) */}
      </div>
      <div>
        number: <input id="tel" value={number} onChange={onChangeNumber} autoComplete="tel"/> {/* I added autocomplete :) */}
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
