pragma solidity ^0.4.7;

contract SimpleWallet {

  address owner;

  struct WithdrawlStruct {
    address to;
    uint amount;
  }

  struct Senders {
    bool allowed;
    uint amount_sends;
    mapping(uint => WithdrawlStruct) withdrawls;
  }

  mapping(address => Senders) isAllowedToSendFundsMapping;

  event Deposit(address _sender, uint amount);
  event Withdrawal(address _sender, uint amount, address _beneficiary);

  function SimpleWallet() {
    owner = msg.sender;
  }

  function() payable {
    if (isAllowedToSend(msg.sender)) {
      Deposit(msg.sender, msg.value);
    } else {
      throw;
    }
  }

  function sendFunds(uint amount, address receiver) returns (uint) {
    if (isAllowedToSend(msg.sender)) {
      if (this.balance >= amount) {
        if (!receiver.send(amount)) {
          throw;
        }
        Withdrawal(msg.sender, amount, receiver);
        isAllowedToSendFundsMapping[msg.sender].amount_sends++;
        isAllowedToSendFundsMapping[msg.sender].withdrawls[isAllowedToSendFundsMapping[msg.sender].amount_sends].to = receiver;
        return this.balance;
        isAllowedToSendFundsMapping[msg.sender].withdrawls[isAllowedToSendFundsMapping[msg.sender].amount_sends].amount = amount;
      }
    }
  }

  function allowAddressToSendMoney(address _address) {
    if (msg.sender == owner) {
      isAllowedToSendFundsMapping[_address].allowed = true;
    }
  }

  function disallowAddressToSendMoney(address _address) {
    if (msg.sender == owner) {
      isAllowedToSendFundsMapping[_address].allowed = false;
    }
  }

  function isAllowedToSend(address _address) returns (bool) {
    return isAllowedToSendFundsMapping[_address].allowed || _address == owner;
  }

  function killWallet() {
    if (msg.sender == owner) {
      suicide(owner);
    }
  }
}
