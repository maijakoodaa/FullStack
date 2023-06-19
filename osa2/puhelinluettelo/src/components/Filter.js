const Filter = (props) => {
    return (
      <form>
      <input value={props.value} onChange={props.onChange} />
      </form>
    )
  }
export default Filter