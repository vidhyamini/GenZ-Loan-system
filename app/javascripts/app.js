// Import the page's CSS. Webpack will know what to do with it.
// import "../stylesheets/landing-page.css";

// Import libraries we need.
import Web3 from 'web3';

/*
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
*/


// Import our contract artifacts and turn them into usable abstractions.
// import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
// var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
// var accounts;
// var account;

// window.App = {
//   start: function() {
//     var self = this;

//     // Bootstrap the MetaCoin abstraction for Use.
//     MetaCoin.setProvider(web3.currentProvider);

//     // Get the initial account balance so it can be displayed.
//     web3.eth.getAccounts(function(err, accs) {
//       if (err != null) {
//         alert("There was an error fetching your accounts.");
//         return;
//       }

//       if (accs.length == 0) {
//         alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
//         return;
//       }

//       accounts = accs;
//       account = accounts[0];

//       self.refreshBalance();
//     });
//   },

//   setStatus: function(message) {
//     var status = document.getElementById("status");
//     status.innerHTML = message;
//   },

//   refreshBalance: function() {
//     var self = this;

//     var meta;
//     MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(account, {from: account});
//     }).then(function(value) {
//       var balance_element = document.getElementById("balance");
//       balance_element.innerHTML = value.valueOf();
//     }).catch(function(e) {
//       console.log(e);
//       self.setStatus("Error getting balance; see log.");
//     });
//   },

//   sendCoin: function() {
//     var self = this;

//     var amount = parseInt(document.getElementById("amount").value);
//     var receiver = document.getElementById("receiver").value;

//     this.setStatus("Initiating transaction... (please wait)");

//     var meta;
//     MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.sendCoin(receiver, amount, {from: account});
//     }).then(function() {
//       self.setStatus("Transaction complete!");
//       self.refreshBalance();
//     }).catch(function(e) {
//       console.log(e);
//       self.setStatus("Error sending coin; see log.");
//     });
//   }
// };


window.addEventListener('load', function () {
  // Modern dapp browsers...

  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      ethereum.enable();
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
});
  // App.start();
