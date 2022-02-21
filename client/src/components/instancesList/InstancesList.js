import getStatusClass from '../../helpers/getStatusClass'
import date from '../../helpers/dateFormat'
import { Link } from 'react-router-dom'

const InstancesList = ({ instances }) => {
    if (instances.length === 0) return <p>none</p>

    return instances.map(instance => {
        return (
            <div key={instance._id}>
                <p className={getStatusClass(instance.status)}>{instance.status}</p>
                <p><strong>Imprint: </strong>{instance.imprint}</p>
                <p><strong>ID: </strong> <Link to={`../catalog/bookinstances/${instance._id}`}>{instance._id}</Link></p>
                {instance.status != 'Available' ?
                    <p><strong>Due back: </strong>{date(instance.due_back)}</p> : ''
                }
            </div>
        )
    })
}

export default InstancesList