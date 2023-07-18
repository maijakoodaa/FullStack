const Notification = ({ message, successful }) => {
    if (message === null) {
      return null
    }
    if (successful === 'yes') {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    if (successful === 'no') {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    if (successful === null) {
      return null
    }
  }

  export default Notification