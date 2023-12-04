export class Person {
    id: number = -1;
    name: string = '';
    age: number = 0;
    accounts: BankAccount[] = [];
}

export class BankAccount {
    id: number = -1;
    accountType: 'checking' | 'savings' = 'checking';
    balance: number = 0;
}
