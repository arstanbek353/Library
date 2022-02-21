import { useContext } from "react"
import { Context } from "./index"
function Permission(props) {
    const { store } = useContext(Context);
    const roles = props.roles

    let isPermission = null
    if (store.user.role === 'admin') {
        isPermission = true
    } else {
        isPermission = roles ? roles.find(role => role === store.user.role) : null
    }
    return (
        <>
            {isPermission ? props.children : null}
        </>
    )
}

export default Permission