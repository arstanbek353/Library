import { useContext, useEffect } from "react"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"
import UserService from "../../services/userService"
import { Select } from "../../components/formControls/formControls"
import { roles } from "../../config/config"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"



const User = ({ user }) => {
    const { store } = useContext(Context);
    const { register, setValue } = useForm();

    const deleteHendler = async () => {
        if (!window.confirm('Delete?')) return
        await UserService.deleteUser(user.email)
        store.deleteUser(user.email)
    }

    const roleChangeHendler = async (e) => {
        console.log(user.email, e.target.value)
        await UserService.setUserRole(user.email, e.target.value)
        store.setUserRole(user.email, e.target.value)
    }

    useEffect(() => {
        setValue('role', user.role)
    }, [])

    return (
        <div className="card mb-3">
            <div className="card-header">
                User {user.email}
            </div>
            <div className="card-body">
                <h5 className="card-title">Borrowed books</h5>
                <ol className="list-group list-group-numbered mb-4">
                    {user.bookInstances.length != 0 ? user.bookInstances.map(bookInstance => {
                        return (
                            <li key={bookInstance} className="list-group-item">
                                <Link to={`../catalog/bookInstances/${bookInstance}`}>{bookInstance}</Link>
                            </li>
                        )
                    }) : 'none'}
                </ol>
                <hr />
                <p className="card-text">Change permission</p>
                <Select
                    register={register}
                    onChange={roleChangeHendler}
                    name="role"
                    disabled={store.isLoading}
                    options={Object.keys(roles).map(role => ({
                        value: role,
                        id: role
                    }))} />
                <hr />
                <p className="card-text">Delete user</p>
                <button
                    onClick={deleteHendler}
                    className="btn btn-danger"
                    disabled={store.isLoading}
                >Delete</button>
            </div>
        </div>
    )
}

const Users = ({ users }) => {
    return (users.map(user => <User user={user} key={user.email} />)
    )
}


const Admin = () => {
    const { store } = useContext(Context);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            store.setUsers(response.data)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1 className="mb-5">Admin</h1>
            <div>
                {<Users users={store.users} />}
            </div>
        </div>
    )
}

export default observer(Admin)