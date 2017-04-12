import {Dispatcher} from 'flux';

class DispatcherClass extends Dispatcher {
    handleAction(action) {
        this.dispatch({
            action: action,
        });
    }
}

export default new DispatcherClass();