import { h, Component } from "preact";
import LayoutGrid from "preact-material-components/LayoutGrid";
import "preact-material-components/LayoutGrid/style.css";
import style from "./style";
import HeadphonesBG from "../../assets/landing-image.jpg";

export default class Home extends Component {
	async comp(a) {
		console.log(await a.json());
	}

	componentDidMount = () => {
		fetch("https://api.soundmolto.com/")
			.then(this.comp)
			.catch(console.error);
	};

	render() {
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
							<div class="mdc-custom-card">No data.</div>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
