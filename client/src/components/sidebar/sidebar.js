import { useContext } from 'react'
import { Context } from '../../index'
import { NavLink } from 'react-router-dom'
import { roles } from '../../config/config'
import Permission from '../../Permission'
const Sidebar = () => {

    const { store } = useContext(Context);
    return (
        <div className="col-sm-2 d-flex flex-column flex-shrink-0 p-3 text-white bg-light">
            <NavLink to="/" className="fs-4">Library</NavLink>
            <hr />
            {store.isAuth ?
                <div className="">
                    <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
                        <li><NavLink to="/" className="nav-link link-dark">Home</NavLink></li>
                        <li><NavLink to="/catalog/books" className="nav-link link-dark">All books</NavLink></li>
                        <li><NavLink to="/catalog/authors" className="nav-link link-dark">All authors</NavLink></li>
                        <li><NavLink to="/catalog/genres" className="nav-link link-dark">All genres</NavLink></li>
                        <li><NavLink to="/catalog/bookinstances" className="nav-link link-dark">All book-instances</NavLink></li>
                    </ul>
                    <hr />
                    <Permission roles={[roles.editor]}>
                        <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
                            <li><NavLink to="/catalog/book/create" className="nav-link link-dark">Create new book</NavLink></li>
                            <li><NavLink to="/catalog/author/create" className="nav-link link-dark">Create new author</NavLink></li>
                            <li><NavLink to="/catalog/genre/create" className="nav-link link-dark">Create new genre</NavLink></li>
                            <li><NavLink to="/catalog/bookinstance/create" className="nav-link link-dark">Create new book instance (copy)</NavLink></li>
                        </ul>
                    </Permission>
                    <hr />
                    <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
                        <li><NavLink to="/profile" className="nav-link link-dark">Profile</NavLink></li>
                    </ul>
                    <Permission>
                        <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
                            <li><NavLink to="/admin" className="nav-link link-dark">Admin</NavLink></li>
                        </ul>
                    </Permission>
                    <hr />
                    <button
                        onClick={() => store.logout()}
                        className="btn btn-outline-danger"
                    >Sign out</button>
                </div> :
                <ul className="sidebar-nav nav nav-pills flex-column mb-auto">
                    <li><NavLink to="/" className="nav-link link-dark">Home</NavLink></li>
                    <li><NavLink to="/registration" className="nav-link link-dark">Registration</NavLink></li>
                    <li><NavLink to="/login" className="nav-link link-dark">Login</NavLink></li>
                </ul>
            }
        </div>
    )
}

export default Sidebar