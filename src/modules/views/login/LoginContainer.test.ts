import { mapStateToProps, mapDispatchToProps } from './LoginContainer';
import { coreState } from '../../state-mgmt/core';
import { authState } from '../../state-mgmt/auth';
import { getState } from '../../../test/entities';

describe('LoginContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = getState();
    expect(mapStateToProps(state)).toEqual({ hasError: false, isLoading: false });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      setNavigation: expect.any(Function),
      login: expect.any(Function),
      checkForUpdates: expect.any(Function)
    });
  });

  it('should dispatch setNavigation action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const navigation: any = 'navigation';
    props.setNavigation(navigation);
    expect(dispatch).toBeCalledWith(coreState.actions.setNavigation(navigation));
  });

  it('should dispatch login start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const username = 'email';
    const password = 'password';
    props.login(username, password);
    expect(dispatch).toBeCalledWith(authState.actions.start(username, password));
  });

  it('should dispatch checkForUpdates action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.checkForUpdates();
    expect(dispatch).toBeCalledWith(coreState.actions.checkForUpdates());
  });
});
