import {Component} from 'react';
import { getAllGameData } from '../../lib/games';
import Layout from '../../components/layout/layout-main'

export async function getStaticProps() {
  let games = await getAllGameData();
  games = JSON.parse(games);
  return {
    props: {
      games,
    }
  }
}

export default class Index extends Component {
  render() {
    return (
      <Layout games={this.props.games}>
        <section className="container-admin-form">
          <div className="form-header-admin">
            <h1>Login</h1>
          </div>
          <form action="/api/auth/login" method="POST" className="form-admin">
            <input type="email" name="email" placeholder="Enter email"/>
            <input type="password" name="password" placeholder="Enter password"/>
            <button type="submit" className="button-auth">Sign in</button>
          </form>
        </section>
      </Layout>
    )
  }
}