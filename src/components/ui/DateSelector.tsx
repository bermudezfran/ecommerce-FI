import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { specialDates } from '../../data/mockDates'
import './DateSelector.css'

export const DateSelector = () => {
  const { simulatedDate, setSimulatedDate, isCurrentDateSpecial, getCurrentSpecialDateInfo } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleDateChange = (dateString: string) => {
    const newDate = new Date(dateString)
    setSimulatedDate(newDate)
    setIsOpen(false)
  }

  const handleTodayClick = () => {
    setSimulatedDate(new Date())
    setIsOpen(false)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const currentSpecialDate = getCurrentSpecialDateInfo()

  return (
    <div className="date-selector">
      <div className="current-date" onClick={() => setIsOpen(!isOpen)}>
        <div className="date-info">
          <span className="date-icon">📅</span>
          <div className="date-details">
            <span className="date-text">{formatDate(simulatedDate)}</span>
            {isCurrentDateSpecial && currentSpecialDate && (
              <span className="special-date-badge">
                {currentSpecialDate.name}
              </span>
            )}
          </div>
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="date-dropdown">
          <div className="dropdown-header">
            <h4>Simular Fecha</h4>
            <button 
              className="close-dropdown"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="date-options">
            <div className="today-option" onClick={handleTodayClick}>
              <span className="today-icon">🕐</span>
              <span className="today-text">Hoy (Fecha Real)</span>
            </div>
            
            <div className="special-dates-section">
              <h5>Fechas Especiales</h5>
              <div className="special-dates-list">
                {specialDates.map(specialDate => (
                  <div
                    key={specialDate.date}
                    className={`special-date-option ${
                      simulatedDate.toISOString().split('T')[0] === specialDate.date ? 'selected' : ''
                    }`}
                    onClick={() => handleDateChange(specialDate.date)}
                  >
                    <div className="special-date-info">
                      <span className="special-date-name">{specialDate.name}</span>
                      <span className="special-date-date">
                        {new Date(specialDate.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                    <span className="special-badge">🎉</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 