import {Component} from 'react';
import axios from 'axios';
import Layout from '../../components/layout/layout-main'

export default class Login extends Component {
  render() {
    return (
      <Layout>
        <section>
          <form action="/api/auth/signup" method="POST">
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <button type="submit">Register</button>
          </form>
        </section>
      </Layout>
    )
  }
    
}