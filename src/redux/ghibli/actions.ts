import { createAction } from '@reduxjs/toolkit';
import { GetAllFilmsRequestPayload, GetAllFilmsSuccessPayload } from './types';

export const getAllFilmsRequest = createAction<GetAllFilmsRequestPayload>('GET_ALL_FILMS_REQUEST');
export const getAllFilmsSuccess = createAction<GetAllFilmsSuccessPayload>('GET_ALL_FILMS_SUCCESS');
export const getAllFilmsFailed = createAction('GET_ALL_FILMS_FAILED');
