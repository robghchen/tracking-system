export interface Team {
	id: number;
	teamName: string;
	points: number;
}

export interface Round {
	[x: number]: Team[];
}
