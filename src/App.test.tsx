import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { Reducers } from './redux/reducers';
 
jest.mock("./dom/location.ts");

// tslint:disable:no-unused-expression
describe('App.tsx', () => {
    it('renders without crashing', () => {
        const store = createStore(Reducers);
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
