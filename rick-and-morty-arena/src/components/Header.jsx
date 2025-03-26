import banner from '../assets/banner.png'

export default function Header() {
  return (
    <header 
      className="w-full h-64 bg-cover bg-center bg-gray-800" 
      style={{ 
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}