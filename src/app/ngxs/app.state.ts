import {
    State,
    Action,
    StateContext,
    Selector,
    Store,
    NgxsOnInit,
  } from '@ngxs/store';
  import * as _ from 'lodash';
  import { Person, BankAccount } from './person';
  
  // Actions
  export class AddPerson {
    static readonly type = 'AddPerson';
    constructor(public payload: Person) {}
  }
  
  export class AddAccount {
    static readonly type = 'AddAccount';
    constructor(public payload: BankAccount) {}
  }
  
  export class UpdateAccountObject {
    static readonly type = 'UpdateAccountObject';
    constructor(public payload: BankAccount) {}
  }
  
  export class IncreaseBalanceProperty {
    static readonly type = 'IncreaseBalanceProperty';
    constructor(public id: number, public amount: number) {}
  }
  
  export class ChangeName {
    static readonly type = 'ChangeName';
    constructor(public name: string) {}
  }
  
  // State model
  export interface PersonStateModel {
    person: Person;
  }
  
  @State<PersonStateModel>({
    name: 'person',
    defaults: {
      person: new Person(),
    },
  })
  export class PersonState implements NgxsOnInit {
    @Selector()
    static person(state: PersonStateModel): Person {
      return state.person;
    }
  
    ngxsOnInit(ctx?: StateContext<PersonStateModel>) {}
  
    @Action(AddPerson)
    addPerson(ctx: StateContext<PersonStateModel>, { payload }: AddPerson) {
      ctx.patchState({ person: payload });
  
      // ctx.setState(
      //   produce(ctx.getState(), draft => { draft.person = payload }),
      // );
    }
  
    @Action(AddAccount)
    addAccount(ctx: StateContext<PersonStateModel>, { payload }: AddAccount) {
      const state = ctx.getState();
      ctx.patchState({
        person: {
          ...state.person,
          accounts: [...state.person.accounts, payload],
        },
      });
  
      // const accounts = [...state.person.accounts];
      // ctx.setState(
      //   produce(ctx.getState(), (draft: PersonStateModel) => {
      //       draft.person.accounts = accounts;
      //   })
      // );
    }
  
    @Action(UpdateAccountObject)
    updateBankAccount(
      ctx: StateContext<PersonStateModel>,
      { payload }: UpdateAccountObject
    ) {
      const state = ctx.getState();
      const accounts = [...state.person.accounts];
      const ndx = accounts.findIndex((item) => item.id === payload.id);
      accounts[ndx] = payload;
      ctx.patchState({
        person: {
          ...state.person,
          accounts: accounts,
        },
      });
  
      // ctx.setState(
      //   produce(ctx.getState(), (draft: PersonStateModel) => {
      //       draft.person.accounts = accounts;
      //   })
      // );
    }
  
    @Action(IncreaseBalanceProperty)
    increaseBalance(
      ctx: StateContext<PersonStateModel>,
      { id, amount }: IncreaseBalanceProperty
    ) {
      const state = ctx.getState();
      const accounts = [...state.person.accounts];
      const ndx = state.person.accounts.findIndex((item) => item.id === id);
      const account = _.cloneDeep(state.person.accounts[ndx]);
      account.balance += amount;
      accounts[ndx] = account;
      ctx.patchState({
        person: {
          ...state.person,
          accounts: accounts,
        },
      });
    }
  
    @Action(ChangeName)
    changeName(ctx: StateContext<PersonStateModel>, { name }: ChangeName) {
      const state = ctx.getState();
      ctx.patchState({
        person: {
          ...state.person,
          name: name,
        },
      });
  
      // NOTE: This gives read-only error
      // ctx.setState(
      //   produce(ctx.getState(), (draft: PersonStateModel) => {
      //       draft.person.name = name;
      //   })
      // );
    }
  }
  