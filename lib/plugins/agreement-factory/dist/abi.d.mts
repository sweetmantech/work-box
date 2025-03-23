declare const AGREEMENT_FACTORY_ABI: readonly [{
    readonly name: "deployAgreementPair";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "minGasToComplete";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
        readonly name: "paymaster";
    }, {
        readonly type: "address";
        readonly name: "serviceAgreement";
    }];
}, {
    readonly name: "AgreementPairDeployed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "paymaster";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "serviceAgreement";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "minGasToComplete";
    }];
}];

export { AGREEMENT_FACTORY_ABI };
