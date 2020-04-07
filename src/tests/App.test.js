import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App /> component', () => {
  let component = shallow(<App />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
