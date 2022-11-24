import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	hotelTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	hotelText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

// Searching hotels based on hotel name and locations
const Search = () => {
	const classes = useStyles();
	const search = 'search';
	const [appState, setAppState] = useState({
		search: '',
		hotels: [],
	});

	useEffect(() => {
		axiosInstance.get(search + '/' + window.location.search).then((res) => {
			const allHotels = res.data;
			setAppState({ hotels: allHotels });
			console.log(allHotels);
		});
	}, [setAppState]);

	return (
        <React.Fragment>
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {appState.hotels.map((hotel) => {
                    return (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={hotel.id} xs={12} md={4}>
                            <Card className={classes.card}>
                                <Link
                                    color="textPrimary"
                                    href={'/hotel/'+hotel.id}
                                    className={classes.link}                                       
                                >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={hotel.image}
                                        title="Image title"
                                    />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                        className={classes.postTitle}
                                    >
                                        {hotel.name.substr(0, 50)}...
                                    </Typography>
                                    <div className={classes.postText}>
                                        <Typography
                                            component="p"
                                            color="textPrimary"
                                        ></Typography>
                                        <Typography variant="p" color="textSecondary">
                                            {hotel.address.substr(0, 60)}...
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    </React.Fragment>
	);
};
export default Search;