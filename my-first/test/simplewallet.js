contract("SimpleWallet", function(accounts) {
  it('the owner is allowed to send funds', function() {
    var myContract = SimpleWallet.deployed();
    return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed) {
      assert.equal(isAllowed, true, 'the owner should have been allowed to send funds');
    })
  });

  it('the other account should not be allowed to send funds', function() {
    var myContract = SimpleWallet.deployed();
    return myContract.isAllowedToSend.call(accounts[2]).then(function(isAllowed) {
      assert.equal(isAllowed, false, 'the other account was allowed');
    })
  });

  it('adding accounts to the allowed list', function() {
    var myContract = SimpleWallet.deployed();
    return myContract.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
      assert.equal(isAllowed, false, 'the other account was allowed');
    }).then(function() {
      return myContract.allowAddressToSendMoney(accounts[1]);
    }).then(function() {
      return myContract.isAllowedToSend.call(accounts[1]);
    }).then(function(isAllowed) {
      assert.equal(isAllowed, true, 'the other account was NOT allowed');
    }).then(function() {
      return myContract.disallowAddressToSendMoney(accounts[1]);
    }).then(function() {
      return myContract.isAllowedToSend.call(accounts[1]);
    }).then(function(isAllowed) {
      assert.equal(isAllowed, false, 'the account was allowed');
    })
  });

  // it('v2 - adding accounts to the allowed list', function() {
  //   var myContract = SimpleWallet.deployed();
  //
  //   myContract.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
  //     assert.equal(isAllowed, false);
  //     myContract.allowAddressToSendMoney(accounts[1]);
  //     return myContract.isAllowedToSend.call(accounts[1]);
  //   }).then(function(isAllowed) {
  //     assert.equal(isAllowed, true);
  //     myContract.disallowAddressToSendMoney(accounts[1]);
  //     assert.equal(isAllowed, false);
  //   })
  //
  // });
});
