import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import { coreState } from '../../state-mgmt/core';
import { authState } from '../../state-mgmt/auth';
import Login from './Login';

export const mapStateToProps = (state: IRootState) => ({
  isLoading: state.auth.isLoading,
  hasError: state.auth.hasError
});

export const mapDispatchToProps = dispatch => ({
  setNavigation: navigation => dispatch(coreState.actions.setNavigation(navigation)),
  login: (email: string, password: string) => dispatch(authState.actions.start(email, password)),
  checkForUpdates: () => dispatch(coreState.actions.checkForUpdates())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
