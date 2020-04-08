import React from 'react';
import { shallow } from 'enzyme';
import Aux from '../../../components/hoc/Aux';

describe('<Aux /> component', () => {
  const component = shallow(<Aux />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
