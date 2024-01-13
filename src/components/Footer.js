import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import { MdOutlineMailOutline } from 'react-icons/md';
import { GiSpiderWeb } from 'react-icons/gi';

const Footer = () => {
    return (
        <div className='bg-transparent border-double hover:bg-gray-800 border-t-2 rounded text-white p-6 mt-auto mb-0 w-full md:w-auto'>
            <div className='flex flex-row justify-around gap-1'>
                <a
                    href='https://www.linkedin.com/in/behnam-saba-979915134/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 hover:text-indigo-500'>
                    <AiFillLinkedin size={24} />
                    <span>Linkedin</span>
                </a>
                <a
                    href='https://github.com/behnamsaba'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 hover:text-indigo-500'>
                    <AiOutlineGithub size={24} />
                    <span>GitHub</span>
                </a>
                <a
                    href='https://behnam-saba.onrender.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 hover:text-indigo-500'>
                    <GiSpiderWeb size={24} />
                    <span>Website</span>
                </a>
                <a
                    href='mailto:behnams71@gmail.com'
                    className='flex items-center space-x-2 hover:text-indigo-500'>
                    <MdOutlineMailOutline size={24} />
                    <span>Mail</span>
                </a>
            </div>
        </div>
    );
};

export default Footer;