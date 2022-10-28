// Import the page's CSS. Webpack will know what to do with it.
// import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

import bank_artifacts from '../../build/contracts/Mortgage.json';

var Mortgage = contract(bank_artifacts);
var account;
var wtoE;
var GAS_AMOUNT = 6721975;
var BASE_URL = 'http://localhost:8092/';
var md5 = require('md5');

window.verifyData = function() {
  var hash = $('#file-hash').val();
  var link = BASE_URL + hash + '.pdf';
  document.getElementById('pdfRenderer').src = link;
  Mortgage.deployed().then(function(contractInstance) {
    contractInstance.getOwnerCount.call(hash).then(function(result) {
      $('#mortgage-owner-list').empty();
      if(result.valueOf() == 0)
      {
         $('#mortgage-owner-list').append('<li class="list-group-item">No Owners Found! Be careful!</li>');
      }
      else
      {
        for(let i=0;i<result.valueOf();i++)
        {
          contractInstance.getOwnerByPosition.call(hash,i).then(function(result) {
             $('#mortgage-owner-list').append('<li class="list-group-item">'+result+'</li>');
          });
        }
      }
    });
  });
  document.getElementById('mortgageDetails').style.visibility = 'visible';
}

window.addData = function(data) {
  var hash = md5(data);
  Mortgage.deployed().then(function(contractInstance) {
    contractInstance.addData(hash,{gas: GAS_AMOUNT, from: account}).then(function(result) {
      console.log("HASH ADDED SUCCESSFULLY : ",hash);
    });
  });  
}

//For testing purpose only
function getHashFromUrl() {
  var url = location.href;
  if(url.indexOf('?') == -1)
    return;
  var hash = url.split('?')[1].split('&')[0].split('=')[1]
  $('#file-hash').val(hash);
  verifyData();
}

$( document ).ready( function () {
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

  

  Mortgage.setProvider(web3.currentProvider);
  getHashFromUrl();
});