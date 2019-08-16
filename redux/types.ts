export interface FilmsType {
    actors: [{
        avatarAddress: string;
        name: string;
        role: string;
    }]
    category: string;
    director: string;
    filmId: number;
    filmType: { name: string; value: number; }
    grade: string;
    isPresale: boolean;
    isSale: boolean;
    item: { name: string; type: number; }
    language: string;
    name: string;
    nation: string;
    poster: string;
    premiereAt: number;
    runtime: number;
    synopsis: string;
    timeType: number;
    videoId: string;
}