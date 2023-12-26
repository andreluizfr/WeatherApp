import './styles.css';
import earthLogo from '@assets/imgs/earth.png';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

export default function HomePage(): JSX.Element {

	const navigate = useNavigate();

	const goToWeatherPage = (event: React.MouseEvent<HTMLDivElement>) => {
		
		navigate({
			pathname: '/weather',
			search: '?city=' + (event.target as HTMLDivElement).innerHTML?.toLowerCase(),
		});
		
	};

	return (
		<main className='HomePage'>

			<motion.article 
				className='HomePage-container'
				initial={{ x: -(window.innerWidth/2), opacity: 0}}
				animate={{x: 0, opacity: 1, transition:{type: "easeIn", duration: 0.6}}}
			>
				<div className='Title-wrapper'>
					<h1 className='Title' data-testid='title'>WEATHER</h1>
					<h1 className='Subtitle' data-testid='subtitle'>select a city</h1>
				</div>

				<img src={earthLogo} className='Logo' data-testid='logo'/>

				<div className='Cities-wrapper' data-testid='cities-wrapper'>
					<div className='City' onClick={goToWeatherPage}>Dallol</div>
					<div className='City' onClick={goToWeatherPage}>Fairbanks</div>
					<div className='City' onClick={goToWeatherPage}>London</div>
					<div className='City' onClick={goToWeatherPage}>Recife</div>
					<div className='City' onClick={goToWeatherPage}>Vancouver</div>
					<div className='City' onClick={goToWeatherPage}>Yakutsk</div>
				</div>
			</motion.article>

		</main>
	);
}