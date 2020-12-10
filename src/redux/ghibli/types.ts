export type GetAllFilmsRequestPayload = {
  limit?: number;
};

export type GetAllFilmsSuccessPayload = {
  film: {
    id: string;
    title: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    rt_score: string;
    people: string;
    species: string;
    locations: string;
    url: string;
  }[];
};
