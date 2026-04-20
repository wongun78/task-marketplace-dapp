const hre = require("hardhat");

async function main() {
  const TaskMarketplace = await hre.ethers.getContractFactory(
    "TaskMarketplace"
  );
  const contract = await TaskMarketplace.deploy();
  console.log("TaskMarketplace deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
