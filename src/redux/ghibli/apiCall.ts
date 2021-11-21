import env from '@env';
import withQuery from 'with-query';
import { GetAllFilmsRequestPayload } from './types';

export async function getAllFilms({ limit }: GetAllFilmsRequestPayload): Promise<Response> {
  try {
    const url = withQuery(`${env.API_URL}/films`, {
      limit,
    });

    const response = await fetch(url);

    return response.json();
  } catch (error) {
    console.error('getAllFilms - Error: ', error);
    throw error;
  }
}
