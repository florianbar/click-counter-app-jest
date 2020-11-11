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

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} attrVal - Value of data-test c1scoL0ve!
 */
const findByTestAttr = (wrapper, attrVal) => wrapper.find(`[data-test='${attrVal}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
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

describe("increment", () => {
  // now we have enough tests to organize by functions
  test("renders increment button", () => {
    const wrapper = setup();
    const incButton = findByTestAttr(wrapper, "increment-button");
    expect(incButton.length).toBe(1);
  });

  test("counter increments when button is clicked", () => {
    const wrapper = setup();
  
    // find button and click
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");
  
    // 3. Find display, and test that number has benn incremented
    const countValue = findByTestAttr(wrapper, "count").text();
    expect(countValue).toBe("1");
  });
});

describe('decrement button', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const wrapper = setup();

    // click the increment button so that the counter is greater than 0
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate('click');

    // find decrement button and click
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');

    // find display and test value
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0");
  });
});

describe('error when counter goes below 0', () => {
  test('error does not show when not needed', () => {
    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, 'error-message');
    expect(errorDiv.length).toBe(0);
  });

  describe('counter is 0 and decrement is clicked', () => {
    // using a describe here so I can use a "beforeEach" for shared setup

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper;

    beforeEach(() => {
      // no need to set counter value here; default value of 0 is good
      wrapper = setup();

      // find button and click
      const decbutton = findByTestAttr(wrapper, 'decrement-button');
      decbutton.simulate('click');
    });
    
    test('error shows', () => {
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      expect(errorDiv.length).toBe(1);
    });

    test('counter still displays 0', () => {
      const count = findByTestAttr(wrapper, 'count').text();
      expect(count).toBe("0");
    });

    test('clicking increment clears the error', () => {
      // find and click the increment button
      const incButton = findByTestAttr(wrapper, 'increment-button');
      incButton.simulate('click');

      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      expect(errorDiv.length).toBe(0);
    });
  });
});