import { render, screen } from '@testing-library/react'
import { CardData, VipStatsCard, PeriodStatsCard } from "../../components/CardData"

describe('CardData', () => {
  const mockStats = [
    {
      number: 10,
      label: 'Usuarios Totales',
      color: 'primary' as const
    },
    {
      number: 5,
      label: 'Usuarios Activos',
      color: 'secondary' as const
    }
  ]

  it('debería renderizar correctamente las estadísticas', () => {
    render(<CardData stats={mockStats} />)
    
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Usuarios Totales')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Usuarios Activos')).toBeInTheDocument()
  })

  it('debería mostrar el título cuando se provee', () => {
    render(<CardData stats={mockStats} title="Título de Prueba" />)
    
    expect(screen.getByText('Título de Prueba')).toBeInTheDocument()
  })

  it('debería aplicar una clase personalizada', () => {
    const { container } = render(
      <CardData stats={mockStats} className="clase-personalizada" />
    )
    
    expect(container.firstChild).toHaveClass('clase-personalizada')
  })

  it('debería aplicar la clase de color correcta', () => {
    render(<CardData stats={mockStats} />)
    
    const cards = screen.getAllByText(/10|5/)
    expect(cards[0].closest('.stat-card')).toHaveClass('primary')
    expect(cards[1].closest('.stat-card')).toHaveClass('secondary')
  })

  it('debería manejar números como string', () => {
    const statsWithString = [
      {
        number: 'N/A',
        label: 'Desconocido',
        color: 'warning' as const
      }
    ]
    
    render(<CardData stats={statsWithString} />)
    
    expect(screen.getByText('N/A')).toBeInTheDocument()
    expect(screen.getByText('Desconocido')).toBeInTheDocument()
  })
})

describe('VipStatsCard', () => {
  const mockVipData = {
    totalVipUsers: 15,
    users: [
      { id: '1', name: 'Usuario 1' },
      { id: '2', name: 'Usuario 2' }
    ]
  }

  it('debería renderizar correctamente las estadísticas VIP', () => {
    render(<VipStatsCard data={mockVipData} />)
    
    expect(screen.getByText('Estadísticas VIP')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Total VIP')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Usuarios Encontrados')).toBeInTheDocument()
  })

  it('debería manejar datos undefined', () => {
    render(<VipStatsCard data={undefined} />)
    
    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
    expect(screen.getByText('Total VIP')).toBeInTheDocument()
  })

  it('debería manejar array de usuarios vacío', () => {
    const dataWithEmptyUsers = {
      totalVipUsers: 0,
      users: []
    }
    
    render(<VipStatsCard data={dataWithEmptyUsers} />)
    
    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
    expect(screen.getByText('Usuarios Encontrados')).toBeInTheDocument()
  })
})

describe('PeriodStatsCard', () => {
  const mockPeriodData = {
    users: [
      { id: '1', name: 'Usuario 1' },
      { id: '2', name: 'Usuario 2' },
      { id: '3', name: 'Usuario 3' }
    ],
    totalVipUsers: 2
  }

  it('debería renderizar correctamente las estadísticas del período', () => {
    render(<PeriodStatsCard data={mockPeriodData} />)
    
    expect(screen.getByText('Estadísticas del Período')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Usuarios Activos')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('VIP en Período')).toBeInTheDocument()
  })

  it('debería manejar datos undefined', () => {
    render(<PeriodStatsCard data={undefined} />)
    
    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
    expect(screen.getByText('Usuarios Activos')).toBeInTheDocument()
  })

  it('debería manejar array de usuarios vacío', () => {
    const dataWithEmptyUsers = {
      users: [],
      totalVipUsers: 0
    }
    
    render(<PeriodStatsCard data={dataWithEmptyUsers} />)
    
    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
    expect(screen.getByText('Usuarios Activos')).toBeInTheDocument()
  })
}) 
