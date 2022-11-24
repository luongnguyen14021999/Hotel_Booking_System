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

const Rooms = (props) => {
    const history = useHistory();
	const { rooms } = props;
	const classes = useStyles();
	if (!rooms || rooms.length === 0) {
        history.push('/room/create/');
    }
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Room</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Size</TableCell>
									<TableCell align="left">Capacity</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rooms.map((room) => {
									return (
										<TableRow>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.name}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.type}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.price}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.size}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.capacity}
												</Link>
											</TableCell>
                                            <TableCell align="left">
												<Link
													color="textPrimary"
													href=''
													className={classes.link}
												>
													{room.description}
												</Link>
											</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/room/edit/' + room.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/room/delete/' + room.id}
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
											href={'/room/create/'}
											variant="contained"
											color="primary"
										>
											New Room
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
export default Rooms;