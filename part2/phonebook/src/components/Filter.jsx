const Filter = ({value, onChange}) => {
    return (
      <div>
        filter shown with <input id="filter" value={value} onChange={onChange}/>
      </div>
    )
}
  
export default Filter
  