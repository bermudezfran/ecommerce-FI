Para ejecutar los tests, necesitas instalar las siguientes dependencias:

```bash
npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom identity-obj-proxy
```

## Scripts de Testing

Una vez instaladas las dependencias, podes ejecutar:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- CardData.test.tsx

```