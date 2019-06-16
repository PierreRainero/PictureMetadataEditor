import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Use React 16 adapter for enzyme
 */
configure({ adapter: new Adapter() });