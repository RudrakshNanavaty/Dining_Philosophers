// MUI
import { Grid } from '@mui/material';
import DiningTable from './components/DiningTable';
import StatusButtons from './components/StatusButtons';

const AppLayout = () => {
	return (
		<Grid
			container
			width='100vw'
			height='100vh'
			sx={{
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<DiningTable />
			<StatusButtons />
		</Grid>
	);
};

export default AppLayout;
