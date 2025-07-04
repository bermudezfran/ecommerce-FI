import { useApi } from '../../hooks/useApi'
import { getVipUsers } from '../../services/mockApi'
import { LoadingSpinner } from '../LoadingSpinner'
import './VipContulting.css'

export const VipConsulting = () => {
  const { execute, loading, error, data } = useApi(getVipUsers)

  return (
    <div className="consultas-vip-container">
        <h1>Vip Consulting</h1>
        <div className="consultas-vip-container-buttons">
            <button onClick={() => execute()}>Get Vip Users</button>
            {loading && <LoadingSpinner size='small'/>}
        </div>
        {error && <p className="consultas-vip-container-error">Error: {error}</p>}
        {data && <p className="consultas-vip-container-data">Data: {JSON.stringify(data.data?.users.map((user) => user.name))}</p>}
    </div>
  )
}
