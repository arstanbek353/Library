const getStatusClass = (status) => {
    let className = 'text-success'
    if (status === 'Maintenance') {
        className = 'text-danger'
    } else if (status === 'Available') {
        className = 'text-success'
    } else {
        className = 'text-warning'
    }
    return className
}

export default getStatusClass