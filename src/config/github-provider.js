import { GithubAuthProvider } from 'firebase/auth';

const provider = new GithubAuthProvider();

provider.addScope('user');
provider.setCustomParameters({
  allow_signup: 'false',
});

export { provider };
