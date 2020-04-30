import React from 'react';
import { shallow } from 'enzyme';
import { Grid } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import Signup from '../../../views/auth/Signup';

describe('<Signup /> component', () => {
  const component = shallow(<Signup />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call responseFacebook method when the facebook button is clicked', () => {
    const responseFacebook = jest.spyOn(
      component.instance(),
      'responseFacebook'
    );
    component.instance().forceUpdate();

    const button = component
      .find(Grid)
      .at(3)
      .shallow()
      .find(FacebookLogin)
      .renderProp('render')({ onClick: jest.fn() });
    component
      .find(Grid)
      .at(3)
      .shallow()
      .find(FacebookLogin)
      .renderProp('callback')();

    expect(button).toHaveLength(1);
    expect(responseFacebook).toHaveBeenCalled();
  });

  it('should call responseGoogle method when the google button is clicked', () => {
    const responseGoogle = jest.spyOn(component.instance(), 'responseGoogle');
    component.instance().forceUpdate();

    const button = component
      .find(Grid)
      .at(4)
      .shallow()
      .find(GoogleLogin)
      .renderProp('render')({ onClick: jest.fn() });
    component
      .find(Grid)
      .at(4)
      .shallow()
      .find(GoogleLogin)
      .renderProp('onSuccess')();

    expect(button).toHaveLength(1);
    expect(responseGoogle).toHaveBeenCalled();
  });
});
