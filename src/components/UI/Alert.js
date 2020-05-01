import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

export class CustomAlert extends Component {
  onClose = () => {
    const { onRemoveAlert } = this.props;
    onRemoveAlert();
  };

  render() {
    const { alert } = this.props;

    return (
      alert.message !== null &&
      alert.alertType !== null && (
        <Alert severity={alert.alertType} onClose={this.onClose}>
          <AlertTitle>Error</AlertTitle>
          {alert.message}
        </Alert>
      )
    );
  }
}

CustomAlert.propTypes = {
  alert: PropTypes.object,
  onRemoveAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

const mapDispatchToProps = dispatch => ({
  onRemoveAlert: () => dispatch(actions.removeAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert);
