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

const Bookings = (props) => {
    const history = useHistory();
	const { bookings } = props;
	const classes = useStyles();
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Total Price</TableCell>
                                    <TableCell align="left">Check In</TableCell>
                                    <TableCell align="left">Check Out</TableCell>
                                    <TableCell align="left">Customer</TableCell>
									<TableCell align="left">Hotel</TableCell>
                                    <TableCell align="left">Room</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bookings.map((booking) => {
									return (
										<TableRow>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													${booking.total_price}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{booking.check_in}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{booking.check_out}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{booking.customer}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{booking.hotel}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{booking.room}
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Bookings;