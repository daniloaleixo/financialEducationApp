import { ActionImplementation } from './common/models/redux.model';


const INCREMENT  = '[Counter] Increment';
const DECREMENT  = '[Counter] Decrement';
const RESET      = '[Counter] Reset';


export class Increment extends ActionImplementation {
  readonly type = INCREMENT;
  public static type = INCREMENT;
}

export class Decrement extends ActionImplementation {
  readonly type = DECREMENT;
  public static type = DECREMENT;
}

export class Reset extends ActionImplementation {
  readonly type = RESET;
  public static type = RESET;

  constructor(public payload: number) {
  	super(payload);
  }
}

export type All
  = Increment
  | Decrement
  | Reset;
