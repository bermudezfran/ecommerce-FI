import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  overlay?: boolean
}

export const LoadingSpinner = ({ 
  message = 'Cargando...', 
  size = 'medium',
  overlay = false 
}: LoadingSpinnerProps) => {
  const spinnerContent = (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  )

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinnerContent}
      </div>
    )
  }

  return spinnerContent
} 