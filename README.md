# EcommerceFI - Prueba Técnica Frontend para Factor It

Aplicación de ecommerce desarrollada en React + TypeScript para challenge técnico. 
Implementa sistema de carritos inteligentes con detección automática de promociones.

## �� Características

- **3 tipos de carritos**: Común, Fecha Especial, VIP
- **Detección automática** del tipo de carrito según usuario y fecha
- **Sistema de descuentos**:
  - 25% por comprar exactamente 4 productos
  - $100 de descuento por más de 10 productos
  - $300 de descuento en fechas especiales
  - $500 + producto más barato gratis para usuarios VIP
- **Gestión completa** de carritos y productos
- **Datos mockeados** para simulación alojados en la carpeta 'data'
- **Testing unitario** con jest.

## ��️ Tecnologías

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Zustand** - Gestión de estado
- **React Router** - Navegación
- **Vite** - Build tool y dev server
- **CSS Modules** - Estilos modulares
- **Testing** - Testeo de estados y componentes.

## 📦 Instalación

### Prerrequisitos
- Node.js v21.4.0 o superior
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/bermudezfran/ecommerce-FI.git
cd ecommerce-FI
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en navegador**
