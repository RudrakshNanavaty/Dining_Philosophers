// MUI
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Local Files
import AppLayout from './AppLayout';
import assets from './assets';

const App = () => {
	return (
		// custom theme
		<ThemeProvider theme={createTheme(assets.theme)}>
			<CssBaseline />
			<AppLayout />
		</ThemeProvider>
	);
};

export default App;
