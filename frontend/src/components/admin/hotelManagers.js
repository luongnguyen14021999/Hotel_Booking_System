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

const HotelManagers = (props) => {
    const history = useHistory();
	const { hotelManagers } = props;
	const classes = useStyles();
	if (!hotelManagers || hotelManagers.length === 0) {
        history.push('/admin/create/');
    }
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Email</TableCell>
									<TableCell align="left">User Name</TableCell>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{hotelManagers.map((hotelManager) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{hotelManager.id}
											</TableCell>
											<TableCell align="left">{hotelManager.email}</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/' + hotelManager.user_name}
													className={classes.link}
												>
													{hotelManager.user_name}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/' + hotelManager.first_name}
													className={classes.link}
												>
													{hotelManager.first_name}
												</Link>
											</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/' + hotelManager.last_name}
													className={classes.link}
												>
													{hotelManager.last_name}
												</Link>
											</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/admin/edit/' + hotelManager.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/admin/delete/' + hotelManager.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={4} align="right">
										<Button
											href={'/admin/create/'}
											variant="contained"
											color="primary"
										>
											New Hotel Manager
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
export default HotelManagers;