const SuccessMessage = ( {message} ) => {
    const successMessageStyle = {
        color: 'red',
        fontSize: 30,
        font: 'Impact',
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: 'red',
        background: 'grey'
    }

    return (
        <div style={successMessageStyle}>
        <p>
            {message}
        </p>
        </div>
    )
}

export default SuccessMessage