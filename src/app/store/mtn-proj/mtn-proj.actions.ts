import { createAction, props } from '@ngrx/store';
import {
  MtnProjTick,
  MtnProjRoute,
  ClimbingRating,
  RouteEntity,
} from 'src/app/models/mtn-proj.models';

export const SET_MIN_GRADE = '[Pyramid] set min grade';
export const SET_MAX_GRADE = '[Pyramid] set max grade';
export const SET_IDEAL_ENTITY_PYRAMID = '[Pyramid] set ideal entity period';

export const GET_USER_TICKS = '[MTN PROJECT] get user ticks';
export const GET_USER_TICKS_SUCCESS = '[MTN PROJECT] get user ticks success';
export const GET_USER_TICKS_FAILURE = '[MTN PROJECT] get user ticks failure';

export const GET_USER_ROUTES_SUCCESS = '[MTN PROJECT] get user routes success';
export const GET_USER_ROUTES_FAILURE = '[MTN PROJECT] get user routes failure';

export const SET_EMAIL = '[MTN PROJECT] set email';

export const getUserTicks = createAction(
  GET_USER_TICKS,
  props<{ date: 'all-time' | 'this-year' }>()
);
export const getUserTicksSuccess = createAction(
  GET_USER_TICKS_SUCCESS,
  props<{ ticks: MtnProjTick[] }>()
);
export const getUserTickFailure = createAction(GET_USER_TICKS_FAILURE);

export const getUserRoutesSuccess = createAction(
  GET_USER_ROUTES_SUCCESS,
  props<{ routes: MtnProjRoute[] }>()
);

export const setEmailAction = createAction(
  SET_EMAIL,
  props<{ email: string }>()
);

export const setMinGradeAction = createAction(
  SET_MIN_GRADE,
  props<{ min: ClimbingRating }>()
);

export const setMaxGradeAction = createAction(
  SET_MAX_GRADE,
  props<{ max: ClimbingRating }>()
);

export const setIdealEntityPyramidAction = createAction(
  SET_IDEAL_ENTITY_PYRAMID,
  props<{ entity: RouteEntity }>()
);
