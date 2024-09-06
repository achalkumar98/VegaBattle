// src/components/MetaMaskWallet.jsx
import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // or ethers if you prefer

const MetaMaskWallet = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const initWeb3 = async () => {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      };
      initWeb3();
    } else {
      console.log('MetaMask not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      console.log('MetaMask not detected');
    }
  };

  return (
    <div>
      {account ? (
        <span>Connected: {account}</span>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskWallet;
