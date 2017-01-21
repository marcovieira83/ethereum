pragma solidity ^0.4.5;

contract Identities {
  struct Person {
    string name;
    string email;
  }

  event Registered(string _name);

  mapping (address => Person) public people;

  function Identities() {}

  function register(string _name, string _email) {
    people[msg.sender] = Person(_name, _email);
  }
}
