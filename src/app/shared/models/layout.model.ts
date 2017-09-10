

export interface ILayout {
	loadingSemaphore: number;
	headerText: string;
}


export function defaultLayout(): ILayout {
	return {
		loadingSemaphore: 0,
		headerText: 'Financial Education'
	}
}