const Pagination = ({ prev, next, pages, render }) => {
    if (!prev.page && !next.page) {
        return null
    }
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {prev.page ?
                        <li className="page-item" onClick={() => render(prev.page)}>
                            <a className="page-link" href="#">Previous</a>
                        </li> :
                        ''}
                    {pages ?
                        Array.from(Array(pages).keys())
                            .map(page => {
                                return (<li
                                    key={page}
                                    onClick={() => render(page + 1)}
                                    className="page-item"
                                >
                                    <a className="page-link" href="#">{page + 1}</a>
                                </li>)
                            }) : ''}

                    {next.page ?
                        <li className="page-item" onClick={() => render(next.page)}>
                            <a className="page-link" href="#">Next</a>
                        </li> :
                        ''}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination