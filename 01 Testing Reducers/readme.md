# Testing reducers

We will take as starting point _00 Boiler plate_.

- Let's install dependencies:

```bash
npm install
```

- Let's start testing the _./src/pages/login/reducers/login.ts_

- Let's build an empty skeleton

_./src/pages/login/reducers/login.spec.ts_

```typescript
import { loginReducer } from './login';

describe('login/reducers/loginReducer tests', () => {
  it('', () => {
    // Arrange

    // Act

    // Assert
  });
})
```

- First we will test that the reducer get initialized in the
right way.

```typescript
import { loginReducer } from './login';
import { FieldValidationResult } from 'lc-form-validation';

describe('login/reducers/loginReducer tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = loginReducer(state, action);

    // Assert
    expect(nextState.loginEntity.login).toEqual('');
    expect(nextState.loginEntity.password).toEqual('');
    expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
    expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });
})
```


- Now we will check that UpdateLoginEntity Field gets updated and object not mutated:

We will make an import of deepfreeze

```typescript
import { loginReducer, LoginState } from './login';
import { FieldValidationResult } from 'lc-form-validation';
const deepFreeze = require('deep-freeze');
```

```typescript
 it('should return same state without mutate it when passing state and some action type', () => {
    // Arrange
    const state: LoginState = {
      loginEntity: {
        login: 'test login',
        password: 'test password',
      },
      loginFormErrors: {
        login: new FieldValidationResult(),
        password: new FieldValidationResult(),
      },
    };
    const action = { type: 'some type' };
    deepFreeze(state);

    // Act
    const nextState = loginReducer(state, action);

    // Assert
    expect(nextState.loginEntity.login).toEqual('test login');
    expect(nextState.loginEntity.password).toEqual('test password');
    expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
    expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });
```

Now let's simulate a real action, we will check what happens when we update the login field
(new state created including the update, plus Should return updated state without mutatin the former one):

```typescript
import { actionIds } from '../actions/actionIds';
```

```typescript
 it(`should return updated state without mutate it
 when passing state, UPDATE_LOGIN_ENTITY_FIELD action type and login field payload`, () => {
     // Arrange
     const state: LoginState = {
       loginEntity: {
         login: 'test login',
         password: 'test password',
       },
       loginFormErrors: {
         login: new FieldValidationResult(),
         password: new FieldValidationResult(),
       },
     };

     const action = {
       type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
       payload: {
         fieldName: 'login',
         value: '',
         fieldValidationResult: {
           succeeded: false,
           errorMessage: 'test message',
         } as FieldValidationResult,
       },
     };

     deepFreeze(state);

     // Act
     const nextState = loginReducer(state, action);

     // Assert
     expect(nextState.loginEntity.login).toEqual('');
     expect(nextState.loginEntity.password).toEqual('test password');
     expect(nextState.loginFormErrors.login).toEqual({
       errorMessage: 'test message',
       succeeded: false,
     } as FieldValidationResult);
     expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
   });
```
