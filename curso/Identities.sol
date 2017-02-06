pragma solidity ^0.4.5;

contract Identities {
  struct Person {
    string name;
    string email;
  }

  event Registered(string _name);

  mapping (address => Person) public people;

  function Identities() {}

  function register(string _name, string _email) payable {
    // 10 ETH
    if (msg.value < 1000000000) throw;
    people[msg.sender] = Person(_name, _email);
    Registered(_name);
  }
}
