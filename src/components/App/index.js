import { h, Component } from "preact";
import { Router } from "preact-router";
import ReactGA from "react-ga";
import Header from "../Header";
import Home from "async!../../routes/home";

export default class App extends Component {
	header;

	componentDidMount() {
		ReactGA.initialize("UA-125828388-1");
		if (typeof window !== "undefined") {
			document.body.classList.add("mdc-theme--dark");
		}
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
		if (typeof window !== "undefined") {
			ReactGA.pageview(window.location.pathname + window.location.search);
			const event = new Event("url-change");
			window.document.dispatchEvent(event);
		}
	};

	get_current_route = () => this.currentUrl;

	render() {
		const url = this.get_current_route();

		return (
			<div id="app">
				<Header />
				<div class="route-container">
					<Router onChange={this.handleRoute}>
						<Home path="/" className="route-page" />
						<Home path="/about" className="route-page" />
					</Router>
				</div>
			</div>
		);
	}
}
