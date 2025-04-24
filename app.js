const contractAddress = "0xe2899bddFD890e320e643044c6b95B9B0b84157A";
const contractABI = [
  "function joinDAO() external",
  "function createProposal(string,uint) external",
  "function voteOnProposal(uint) external",
  "function executeProposal(uint) external"
];

async function getContract() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

async function joinDAO() {
  const contract = await getContract();
  const tx = await contract.joinDAO();
  await tx.wait();
  document.getElementById("output").innerText = "✅ Joined DAO!";
}

async function createProposal() {
  const desc = document.getElementById("description").value;
  const eth = document.getElementById("amount").value;
  const wei = ethers.utils.parseEther(eth);
  const contract = await getContract();
  const tx = await contract.createProposal(desc, wei);
  await tx.wait();
  document.getElementById("output").innerText = "✅ Proposal created!";
}

async function voteOnProposal() {
  const id = document.getElementById("voteId").value;
  const contract = await getContract();
  const tx = await contract.voteOnProposal(id);
  await tx.wait();
  document.getElementById("output").innerText = "✅ Voted on proposal!";
}

async function executeProposal() {
  const id = document.getElementById("executeId").value;
  const contract = await getContract();
  const tx = await contract.executeProposal(id);
  await tx.wait();
  document.getElementById("output").innerText = "✅ Proposal executed!";
}
