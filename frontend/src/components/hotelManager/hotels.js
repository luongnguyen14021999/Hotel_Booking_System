import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

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
}));

const Hotels = (props) => {
    const history = useHistory();
	const { hotels } = props;
	const classes = useStyles();
	if (!hotels || hotels.length === 0) {
        history.push('/hotel/create/');
    }
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Hotel</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Service</TableCell>
                                    <TableCell align="left">Rating</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{hotels.map((hotel) => {
									return (
										<TableRow>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/hotel/' + hotel.name}
													className={classes.link}
												>
													{hotel.name}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href={'/hotel/' + hotel.address}
													className={classes.link}
												>
													{hotel.address}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href={'/hotel/' + hotel.services}
													className={classes.link}
												>
													{hotel.services}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href={'/hotel/' + hotel.rating}
													className={classes.link}
												>
													{hotel.rating}
												</Link>
											</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/hotel/edit/' + hotel.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/hotel/delete/' + hotel.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={3} align="right">
										<Button
											href={'/hotel/create/'}
											variant="contained"
											color="primary"
										>
											New Hotel
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Hotels;