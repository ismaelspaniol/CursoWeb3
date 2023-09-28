const ProtoCoin = artifacts.require("ProtoCoin");
const BN = require('bn.js');

contract('ProtoCoin', function (accounts) {

  const DECIMALS = new BN(18);

  beforeEach(async () => {
    contract = await ProtoCoin.new();
  })

  it("Should has correct name", async () => {
    const name = await contract.name();
    assert(name === 'ProtoCoin', 'Incorrect name');
  });

  it("Should has correct symbol", async () => {
    const symbol = await contract.symbol();
    assert(symbol === 'PRC', 'Incorrect symbol');
  });

  it("Should has correct decimals", async () => {
    const decimals = await contract.decimals();
    assert(decimals.eq(DECIMALS), 'Incorrect decimals');
  });

  it("Should has correct total supply", async () => {
    const TOTAL_SUPPLY = new BN(1000).mul(new BN(10).pow(DECIMALS));
    const totalSupply = await contract.totalSupply();
    assert(totalSupply.eq(TOTAL_SUPPLY), 'Incorrect totalSupply');
  });

  it("Owner should has total supply", async () => {
    const TOTAL_SUPPLY = new BN(1000).mul(new BN(10).pow(DECIMALS));
    const balance = await contract.balanceOf(accounts[0]);
    assert(balance.eq(TOTAL_SUPPLY), 'Incorrect balance');
  });

  it("Should transfer", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    const balanceAdminBefore = await contract.balanceOf(accounts[0]);
    const balanceToBefore = await contract.balanceOf(accounts[1]);

    await contract.transfer(accounts[1], qty);

    const balanceAdminNow = await contract.balanceOf(accounts[0]);
    const balanceToNow = await contract.balanceOf(accounts[1]);

    assert(balanceAdminNow.eq(balanceAdminBefore.sub(qty)), 'Incorrect admin balance');
    assert(balanceToNow.eq(balanceToBefore.add(qty)), 'Incorrect to balance');
  });

  it("Should NOT transfer", async () => {
    const qty = new BN(1001).mul(new BN(10).pow(DECIMALS));

    try {
      await contract.transfer(accounts[1], qty);
      assert.fail("The transfer should have thrown an error.");
    }
    catch (err) {
      assert.include(err.message, "revert", "The transfer should be reverted.");
    }
  });

  it("Should approve", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));
    await contract.approve(accounts[1], qty);

    const allowance = await contract.allowance(accounts[0], accounts[1]);
    assert(allowance.eq(qty), 'Incorrect allowance balance');
  });

  it("Should transfer from", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    const allowanceBefore = await contract.allowance(accounts[0], accounts[1]);
    const balanceAdminBefore = await contract.balanceOf(accounts[0]);
    const balanceToBefore = await contract.balanceOf(accounts[1]);

    await contract.approve(accounts[1], qty);
    await contract.transferFrom(accounts[0], accounts[1], qty, { from: accounts[1] });

    const allowanceNow = await contract.allowance(accounts[0], accounts[1]);
    const balanceAdminNow = await contract.balanceOf(accounts[0]);
    const balanceToNow = await contract.balanceOf(accounts[1]);

    assert(allowanceNow.eq(allowanceBefore), 'Incorrect allowance');
    assert(balanceAdminNow.eq(balanceAdminBefore.sub(qty)), 'Incorrect admin balance');
    assert(balanceToNow.eq(balanceToBefore.add(qty)), 'Incorrect to balance');
  });

  it("Should NOT transfer from", async () => {
    const qty = new BN(1).mul(new BN(10).pow(DECIMALS));

    try {
      await contract.transferFrom(accounts[0], accounts[1], qty, { from: accounts[1] });
      assert.fail("The transfer should have thrown an error.");
    }
    catch (err) {
      assert.include(err.message, "revert", "The transferFrom should be reverted.");
    }
  });
});