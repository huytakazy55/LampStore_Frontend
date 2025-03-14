import React from 'react'

const NavbarPrimary = () => {
  return (
    <div className='bg-yellow-400 w-full h-12'>
        <nav className='relative xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-full'>
            <ul className='flex justify-start h-full'>
                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Home</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">TV& Audio</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Smash Phone</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Laptop & Desktop</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Gadgets</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">GPS & Car</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Camera & Accessories</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>

                <li className='flex items-center px-4 h-full hover:bg-yellow-500 group'>
                    <a className='text-black font-medium' href="#">Movies & Games</a><i className='bx bx-chevron-down text-h3'></i>
                    <div className='w-full h-[300px] absolute top-[49px] left-0 shadow-lg border-t-2 border-yellow-400 opacity-0 z-[1000] -translate-y-[10px] transition-all duration-500 ease pointer-events-none bg-gray-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto'></div>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavbarPrimary