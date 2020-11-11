import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/** 
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, attrVal) => wrapper.find(`[data-test='${attrVal}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const countValue = findByTestAttr(wrapper, "count").text();
  expect(countValue).toBe("0");
});

test("clicking on button increments counter display", () => {
  const wrapper = setup();

  // 1. Find the button
  const button = findByTestAttr(wrapper, "increment-button");

  // 2. Click the button
  button.simulate("click");

  // 3. Find display, and test that number has benn incremented
  const countValue = findByTestAttr(wrapper, "count").text();
  expect(countValue).toBe("1");
});