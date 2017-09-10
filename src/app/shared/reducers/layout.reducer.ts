import * as Layout from '../actions/layout.actions';
import { ILayout, ActionImplementation } from '../models/barrel-models';



export function layoutReducer(state: ILayout = null, action: ActionImplementation): ILayout {
	switch (action.type) {

		// ChangeHeaderText
		case Layout.ChangeHeaderText.type:
			return <ILayout> { ...state, headerText: action.payload };

		// IncrementLoadingSemaphore
		case Layout.IncrementLoadingSemaphore.type:
			if(!state.loadingSemaphore) state.loadingSemaphore = 0;
			state.loadingSemaphore++;
			return <ILayout> state;

		// DecrementLoadingSemaphore
		case Layout.DecrementLoadingSemaphore.type:
			if(!state.loadingSemaphore) throw Error('Não posso decrementar abaixo de zero');
			state.loadingSemaphore--;
			return <ILayout> state;

		default:
			return <ILayout> state;
	}
}