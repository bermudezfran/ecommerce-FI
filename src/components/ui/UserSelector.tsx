import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { mockUsers } from '../../data/mockUsers'
import './UserSelector.css'

export const UserSelector = () => {
  const { currentUser, setCurrentUser } = useAppStore()
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
            <span className="user-name">{currentUser.name}</span>
            <span className="user-status">
              {currentUser.isVip ? 'VIP' : 'Común'}
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
            {mockUsers.map(user => (
              <div
                key={user.id}
                className={`user-option ${currentUser.id === user.id ? 'selected' : ''}`}
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