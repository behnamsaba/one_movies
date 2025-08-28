import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import { MdOutlineMailOutline } from 'react-icons/md';
import { GiSpiderWeb } from 'react-icons/gi';

const Footer = () => {
    return (
        <footer className='bg-gray-900 border-t border-gray-700 text-white p-6 mt-auto w-full'>
            <div className='max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm'>
                <a
                    href='https://www.linkedin.com/in/behnam-saba-979915134/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                    className='inline-flex items-center gap-2 hover:text-indigo-400'>
                    <AiFillLinkedin size={20} />
                    <span>LinkedIn</span>
                </a>
                <a
                    href='https://github.com/behnamsaba'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub'
                    className='inline-flex items-center gap-2 hover:text-indigo-400'>
                    <AiOutlineGithub size={20} />
                    <span>GitHub</span>
                </a>
                <a
                    href='https://behnam-saba.onrender.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Website'
                    className='inline-flex items-center gap-2 hover:text-indigo-400'>
                    <GiSpiderWeb size={20} />
                    <span>Website</span>
                </a>
                <a
                    href='mailto:behnams71@gmail.com'
                    aria-label='Email'
                    className='inline-flex items-center gap-2 hover:text-indigo-400'>
                    <MdOutlineMailOutline size={20} />
                    <span>Mail</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
