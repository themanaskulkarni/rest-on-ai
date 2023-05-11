import styles from '../styles/RecommendationForm.module.css';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function RecommendationForm() {
	const API_URL = 'https://api.openai.com/v1/chat/completions';

	const [apiKey, setApiKey] = useState(null);
	const [typeOfPlace, setTypeOfPlace] = useState('cafe');
	const [location, setLocation] = useState('');
	const [noOfGuest, setNoOfGuest] = useState(1);
	const [haves, setHaves] = useState('');
	const [havenots, setHavenots] = useState('');
	const [title, setTitle] = useState('');
	const [map_link, setMap_link] = useState('');
	const [recommendation, setRecommendation] = useState('');

	const generate = async (query) => {
		if (!query) {
			alert('Please enter the details!');
			return;
		}

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: 'gpt-3.5-turbo',
					messages: [{ role: 'user', content: query }],
				}),
			});
			const data = await response.json();
			console.log(data);
			const recommendationData = data.choices[0].message.content;
			console.log(recommendationData);
			const { title, map_link, recommendation } =
				JSON.parse(recommendationData);
			console.log(`Visit ${title} - ${map_link}`);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const generateDummy = async (query) => {
		if (!query) {
			alert('Please enter the details!');
			return;
		}
		const DUMMY_API_URL = 'http://localhost:4000/chat-gpt-responses/1';
		try {
			const response = await fetch(DUMMY_API_URL, {
				method: 'GET',
			});
			const served_data = await response.json();
			console.log(served_data.res);
			const data = served_data.res;
			const recommendationData = data.choices[0].message.content;
			const parsedRecommendation = JSON.parse(recommendationData);
			console.log(parsedRecommendation);
			setTitle(parsedRecommendation.title);
			setMap_link(parsedRecommendation.map_link);
			setRecommendation(parsedRecommendation.recommendation);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const handleSubmit = (event) => {
		if (!apiKey) {
			alert('Please enter the ChatGPT API Key!');
			return;
		}

		console.log(`Requesting ChatGPT API with the following apiKey: ${apiKey}`);
		const query = `Suggest a ${typeOfPlace} in ${location} for a group of ${noOfGuest}. I would like to have ${haves}. Give the assistant recommendation in maximum 15 words. Provide output as	{ "title":"name_of_restaurant", "map_link":"google_map_link_of_restaurant",  "recommendation" :"assistant_recommendation"}`;
		console.log(query);
		// generate(query);
		generateDummy(query);
		event.preventDefault();
	};
	return (
		<>
			<Grid container spacing={1} maxWidth='lg' className={styles.MainGrid}>
				<Grid item xs={3}></Grid>
				<Grid item xs={3}>
					<p>Your chatGPT API Key</p>
				</Grid>
				<Grid item xs={3}>
					<FormControl>
						<TextField
							id='outlined-text'
							label='APIKey'
							type='text'
							value={apiKey}
							onChange={(e) => setApiKey(e.target.value)}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={12}>
					<p>&nbsp;</p>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={2}>
					<div>Suggest a</div>
				</Grid>
				<Grid item xs={1}>
					<FormControl fullWidth>
						<InputLabel id='select-label'>Place</InputLabel>
						<Select
							labelId='select-label'
							id='simple-select'
							value={typeOfPlace}
							label='Place'
							onChange={(e) => setTypeOfPlace(e.target.value)}
						>
							<MenuItem value='cafe'>Cafe</MenuItem>
							<MenuItem value='restaurant'>Restaurant</MenuItem>
							<MenuItem value='bar'>Bar</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={1}>
					<div>in </div>
				</Grid>
				<Grid item xs={2}>
					<FormControl
						fullWidth
						//   variant="standard"
					>
						<TextField
							id='outlined-text'
							label='City'
							type='text'
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={2}>
					<div>for a group of </div>
				</Grid>
				<Grid item xs={1}>
					<TextField
						id='outlined-number'
						label='Number'
						type='number'
						value={noOfGuest}
						onChange={(e) => setNoOfGuest(e.target.value)}
					/>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={3}>
					<br />
					<div>I would like to have</div>
				</Grid>
				<Grid item xs={6}></Grid>
				<Grid item xs={3.5}></Grid>

				<Grid item xs={8.5}>
					<TextField
						id='outlined-textarea'
						label='Multiline Placeholder'
						placeholder='Placeholder'
						multiline
						style={{ minWidth: '100%' }}
						value={haves}
						onChange={(e) => setHaves(e.target.value)}
					/>
				</Grid>

				<Grid item xs={3}></Grid>
				<Grid item xs={3}>
					<br />
					<div>I Don't want to have</div>
				</Grid>
				<Grid item xs={6}></Grid>
				<Grid item xs={3.5}></Grid>

				<Grid item xs={8.5}>
					<TextField
						id='outlined-textarea'
						label='Multiline Placeholder'
						placeholder='Placeholder'
						multiline
						style={{ minWidth: '100%' }}
						value={havenots}
						onChange={(e) => setHavenots(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}></Grid>
				<Grid item xs={3}>
					<br />
					<Button variant='outlined' onClick={handleSubmit}>
						Recommend
					</Button>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<div>
						{!title ? (
							''
						) : (
							<Card>
								<CardContent>
									<Typography variant='h5' component='div'>
										{title}
									</Typography>
									<br />
									<Typography variant='body2'>{recommendation}</Typography>
								</CardContent>
								<CardActions>
									<Button
										size='small'
										onClick={() => {
											window.open(`${map_link}`, '_blank', 'noreferrer');
										}}
									>
										Learn More
									</Button>
								</CardActions>
							</Card>
						)}
					</div>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</>
	);
}
