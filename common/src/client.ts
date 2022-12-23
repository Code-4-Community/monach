import { Zodios } from '@zodios/core'
import userApi from './api';

export const apiClient = new Zodios("https://monarch-backend.c4cneu.com", userApi);
