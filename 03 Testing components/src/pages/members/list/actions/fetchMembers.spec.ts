import { fetchMembersCompleted, fetchMembers } from './fetchMembers';
import { Member } from '../../../../rest-api/model';
import { actionIds } from './actionIds';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../../rest-api/api/member';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

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
  describe('fetchMembers', () => {
    it('When a call is done it should call fetchMember api', done => {
      // Arrange
      const fetchMembersStub = jest
        .spyOn(apiMember, 'fetchMembers')
        .mockResolvedValue([]);

      // Act
      const store = getMockStore();
      store.dispatch<any>(fetchMembers()).then(() => {
        // Assert
        expect(fetchMembersStub).toHaveBeenCalled();
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0].type).toBe(actionIds.UPDATE_MEMBERS);
        done();
      });
    });
  });
});
