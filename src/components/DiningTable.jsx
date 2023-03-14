import { Grid, Grow } from '@mui/material';

const DiningTable = () => {
	return (
		<Grid item xs={12} sm={6}>
			<Grow in timeout={500}>
				<img src='diningtable.png' width='400px' />
			</Grow>
		</Grid>
	);
};

export default DiningTable;
