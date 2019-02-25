import { h, Component } from 'preact';
import { Router } from 'preact-router';
import ReactGA from 'react-ga';
import Header from '../Header';
import Home from 'async!../../routes/home';

export default class App extends Component {

	header;
	headerRef = e => this.header = e;
	
	componentDidMount () {
		ReactGA.initialize('UA-125828388-1');
		if (typeof window !== "undefined") {
			document.body.classList.add('mdc-theme--dark');
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
			const event = new Event('url-change');
			window.document.dispatchEvent(event);
		}
	};

	get_current_route () {
		return this.currentUrl;
	}

	render () {
		const url = this.get_current_route.bind(this);

		return (
			<div id="app">
				<Header get_url={url} ref={this.headerRef} />
				<div class="route-container">
					<Router onChange={this.handleRoute}>
						<Home path="/" className="route-page" />
					</Router>
				</div>
				{/* <Footer ref={e => (this.footer = e)} audioContext={this.audioContext} queue={queue} audioPlayer={this.player} /> */}
			</div>
		);
	}
}
