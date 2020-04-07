import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../views/auth/Login';

describe('<Login /> component', () => {
  const component = shallow(<Login />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
