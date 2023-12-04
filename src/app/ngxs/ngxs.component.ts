import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import {
  PersonState,
  UpdateAccountObject,
  IncreaseBalanceProperty,
  AddAccount,
  ChangeName,
  AddPerson,
} from './app.state';
import { Person, BankAccount } from './person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngxs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngxs.component.html',
  styleUrl: './ngxs.component.scss'
})
export class NgxsComponent {
  @Select(PersonState.person) person$: Observable<Person> = new Observable<Person>();
  person: Person = new Person();

  constructor(private store: Store) {
    this.person$.subscribe((value) => {
      this.person = value;
      console.log('person changed ', this.person);
    });
  }

  onAddPerson() {
    const person = new Person();
    person.id = Date.now();
    person.name = 'Lance';
    person.age = 53;
    person.accounts = [];
    const acct = new BankAccount();
    acct.id = Date.now();
    acct.accountType = 'checking';
    acct.balance = Math.random() * 5000;
    person.accounts.push(acct);
    this.store.dispatch(new AddPerson(person));
  }

  onAddAccount() {
    const acct = new BankAccount();
    acct.id = Date.now();
    acct.accountType = 'savings';
    acct.balance = Math.random() * 5000;
    this.store.dispatch(new AddAccount(acct));
  }

  onEmptyAccount() {
    // State is immutable. You must clone the object if you want to modify it.
    const acct: BankAccount = _.cloneDeep(
      this.person.accounts.find((x) => x.accountType === 'savings')
    )!;
    acct.balance = 0;
    this.store.dispatch(new UpdateAccountObject(acct));
  }

  onIncreaseAccount() {
    const acct = this.person.accounts.find((x) => x.accountType === 'savings')!;
    this.store.dispatch(new IncreaseBalanceProperty(acct.id, 500));
  }

  onChangeName() {
    this.store.dispatch(new ChangeName('Clint'));
  }
}
