require("@nomiclabs/hardhat-waffle");
const privateKey = process.env.PRIVATE_KEY ?? ""
const infuraId = process.env.INFURA_ID ?? ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        // velasTestnet: {
        //     url: `https://explorer.testnet.velas.com/rpc`,
        //     chainId: 111,
        // },
        // mumbai: {
        //     url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
        //     accounts: [privateKey],
        // },
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};