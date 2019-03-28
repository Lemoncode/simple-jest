import { loginReducer, LoginState } from './login';
import { FieldValidationResult } from 'lc-form-validation';
const deepFreeze = require('deep-freeze');
import { actionIds } from '../actions/actionIds';


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

})