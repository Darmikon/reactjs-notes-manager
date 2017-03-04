import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders welcome message', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React Master</h2>;

    expect(wrapper.contains(welcome)).toEqual(true);

	const code = wrapper.find('code');
	expect(code.text()).toBe('src/App.js');
});