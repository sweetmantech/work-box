declare const SERVICE_AGREEMENT_ABI: readonly [{
    readonly name: "nextAgreementId";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "agreements";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "client";
    }, {
        readonly type: "address";
        readonly name: "serviceProvider";
    }, {
        readonly type: "uint256";
        readonly name: "totalAmount";
    }, {
        readonly type: "uint8";
        readonly name: "status";
    }, {
        readonly type: "string";
        readonly name: "termsHash";
    }, {
        readonly type: "uint256";
        readonly name: "completedMilestones";
    }, {
        readonly type: "uint256";
        readonly name: "createdAt";
    }];
}, {
    readonly name: "getAgreement";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "_agreementId";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "client";
    }, {
        readonly type: "address";
        readonly name: "serviceProvider";
    }, {
        readonly type: "uint256";
        readonly name: "totalAmount";
    }, {
        readonly type: "uint8";
        readonly name: "status";
    }, {
        readonly type: "string";
        readonly name: "termsHash";
    }, {
        readonly type: "uint256";
        readonly name: "completedMilestones";
    }, {
        readonly type: "uint256";
        readonly name: "createdAt";
    }];
}, {
    readonly name: "getMilestone";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "_agreementId";
    }, {
        readonly type: "uint256";
        readonly name: "_milestoneIndex";
    }];
    readonly outputs: readonly [{
        readonly type: "string";
        readonly name: "description";
    }, {
        readonly type: "uint256";
        readonly name: "amount";
    }, {
        readonly type: "bool";
        readonly name: "completed";
    }, {
        readonly type: "uint256";
        readonly name: "deadline";
    }];
}, {
    readonly name: "paymaster";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "createAgreement";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "serviceProvider";
    }, {
        readonly type: "string";
        readonly name: "termsHash";
    }, {
        readonly type: "string[]";
        readonly name: "milestoneDescriptions";
    }, {
        readonly type: "uint256[]";
        readonly name: "milestoneAmounts";
    }, {
        readonly type: "uint256[]";
        readonly name: "milestoneDealines";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "completeBatchMilestones";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "_agreementId";
    }, {
        readonly type: "uint256[]";
        readonly name: "_milestoneIndices";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "initiateDispute";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "_agreementId";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "AgreementCreated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "id";
    }, {
        readonly type: "address";
        readonly name: "client";
    }, {
        readonly type: "address";
        readonly name: "serviceProvider";
    }, {
        readonly type: "uint256";
        readonly name: "totalAmount";
    }];
}, {
    readonly name: "MilestoneCompleted";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "agreementId";
    }, {
        readonly type: "uint256";
        readonly name: "milestoneIndex";
    }];
}, {
    readonly name: "AgreementDisputed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "agreementId";
    }, {
        readonly type: "address";
        readonly name: "initiator";
    }];
}, {
    readonly name: "AgreementCompleted";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "agreementId";
    }];
}, {
    readonly name: "FundsReleased";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "agreementId";
    }, {
        readonly type: "address";
        readonly name: "to";
    }, {
        readonly type: "uint256";
        readonly name: "amount";
    }];
}, {
    readonly name: "BatchMilestonesCompleted";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "agreementId";
    }, {
        readonly type: "uint256[]";
        readonly name: "milestoneIndices";
    }];
}];

export { SERVICE_AGREEMENT_ABI };
