import {Component} from 'react';
import { getAllGameData } from '../../lib/games';
import Layout from '../../components/layout/layout-main';
import { useRouter } from 'next/router';
import ErrorMessage from '../../components/errorMessage';

export async function getStaticProps() {
  let games = await getAllGameData();
  games = JSON.parse(games);
  return {
    props: {
      games,
    }
  }
}

export default function Index(props) {
  const router = useRouter();
  const {error} = router.query;

  return (
    <Layout games={props.games}>
      {renderErrorMessage(error)}
      <section className="container-admin-form">
        <div className="form-header-admin">
          <h1>Login</h1>
        </div>
        <form action="/api/auth/login" method="POST" className="form-admin">
          <input type="email" name="email" placeholder="Enter email"/>
          <input type="password" name="password" placeholder="Enter password"/>
          <button type="submit" className="button-auth">Sign in</button>
        </form>
        <a className="link-seed" href="/api/auth/seed">Set initial admin</a>
      </section>
    </Layout>
  )
}

const renderErrorMessage = (message) => {
  if(message) {
    const error = message.replace(/-/g , " ");
    return (
      <ErrorMessage error={error}/>
    )
  } else {
    return null;
  }
}