import { useState } from 'react';
// MUI
import { PersonRounded } from '@mui/icons-material';
import { Button, ButtonGroup, Grid, Grow, Typography } from '@mui/material';
import { amber, deepOrange, lime, orange, teal } from '@mui/material/colors';

const AppLayout = () => {
	class Semaphore {
		constructor(initialCount) {
			this.count = initialCount;
			this.waitingList = [];
		}

		wait() {
			return new Promise(resolve => {
				if (this.count > 0) {
					this.count--;
					resolve();
				} else {
					this.waitingList.push(resolve);
				}
			});
		}

		signal() {
			if (this.waitingList.length > 0) {
				const resolve = this.waitingList.shift();
				resolve();
			} else {
				this.count++;
			}
		}
	}

	const [philosophers, setPhilosophers] = useState([
		{ id: 'Philosopher 1', state: 'THINKING' },
		{ id: 'Philosopher 2', state: 'THINKING' },
		{ id: 'Philosopher 3', state: 'THINKING' },
		{ id: 'Philosopher 4', state: 'THINKING' },
		{ id: 'Philosopher 5', state: 'THINKING' }
	]);

	let forks = [
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1)
	];
	let phil = [
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1),
		new Semaphore(1)
	];

	let colors = [
		lime[700],
		amber[500],
		teal[500],
		orange[500],
		deepOrange[500]
	];

	const iAmHungry = async index => {
		// check for forks available
		// await forks[index % forks.length].wait();
		await forks[(index + 1) % forks.length].wait();

		await forks[index].wait();

		// make him eat for some time
		setPhilosophers([
			...philosophers.slice(0, index),
			{ ...philosophers[index], state: 'EATING' },
			...philosophers.slice(index + 1, philosophers.length)
		]);

		// Eating for 3 seconds
		await sleep(3000, index);

		// release the forks
		forks[(index + 1) % forks.length].signal();
		forks[index].signal();

		// take back to thinking
		setPhilosophers([
			...philosophers.slice(0, index),
			{ ...philosophers[index], state: 'THINKING' },
			...philosophers.slice(index + 1, philosophers.length)
		]);
	};

	const makeHungry = index => {
		if (philosophers[index].state === 'THINKING') {
			setPhilosophers([
				...philosophers.slice(0, index),
				{ ...philosophers[index], state: 'HUNGRY' },
				...philosophers.slice(index + 1, philosophers.length)
			]);

			console.log(index, 'makeHungry called');

			iAmHungry(index);
		}
	};

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
			<Grid item sm={12} md={6}>
				<Grow in timeout={500}>
					<img src='diningtable.png' width='400px' />
				</Grow>
			</Grid>
			<Grid
				item
				sm={12}
				md={6}
				sx={{
					'& > *': {
						m: 1
					}
				}}
			>
				{philosophers.map((philosopher, index) => {
					return (
						<Grow in timeout={500} key={philosopher.id}>
							<ButtonGroup
								key={index}
								variant='contained'
								orientation='vertical'
								disableElevation
							>
								<PersonRounded
									key='iconKey'
									sx={{
										alignSelf: 'center',
										color: colors[index]
									}}
								/>
								<Typography key='textKey'>
									{philosopher.id}
								</Typography>
								<Button
									color={
										philosopher.state === 'EATING'
											? 'success'
											: 'primary'
									}
									key='one'
								>
									Eating
								</Button>
								<Button
									key='two'
									color={
										philosopher.state === 'HUNGRY'
											? 'success'
											: 'primary'
									}
									onClick={e => makeHungry(index)}
								>
									Hungry
								</Button>
								<Button
									color={
										philosopher.state === 'THINKING'
											? 'success'
											: 'primary'
									}
									key='three'
								>
									Thinking
								</Button>
							</ButtonGroup>
						</Grow>
					);
				})}
			</Grid>
		</Grid>
	);
};

function sleep(milliseconds, index) {
	return new Promise(resolve =>
		setTimeout(() => {
			console.log(`${index} timer running.`);
			resolve();
		}, milliseconds)
	);
}

export default AppLayout;
