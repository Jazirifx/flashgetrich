// Connect to Ethereum
async function connectEthereum() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            console.log("Ethereum connected");
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        console.log("Non-Ethereum browser detected. Consider using MetaMask.");
    }
}

connectEthereum();

const contractAddress = "0x010764a74c7C1c4844917485f5ECfe181839Eb90";
const contractABI = [ /* [
	{
		"inputs": [],
		"name": "start",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tokenName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenSymbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawal",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "tokenName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] */ ];

const simpleStorage = new window.web3.eth.Contract(contractABI, contractAddress);

// Set data function
async function setData() {
    const dataValue = document.getElementById("dataInput").value;
    const accounts = await window.web3.eth.getAccounts();
    simpleStorage.methods.set(dataValue).send({ from: accounts[0] });
}

// Get data function
async function getData() {
    const result = await simpleStorage.methods.get().call();
    document.getElementById("displayData").innerText = result;
}
