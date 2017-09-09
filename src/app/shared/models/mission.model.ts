export interface IMission {
	id: string;
	title: string;
	description: string;
	photoURL: string;
	points: number;
}

export type TMissionHash = {
	[idMission: string]: IMission;
} 