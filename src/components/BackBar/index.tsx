import './styles.css';
import { IoArrowBackSharp } from "react-icons/io5";
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

function BackBar (): JSX.Element {

    const navigate = useNavigate();

    return (
        <aside className='Back-bar'>
            <div className='Rounded' onClick={()=>navigate(-1)}>
                <IoArrowBackSharp className='Back-icon Icon' data-testid='back-icon'/>
            </div>
        </aside>
    );
}

const BackBarMemoized = memo(BackBar);

export default BackBarMemoized;