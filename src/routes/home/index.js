import { h, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";
import style from "./style";
import HeadphonesBG from "../../assets/landing-image.jpg";

export default class Home extends Component {
	state = { tracks: [] };

	comp = async (payload) => {
		const data = await payload.json();
		this.setState({ tracks: data.tracks.slice(0, 6), count: data.tracks.length });
	}

	componentDidMount = () => {
		fetch("https://api.soundmolto.com/discover")
			.then(this.comp)
			.catch(console.error);
	};

	render(props, { tracks, count }) {
		return (
			<div>
				<div
					class={`header ${style.header}`}
					style={{
						"background-image": `url(${HeadphonesBG})`,
						"background-size": "cover",
						"background-position": "center"
					}}
				>
					<div class={style.overlay}>
						<h1>
							SoundMolto <br />
							<small class={style.smol}>
								Your next home for music
							</small>
						</h1>
					</div>
				</div>
				<LayoutGrid class={style.content}>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell
							desktopCols="12"
							tabletCols="12"
							phoneCols="12"
						>
							<div class={`mdc-custom-card ${style["mdc-custom-card"]}`}>
								<h1>Latest tracks {count}</h1>
								<div class={style.container}>
									{tracks.length > 0 ?
										tracks.map(track => (
											<a href={`https://app.soundmolto.com/${track.user.url}/${track.url}`}>
												<div class={style.artwork} style={{ backgroundImage: `url(${track.artwork || track.user.profilePicture})` }}></div>
												<p title={track.name}>
													{track.name}
												</p>
												<p class={style.user} title={track.user.firstName || track.user.displayName || "Untitled User"}>
													{track.user.firstName || track.user.displayName || "Untitled User"}
												</p>
											</a>
										)) : <p>No data</p>
									}
								</div>
							</div>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
