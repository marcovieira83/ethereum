pragma solidity ^0.4.5;

contract EtherSplitter {

  function transfer(address _to1, address _to2) payable returns (bool success) {
    if (msg.sender.balance < msg.value) throw;
    uint256 amount1 = msg.value / 2;
    uint256 amount2 = amount1;
    if (amount1 % 2 == 1) amount1 += 1;
    if (!_to1.send(amount1)) throw;
    if (!_to2.send(amount2)) throw;
    return true;
  }
}
