import { useContext, useEffect } from 'react'
import UseRoutes from './routes'
import { Context } from './index'
import { observer } from "mobx-react-lite"
import Spinner from './components/spinner/spinner'
import Sidebar from './components/sidebar/sidebar'

function App() {

    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <Spinner />
    }

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row App__row">
                    <Sidebar />
                    <div className="col-sm-10 p-5">
                        <UseRoutes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(App);
