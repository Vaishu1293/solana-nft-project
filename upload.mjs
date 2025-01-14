import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import pkg from '@metaplex-foundation/mpl-candy-machine'; // Import CommonJS module
const { mplCandyMachine } = pkg;
import { publicKey } from '@metaplex-foundation/umi';
import { Keypair } from '@solana/web3.js';
import { readFileSync } from 'fs';
import path from 'path';

// Initialize Umi instance
const umi = createUmi('https://api.devnet.solana.com');

// Manually register the Candy Machine program
umi.programs.add({
    name: 'mplCandyMachine',
    publicKey: publicKey('cndyAnrLdpbNtk7eMw9H3z1b1vhA9a8u6skXjLWB74A'), // Candy Machine program ID on Solana
});

// Use the Candy Machine plugin
umi.use(mplCandyMachine());

// Load wallet keypair
const walletKeypairPath = './devnet.json';
const walletKeypair = JSON.parse(readFileSync(walletKeypairPath));
const secretKey = Uint8Array.from(walletKeypair);

// Create a Keypair from the secret key
const wallet = Keypair.fromSecretKey(secretKey);

// Add the wallet to Umi
umi.use({
    install: (umiInstance) => {
        umiInstance.identity = {
            publicKey: publicKey(wallet.publicKey.toBase58()),
            signTransaction: async (transaction) => {
                transaction.partialSign(wallet);
                return transaction;
            },
        };
    },
});

// Print wallet public key
console.log('Wallet initialized with public key:', wallet.publicKey.toBase58());

// Path to assets and config
const assetsPath = path.resolve('./assets');
const configPath = path.resolve('./config.json');

// Load config file
const config = JSON.parse(readFileSync(configPath));

// Create Candy Machine
async function createCandyMachine() {
    try {
        // Example assets
        // Initialize Umi instance
const umi = createUmi('https://api.devnet.solana.com');

// Manually register the Candy Machine program
umi.programs.add({
    name: 'mplCandyMachine',
    publicKey: publicKey('cndyAnrLdpbNtk7eMw9H3z1b1vhA9a8u6skXjLWB74A'), // Candy Machine program ID on Solana
});

// Use the Candy Machine plugin
umi.use(mplCandyMachine());

        const assetFiles = ['hedgehog.png', 'hedgehog.json', 'tiger.png', 'tiger.json', 'tortise.png', 'tortise.json'];
        const assets = assetFiles.map((file) => {
            return {
                name: file,
                content: readFileSync(path.join(assetsPath, file)),
            };
        });

        console.log(umi);

        // Create Candy Machine
        const candyMachine = await umi.candyMachine.create({
            price: config.price * 1e9, // Convert SOL to lamports
            itemsAvailable: config.number,
            goLiveDate: new Date(config.goLiveDate).toISOString(),
            treasuryAddress: publicKey(config.solTreasuryAccount),
            items: assets.map((asset) => ({
                uri: `https://your-storage-service.com/${asset.name}`, // Replace with actual URIs
                name: asset.name,
            })),
        });

        console.log('Candy Machine created at:', candyMachine.publicKey.toBase58());
    } catch (error) {
        console.error('Error creating Candy Machine:', error);
    }
}

createCandyMachine();
