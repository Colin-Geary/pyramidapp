import { createAction, props } from '@ngrx/store';
import { MtnProjTick } from 'src/app/models/mtn-proj.models';

export const GET_USER_TICKS = '[MTN PROJECT] get user ticks';
export const GET_USER_TICKS_SUCCESS = '[MTN PROJECT] get user ticks success';
export const GET_USER_TICKS_FAILURE = '[MTN PROJECT] get user ticks failure';

export const SET_EMAIL = '[MTN PROJECT] set email';

export const getUserTicks = createAction(GET_USER_TICKS);
export const getUserTicksSuccess = createAction(
  GET_USER_TICKS,
  props<{ ticks: MtnProjTick[] }>()
);
export const getUserTickFailure = createAction(GET_USER_TICKS_FAILURE);

export const setEmailAction = createAction(
  SET_EMAIL,
  props<{ email: string }>()
);
