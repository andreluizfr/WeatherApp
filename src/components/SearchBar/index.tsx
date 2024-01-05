import './styles.css';

import { IoIosSearch } from "react-icons/io";

import ProcessedCity from '@entities/ProcessedCity';

import { cityList } from '@data/cityList.json';

import filterCityListByInput from '@utils/filterCityListByInput';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface props{
    searchOnFocus: boolean;
    setSearchOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({searchOnFocus, setSearchOnFocus}: props): JSX.Element {

    //it deals with first animation of showing search bar
    const [hovered, setHovered] = useState(false);

    useEffect(()=>{
        if(hovered){
            const searchBarElement = (document.getElementsByClassName("Search-bar")[0] as HTMLInputElement);
            searchBarElement?.setAttribute("hovered", "true");
        }
    }, [hovered]);


    //it deals with string processing of the input
    const [inputValue, setInputValue] = useState("");

    function processCityString(str: string) {
        const splitedString = str.split(',');
        const obj = {} as ProcessedCity;

        obj.city = splitedString[0].replace(' ', '');
        obj.state = splitedString[1] ? splitedString[1].replace(' ', '') : null;
        obj.country = splitedString[2] ? splitedString[2].replace(' ', '') : null;

        return obj;
    }


    //it deals with showing city list prediction above search bar
    const [filteredCityList, setFilteredCityList] = useState<string[]>([]);

    useEffect(()=>{
        if(searchOnFocus && inputValue.length > 2) {
            const newCityList = filterCityListByInput(cityList, inputValue);
            setFilteredCityList(newCityList);
        } else {
            setFilteredCityList([]);
        }
    }, [searchOnFocus, inputValue]);


    //it deals with navigation to weather page on clicking at datalist option or clicking at search icon
    const navigate = useNavigate();

    function goToWeatherPageFromInput() {
        const processedCityString = processCityString(inputValue);
        goToWeatherPage(processedCityString);
    }

    function goToWeatherPageFromDataList(event: React.MouseEvent<HTMLSpanElement>) {
        const processedCityString = processCityString((event.target as HTMLSpanElement).innerHTML);
        goToWeatherPage(processedCityString);
    }

    function goToWeatherPage(processedCityString: ProcessedCity) {

        if (processedCityString.city){
            const search = "?city=" + processedCityString.city
            + (processedCityString.state ? ("&state="+processedCityString.state) : "")
            + (processedCityString.country ? ("&country="+processedCityString.country) : "");

            navigate({
                pathname: '/weather',
                search: search,
            }, {replace: window.location.pathname.includes('/weather')});
        }
    }

    return (
        <div 
            className='Search-bar' 
            onMouseOver={()=>setHovered(true)} 
        >
            <input 
                className='Search-input' 
                onChange={(e)=>setInputValue(e.target.value)}
                onFocus={()=>setSearchOnFocus(true)} 
                onBlur={()=>setTimeout(()=>setSearchOnFocus(false), 100)}
            />

            <IoIosSearch 
                className='Search-icon' 
                data-testid='Search-icon' 
                onClick={goToWeatherPageFromInput}
            />

            {filteredCityList.length > 0 &&
                <motion.div 
                    className="Cities-datalist"
                    initial={{ y: -32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition:{type: "easeOut", duration: 0.3} }}
                >
                {
                    filteredCityList.map((item) => <span className='City-option' key={item} onClick={goToWeatherPageFromDataList}>{item}</span>)
                }
                </motion.div>
            }
        </div>
    );
}