import React, { useEffect } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

	const checkIfWalletIsConnected = async () => {
		try {
		  const { solana } = window;
	
		  if (solana?.isPhantom) {
			window.alert("Phantom wallet found!");
			const response = await solana.connect({ onlyIfTrusted: true });
			window.alert("Connected with publicKey", response.publicKey.toString());
			// setWalletAddress(response.publicKey.toString());
		  } else {
			alert("Solana object not found! Get a Phantom wallet.");
		  }
		} catch (error) {
		  window.alert("Wallet connection error:", error);
		}
	  };

	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected()
		};
		window.addEventListener("load", onLoad);
		return () => window.removeEventListener("load", onLoad);
	}, []);
	
	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
				</div>
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Adapted from @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
