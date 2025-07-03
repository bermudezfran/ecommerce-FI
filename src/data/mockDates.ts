export const specialDates = [
  {
    date: '2024-12-25',
    name: 'Navidad',
    description: 'Descuentos especiales de Navidad'
  },
  {
    date: '2024-11-11',
    name: 'Día del Soltero',
    description: 'Ofertas especiales para solteros'
  },
  {
    date: '2024-10-31',
    name: 'Halloween',
    description: 'Descuentos de Halloween'
  },
  {
    date: '2024-09-15',
    name: 'Día del Cliente',
    description: 'Celebración especial para clientes'
  },
  {
    date: '2024-08-15',
    name: 'Día de las Ofertas',
    description: 'Ofertas increíbles por tiempo limitado'
  },
  {
    date: '2024-07-04',
    name: 'Independencia',
    description: 'Descuentos patrióticos'
  },
  {
    date: '2024-06-21',
    name: 'Día del Padre',
    description: 'Ofertas especiales para papá'
  },
  {
    date: '2024-05-10',
    name: 'Día de la Madre',
    description: 'Descuentos especiales para mamá'
  },
  {
    date: '2024-04-01',
    name: 'Día de los Inocentes',
    description: 'Ofertas especiales'
  },
  {
    date: '2024-03-08',
    name: 'Día de la Mujer',
    description: 'Descuentos especiales para mujeres'
  },
  {
    date: '2024-02-14',
    name: 'San Valentín',
    description: 'Ofertas románticas'
  },
  {
    date: '2024-01-01',
    name: 'Año Nuevo',
    description: 'Descuentos de año nuevo'
  }
]

export const isSpecialDate = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0]
  return specialDates.some(specialDate => specialDate.date === dateString)
}

export const getSpecialDateInfo = (date: Date) => {
  const dateString = date.toISOString().split('T')[0]
  return specialDates.find(specialDate => specialDate.date === dateString)
}

export const getCurrentDate = (): Date => {
  return new Date()
} 