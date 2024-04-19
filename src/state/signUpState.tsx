import { type RecoilState, atom } from 'recoil';

export const signUpStepState: RecoilState<number> = atom({
    key: 'SignUpStepState',
    default: 0,
});

interface SocialSignUpState {
    isSocialSignUp: boolean;
    provider: string;
    email: string;
}

export const socialSignUpState: RecoilState<SocialSignUpState> = atom({
    key: 'SocialSignUpState',
    default: { isSocialSignUp: Boolean(false), provider: '', email: '' },
});
