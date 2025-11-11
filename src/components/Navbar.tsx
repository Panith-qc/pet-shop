import { Logo } from '../assets/images/images'
import Button from './Button'

const Navbar = () => {
    return (
        <nav className='w-screen p-8 bg-whiteColor lg:px-24 lg:py-8 lg:flex lg:items-center lg:justify-between'>
            <div className='shrink-0 w-40 cursor-pointer'>
                <img
                    className='w-full h-full'
                    src={Logo}
                    alt="Logo"
                />
            </div>
            <div className='hidden lg:flex items-center justify-between'>
                <Button
                    title='Sign up'
                    titleClassName='hover:text-yellowColor'
                />
                <Button
                    title='Log in'
                    mainClassName='bg-blueColor hover:bg-yellowColor'
                    titleClassName='text-whiteColor'
                />
            </div>
        </nav>
    )
}

export default Navbar