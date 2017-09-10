import { ActionImplementation } from '../models/redux.model';
import { ILayout } from '../models/barrel-models';

const CHANGE_HEADER_TEXT  = '[Layout] ChangeHeaderText';
const INCREMENT_LOADING_SEMAPHORE = '[Layout] IncrementLoadingSemaphore';
const DECREMENT_LOADING_SEMAPHORE = '[Layout] DecrementLoadingSemaphore';


export class ChangeHeaderText extends ActionImplementation {
  readonly type = CHANGE_HEADER_TEXT;
  public static type = CHANGE_HEADER_TEXT;

  constructor(public payload: string) {
  	super(payload);
  }
}

export class IncrementLoadingSemaphore extends ActionImplementation {
  readonly type = INCREMENT_LOADING_SEMAPHORE;
  public static type = INCREMENT_LOADING_SEMAPHORE;

  constructor() {
    super();
  }
}

export class DecrementLoadingSemaphore extends ActionImplementation {
  readonly type = DECREMENT_LOADING_SEMAPHORE;
  public static type = DECREMENT_LOADING_SEMAPHORE;

  constructor() {
    super();
  }
}