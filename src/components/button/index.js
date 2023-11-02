// import preact
import { h, render, Component } from 'preact';

export default class Button extends Component {

	// rendering a function when the button is clicked
	render() {
		let cFunction = this.props.clickFunction;
		let textInputted = this.props.textInputted;
		let styleInputted = this.props.styleInputted;

		if (typeof cFunction !== 'function') {
			cFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<button onClick={cFunction} style={styleInputted}>
				{textInputted}
			</button>
		);
	}
}
