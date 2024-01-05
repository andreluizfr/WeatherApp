import './styles.css';

import earthLogo from '@assets/imgs/earth.png';

import SearchBar from '@components/SearchBar';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HomePage(): JSX.Element {

	const navigate = useNavigate();

	const goToWeatherPage = (event: React.MouseEvent<HTMLDivElement>) => {
		
		const city = (event.target as HTMLDivElement).getAttribute('data-testid');

		if(city)
			navigate({
				pathname: '/weather',
				search: '?city=' + city.replace(' ', ''),
			});
	};

	const [searchOnFocus, setSearchOnFocus] = useState(false);

	useEffect(()=>{
		const HomePageContainerElement = (document.getElementsByClassName("HomePage-container")[0] as HTMLInputElement);
		HomePageContainerElement?.setAttribute("blur", searchOnFocus?"true":"false");
	}, [searchOnFocus]);

	return (
		<main className='HomePage'>

			<motion.div 
				className='Search-container'
				initial={{ y: -48, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition:{type: "easeIn", duration: 0.4} }}
			>
				<SearchBar searchOnFocus={searchOnFocus} setSearchOnFocus={setSearchOnFocus}/>
			</motion.div>

			<motion.article 
				className='HomePage-container'
				initial={{ x: -(window.innerWidth/2), opacity: 0 }}
				animate={{ x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6} }}
			>
				<div className='Title-wrapper'>
					<h1 className='Title' data-testid='title'>WEATHER</h1>
					<h1 className='Subtitle' data-testid='subtitle'>select a city</h1>
				</div>

				<img src={earthLogo} className='Logo' data-testid='logo'/>

				<div className='Cities-wrapper' data-testid='cities-wrapper'>
					<div className='City' onClick={goToWeatherPage} data-testid='Dallol'>Dallol</div>
					<div className='City' onClick={goToWeatherPage} data-testid='Fairbanks'>Fairbanks</div>
					<div className='City' onClick={goToWeatherPage} data-testid='London'>London</div>
					<div className='City' onClick={goToWeatherPage} data-testid='Recife'>Recife</div>
					<div className='City' onClick={goToWeatherPage} data-testid='Vancouver'>Vancouver</div>
					<div className='City' onClick={goToWeatherPage} data-testid='Yakutsk'>Yakutsk</div>
				</div>
			</motion.article>

		</main>
	);
}