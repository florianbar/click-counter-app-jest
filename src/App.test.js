import Enzyme, { shallow } from 'enzyme';
import EnzymeAdaptor from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

// Setup enzyme's react adaptor
Enzyme.configure({ adaptor: new EnzymeAdaptor() });

test("renders without error", () => {

});

test("renders button", () => {

});

test("renders counter display", () => {
  
});

test("counter starts at 0", () => {

});

test("clicking on button increments counter display", () => {

});