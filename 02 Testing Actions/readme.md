# Testing reducers

We will take as starting point _01 Testin Reducers_.

- Let's install dependencies:

```bash
npm install
```

- We will start by testing a simple action, in this case _fetchMembersCompleted_
  (_./src/pages/members/list/actions/fetchMembers.ts_).

Let's create a simple test (we could add more cases informaing: null, empty array, undefined, more than one element...)

_./src/pages/members/list/actions/fetchMembers.spec.ts_

```typescript
import { fetchMembersCompleted } from './fetchMembers';
import { Member } from '../../../../rest-api/model';
import { actionIds } from './actionIds';

describe('fetchMembers', () => {
  describe('fetchMembersCompleted', () => {
    it('Should inform type UPDATE_MEMBERS and payload same as input param passed', () => {
      // Arrange
      const members: Member[] = [
        {
          avatar_url: 'a',
          id: 1,
          login: 'b',
        },
      ];

      // Act
      const result = fetchMembersCompleted(members);

      // Assert
      expect(result.type).toBe(actionIds.UPDATE_MEMBERS);
      expect(result.payload.length).toBe(1);
      expect(result.payload[0]).toBe(members[0]);
    });
  });
});
```

- Now let's go for something more complicated, let's try to test a thunk
  based action, let's test _fetchMember_ (/src/pages/members/list/actions/fetchMembers.ts).

  - We need to configure a mock store and inject redux thunk middleware
  - Since the test is asynchronous we will add a _done_ flag.
  - We will create an spy to check if we \_fetchMembers is being called.
  - We will use the mock store to dispatch actions.
  - We will dispatch the action.

_/src/pages/members/list/actions/fetchMembers.spec.ts_

```typescript
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../../rest-api/api/member';
```

```typescript
const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('fetchMembers', () => {
  // ...
  describe('fetchMembers', () => {
    it('When a call is done it should call fetchMember api', done => {
      // Arrange
      const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers');

      // Act
      const store = getMockStore();
      store.dispatch<any>(fetchMembers()).then(() => {
        // Assert
        expect(fetchMembersStub).toHaveBeenCalled();
        done();
      });
    });
  });
});
```

- If we try to run this it won't work, why? _fetch_ is not defined in nodejs
  we will mock it (is a good idea to mock it as well, we don't want
  to test _fetch_ just only unit test the _fetchMembers_ action).

```diff
    it('When a call is done it should call fetchMember api', done => {
      // Arrange
-      const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers');
+   const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
+     .mockResolvedValue([]);
```

- So far so good, now let's check the we got the memberequestcompleted
  action in our mockstore pending to be processed

```typescript
store.dispatch<any>(fetchMembers()).then(() => {
  // Assert
  expect(fetchMembersStub).toHaveBeenCalled();
  expect(store.getActions().length).toBe(1);
  expect(store.getActions()[0].type).toBe(actionIds.UPDATE_MEMBERS);
  done();
});
```
