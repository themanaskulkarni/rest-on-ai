import styles from '../styles/Home.module.css';
import RecommendationForm from '../component/recommendationForm';
// import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Home() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#282c34',
			},
		},
	});
	return (
		<div className={styles.Home}>
			<ThemeProvider theme={theme}>
				<header className={styles.HomeHeader}>RestOnAI</header>
				<br />
				<RecommendationForm />{' '}
			</ThemeProvider>{' '}
		</div>
	);
}
