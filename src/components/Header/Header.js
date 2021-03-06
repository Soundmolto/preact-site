import { h, Component } from "preact";
import { route, Link, getCurrentUrl } from "preact-router";
import Toolbar from "preact-material-components/Toolbar";
import Icon from "preact-material-components/Icon";
import "preact-material-components/Drawer/style.css";
import "preact-material-components/Toolbar/style.css";
import style from "./style";

export default class Header extends Component {
	currentUrl = "/";

	linkTo = path => () => {
		if (this.closeMenu) this.closeMenu();
		raf(_ => {
			this.setState({ currentUrl: path });
			route(path, false);
		});
	};

	goHome = e => {
		e.preventDefault();
		this.linkTo("/");
	};

	toggleMenu() {
		if (typeof window !== "undefined") {
			window.document
				.querySelector(`.${style.drawerCloseContainer}`)
				.classList.toggle(style.visible);
			window.document
				.querySelector(".mdc-drawer--permanent")
				.classList.toggle("open");
		}
	}

	toggleDropdownMenu() {
		const currentState = this.menu.MDComponent.open;
		let nextState = true;
		if (null != currentState) nextState = !currentState;
		this.menu.MDComponent.open = nextState;
	}

	closeMenu() {
		if (typeof window !== "undefined") {
			const closeContainer = window.document.querySelector(
				`.${style.drawerCloseContainer}`
			);
			const drawer = window.document.querySelector(
				".mdc-drawer--permanent"
			);
			if (closeContainer) closeContainer.classList.remove(style.visible);
			if (drawer) drawer.classList.remove("open");
		}
	}

	isActive(url) {
		let className = "";
		if (url === getCurrentUrl()) className = "active";
		return className;
	}

	render() {
		this.currentUrl = getCurrentUrl();

		return (
			<div>
				<Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Title>
								<span class={style.appName}>SoundMolto</span>
							</Toolbar.Title>
							<span class={style.menuIcon}>
								<Icon class={style.icon}>menu</Icon>
							</span>
						</Toolbar.Section>
						<Toolbar.Section
							align-end={true}
							style={{ "margin-right": "10px" }}
						>
							<div class={style.header}>
								<Link href="/">Home</Link>

								<Link href="https://app.soundmolto.com">
									App
								</Link>

								<Link href="/download">
									Download
								</Link>

								<Link href="/about">About</Link>
							</div>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<div class="mdc-toolbar-blur-bg" />
			</div>
		);
	}
}
