// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TaskMarketplace {
    enum TaskStatus { Open, Accepted, Submitted, Completed, Refunded, Cancelled }

    struct Task {
        uint256 taskId;
        string title;
        string description;
        uint256 reward;
        address payable client;
        address payable freelancer;
        TaskStatus status;
        string proofLink;
        uint256 deadline;
    }

    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 taskId, address client, uint256 reward);
    event TaskAccepted(uint256 taskId, address freelancer);
    event ProofSubmitted(uint256 taskId, string proofLink);
    event TaskApproved(uint256 taskId);
    event TaskRefunded(uint256 taskId);
    event TaskCancelled(uint256 taskId);

    modifier onlyClient(uint256 _taskId) {
        require(msg.sender == tasks[_taskId].client, "Only client allowed");
        _;
    }

    modifier onlyFreelancer(uint256 _taskId) {
        require(msg.sender == tasks[_taskId].freelancer, "Only freelancer allowed");
        _;
    }

    function createTask(string calldata _title, string calldata _description, uint256 _deadline) external payable {
        require(msg.value > 0, "Reward must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in future");

        taskCount++;
        tasks[taskCount] = Task({
            taskId: taskCount,
            title: _title,
            description: _description,
            reward: msg.value,
            client: payable(msg.sender),
            freelancer: payable(address(0)),
            status: TaskStatus.Open,
            proofLink: "",
            deadline: _deadline
        });

        emit TaskCreated(taskCount, msg.sender, msg.value);
    }

    function acceptTask(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task not open");
        require(task.freelancer == address(0), "Already accepted");
        
        task.freelancer = payable(msg.sender);
        task.status = TaskStatus.Accepted;

        emit TaskAccepted(_taskId, msg.sender);
    }

    function submitProof(uint256 _taskId, string calldata _proofLink) external onlyFreelancer(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Accepted, "Task not in accepted state");
        
        task.proofLink = _proofLink;
        task.status = TaskStatus.Submitted;

        emit ProofSubmitted(_taskId, _proofLink);
    }

    function approveTask(uint256 _taskId) external onlyClient(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Submitted, "Task not submitted yet");
        
        task.status = TaskStatus.Completed;
        task.freelancer.transfer(task.reward);

        emit TaskApproved(_taskId);
    }

    function refundTask(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Submitted, "Task not submitted");
        require(block.timestamp > task.deadline, "Deadline not reached");
        require(msg.sender == task.freelancer || msg.sender == task.client, "Unauthorized");

        task.status = TaskStatus.Refunded;
        task.client.transfer(task.reward);

        emit TaskRefunded(_taskId);
    }

    function cancelTask(uint256 _taskId) external onlyClient(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Cannot cancel after accepted");

        task.status = TaskStatus.Cancelled;
        task.client.transfer(task.reward);

        emit TaskCancelled(_taskId);
    }
}
