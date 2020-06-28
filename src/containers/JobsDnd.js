import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
// const getItems = (jobs) =>
// 	Array.from({ length: jobs.length }, (job, index) => job).map((job) => ({
// 		id: `${job.id}`,
// 		content: `${job.companyName} ${job.rating}`,
// 	}));

const getItems = (count = 3, offset = 0) =>
	Array.from({ length: count }, (v, k) => {
		console.log('k:', k);
		console.log('v:', v);
		return k;
	}).map((k) => ({
		id: `item-${k + offset}`,
		content: `item ${k + offset}`,
	}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250,
});

class JobsDnd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneInt: [],
			inPersonInterview: [],
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidMount() {
		const { jobs } = this.props;
		// create a new array from the jobs array with jobs that have a status of "phone interview"
		// set state for items with this new array

		const phoneInt = jobs.filter((job) => {
			if (job.status === 'phone interview') {
				return true;
			}
		});
		// create a new array from the jobs array with jobs that have a status of "in person interview"
		// set state for inPersonInterview with this new array
		const inPersonInt = [];

		for (let i = 0; i < jobs.length; i++) {
			let curEl = jobs[i];
			if (curEl['status'] === 'in person interview') {
				inPersonInt.push(curEl);
			}
		}

		this.setState({
			inPersonInterview: getItems(inPersonInt),
			phoneInt: getItems(phoneInt, 3),
		});
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const phoneInt = reorder(this.state.phoneInt, result.source.index, result.destination.index);

		this.setState({
			phoneInt: phoneInt,
		});
	}

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
							{this.state.phoneInt.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
							{this.state.inPersonInterview.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default JobsDnd;
