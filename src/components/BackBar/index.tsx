import './styles.css';
import { IoArrowBackSharp } from "react-icons/io5";
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@components/SearchBar';

function BackBar (): JSX.Element {

    const navigate = useNavigate();

    const [searchOnFocus, setSearchOnFocus] = useState(false);

    return (
        <aside className='Back-bar'>
            
            <div className='Rounded' onClick={()=>navigate(-1)}>
                <IoArrowBackSharp className='Back-icon Icon' data-testid='back-icon'/>
            </div>
    
            <SearchBar searchOnFocus={searchOnFocus} setSearchOnFocus={setSearchOnFocus}/>
            
        </aside>
    );
}

const BackBarMemoized = memo(BackBar);

export default BackBarMemoized;