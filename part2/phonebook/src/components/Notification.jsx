const Notification = ({message, type }) => {
    if (message === null) {
        return null
    }
    const notificationsStyle = (type === 'error') ? "redMessage": "greenMessage"
    
    return (
        <div className={notificationsStyle}>
            {message}
        </div>
    )
}

export default Notification