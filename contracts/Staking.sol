// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    IERC20 public immutable HashBackToken;

    struct Position {
        address walletAddress;
        uint createdDate;
        uint rewardsPerTokenStored;
        uint stakedAmount;
        bool open;
    }

    Position position;

    address public owner;

    uint public currentPositionId;

    mapping(address => Position) public positions;

    mapping(address => uint[]) public positionIdsByAddress;

    mapping(address => uint[]) positonIdsByAddress;

    // Duration of rewards to be paid out (in seconds)
    uint public duration;

    // Timestamp of when the rewards finish
    uint public finishAt;
    // Minimum of last updated time and reward finish time
    uint public updatedAt;
    // Reward to be paid out per second
    uint public rewardRate;
    // Sum of (reward rate * dt * 1e18 / total supply)
    uint public rewardPerTokenStored;
    // User address => rewardPerTokenStored
    mapping(address => uint) public userRewardPerTokenPaid;
    // User address => rewards to be claimed
    mapping(address => uint) public rewards;

    //Tokens Staked per User
    mapping(address => uint) public tokensStaked;

    // Total staked
    uint public totalSupply;
    // User address => staked amount
    mapping(address => uint) public balanceOf;

    constructor(address _HashBackToken) {
        currentPositionId = 0;

        owner = msg.sender;
        HashBackToken = IERC20(_HashBackToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        positions[_account].rewardsPerTokenStored = rewardPerTokenStored;

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }

        _;
    }

    function lastTimeRewardApplicable() public view returns (uint) {
        return _min(finishAt, block.timestamp);
    }

    function getPositionIdsForAddress() external view returns (uint[] memory) {
        return positionIdsByAddress[msg.sender];
    }

    function getPositionById(address _account)
        external
        view
        returns (Position memory)
    {
        return positions[_account];
    }

    function rewardPerToken() public view returns (uint) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }

        return
            rewardPerTokenStored +
            (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) /
            totalSupply;
    }

    function stake(uint _amount) external updateReward(msg.sender) {
        require(_amount > 0, "amount = 0");
        HashBackToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += _amount;
        positions[msg.sender] = Position(
            msg.sender,
            block.timestamp,
            rewardPerTokenStored,
            _amount,
            true
        );
        totalSupply += _amount;
        currentPositionId += 1;
    }

    function withdraw(uint _amount) external updateReward(msg.sender) {
        require(_amount > 0, "amount = 0");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        HashBackToken.transfer(msg.sender, _amount);
        positions[msg.sender].stakedAmount - _amount;
        if (positions[msg.sender].stakedAmount == 0) {
            positions[msg.sender].open = false;
        }
    }

    function earned(address _account) public view returns (uint) {
        return
            ((balanceOf[_account] *
                (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) +
            rewards[_account];
    }

    function getReward() external updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            HashBackToken.transfer(msg.sender, reward);
        }
    }

    function setRewardsDuration(uint _duration) external onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        duration = _duration;
    }

    function notifyRewardAmount(uint _amount)
        external
        onlyOwner
        updateReward(address(0))
    {
        if (block.timestamp >= finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint remainingRewards = (finishAt - block.timestamp) * rewardRate;
            rewardRate = (_amount + remainingRewards) / duration;
        }

        require(rewardRate > 0, "reward rate = 0");
        require(
            rewardRate * duration <= HashBackToken.balanceOf(address(this)),
            "reward amount > balance"
        );

        finishAt = block.timestamp + duration;
        updatedAt = block.timestamp;
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
