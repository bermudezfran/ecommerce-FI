import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import type { User } from '../../types/user'
import './UserSelector.css'

export const UserSelector = () => {
  const users = useAppStore(s => s.users)
  const { currentUserId, setCurrentUser } = useAppStore()
  const currentUser = users.find((user: User) => user.id === currentUserId)
  const [isOpen, setIsOpen] = useState(false)

  const handleUserChange = (userId: string) => {
    setCurrentUser(userId)
    setIsOpen(false)
  }

  return (
    <div className="user-selector">
      <div className="current-user" onClick={() => setIsOpen(!isOpen)}>
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <div className="user-details">
            <span className="user-name">{currentUser?.name || 'Usuario'}</span>
            <span className="user-status">  
              {currentUser?.isVip ? 'VIP' : 'Común'}
            </span>
          </div>
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <h4>Seleccionar Usuario</h4>
            <button 
              className="close-dropdown"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="users-list">
            {users.map((user: User) => (
              <div
                key={user.id}
                className={`user-option ${currentUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => handleUserChange(user.id)}
              >
                <div className="user-option-info">
                  <span className="user-option-name">{user.name}</span>
                  <span className="user-option-status">
                    {user.isVip ? 'VIP' : 'Común'}
                  </span>
                </div>
                {user.isVip && <span className="vip-badge">VIP</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}