/**
 * 
 * Research Topics:
 * 
 *  - Different Providers such as infura and do we need specific node for better speed?
 * 
 *  - What is the Chain ID
 * 
 *  - What is 'Type'
 * 
 * - maxFeePerGas & maxPriorityFeePerGas & gasLimit
 * 
 * example: https://etherscan.io/tx/0x2a48d84a8745d2d222432f496e6154347e7c7100ddfe3741838fd777a8b3868f
 * 
 */

const ethers = require('ethers');
const providers = ethers.providers;
const Wallet = ethers.Wallet;
const Contract = ethers.Contract;
const BigNumber = ethers.BigNumber;

const CONTRACT_ADDRESS = '0xBcBcC7CbF50344Ed4445512B30897d6baD76F166';
const CONTRACT_ABI = require('../build/contracts/test.json')
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const provider = new providers.InfuraProvider(1);
const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
const wallet = new Wallet(PRIVATE_KEY);
const signer = wallet.connect(provider)

const ETHER = BigNumber.from(10).pow(18);
const GWEI = BigNumber.from(10).pow(9);

// provider.on('block', async (blockNumber) => {
// console.log(blockNumber);
// })
const main = async () => {
    // const totalSupply = parseInt(await contractInstance.totalSupply());
    const startTimeStamp = 1644361200000;
    async function mint() {
        console.log('About to attempt. ' + startTimeStamp + ' ' + new Date().getTime());
        const result = await signer.sendTransaction({
            to: CONTRACT_ADDRESS,
            data: '0xf366afc9',
            type: 2,
            value: 0, //ETHER.div(100).mul(5),
            maxFeePerGas: GWEI.mul(180),
            gasLimit: 240000, //use estimate?
            maxPriorityFeePerGas: GWEI.mul(10),
            chainId: 1
        })
        console.log(result);
    }
    setInterval(function () {
        const currentTimeStamp = new Date().getTime();
        if (currentTimeStamp >= startTimeStamp) { // Check the time
            console.log('Minting!');
            mint()
        } else {
            console.log('still sleeping...');
            // console.log(process.env.WALLET_PRIVATE_KEY)
        }
    }, 100);
}

main()