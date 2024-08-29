import Link from 'next/link'

export default function SideBar() {
        return (
                <div className='flex flex-col gap-3'>
                        <Link
                                className='bg-gray-50 border-gray-800 border-b py-4 flex justify-center hover:bg-gray-200'
                                href='/admin'>
                                User
                        </Link>

                        <Link
                                className='bg-gray-50 border-gray-800 border-b py-4 flex justify-center hover:bg-gray-200'
                                href='/admin/portfolios'>
                                Porfolios
                        </Link>


                        <Link
                                className='bg-gray-50 border-gray-800 border-b py-4 flex justify-center hover:bg-gray-200'
                                href='/admin/services'>
                                Services
                        </Link>

                        <Link
                                className='bg-gray-50 border-gray-800 border-b py-4 flex justify-center hover:bg-gray-200'
                                href='/admin/skills'>
                                Skills
                        </Link>

                        <Link
                                className='bg-gray-50 border-gray-800 border-b py-4 flex justify-center hover:bg-gray-200'
                                href='/admin/certificates'>
                                certificates
                        </Link>

                </div>
        )
}
