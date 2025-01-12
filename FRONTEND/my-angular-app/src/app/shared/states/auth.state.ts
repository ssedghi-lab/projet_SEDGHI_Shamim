import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login, Logout } from '../action/auth.actions';

export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const state = ctx.getState();
    ctx.patchState({
      token: action.payload.token,
      username: action.payload.username
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      token: null,
      username: null
    });
  }
}
