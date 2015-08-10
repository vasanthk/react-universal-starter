import React, {Component} from "react";

// Fetch API (window.fetch) for node. This adds fetch as a global so that its API is consistent between client and server.
// The Fetch API provides an interface for fetching resources (e.g. across the network).
// It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.
import __fetch from "isomorphic-fetch";

// Allows you to write traditional CSS stylesheets in your components, automatically namespacing them for you.
import InlineCss from "react-inline-css";

// Relay-inspired library based on Promises instead of GraphQL.
import Transmit from "react-transmit";

/**
 * Main React application entry-point for both the server and client.
 */
class Main extends Component {
  /**
   * Runs on server and client.
   */
  componentWillMount() {
    if (__SERVER__) {
      // This is only run on the server, and will be removed from the client build.
      console.log("Hello server");
    }

    if (__CLIENT__) {
      // This is only run on the client.
      console.log("Hello client");

      /**
       * Recursive function to transmit the rest of the stargazers on the client.
       */
      const transmitRemainingStargazers = () => {
        if (!this.props.queryParams.pagesToFetch > 0) {
          return;
        }

        // setQueryParams(queryParams [, queryName|queryNames]) : Promise
        // Call this method to perform all queries again with the new queryParams
        // Returns a Promise to the query results. The same Promise that's passed to onQuery().
        this.props.setQueryParams({
          prevStargazers: this.props.allStargazers,
          nextPage: this.props.queryParams.nextPage + 1,
          pagesToFetch: this.props.queryParams.pagesToFetch - 1
        }).then(transmitRemainingStargazers);
      };

      transmitRemainingStargazers();
    }
  }

  /**
   * Runs on server and client.
   */
  render() {
    const repositoryUrl = "https://github.com/vasanthk/react-universal-starter";
    const avatarSize = 32;
    const avatarUrl = (id) => `https://avatars.githubusercontent.com/u/${id}?v=3&s=${avatarSize}`;

    /**
     * This is a Transmit prop. See below for its query.
     */
    const stargazers = this.props.allStargazers;

    return (
      <InlineCss stylesheet={Main.css(avatarSize)} namespace="Main">
        <a className="github" href={repositoryUrl}>
          <img
            src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
            alt="Fork me on GitHub"/>
        </a>

        <h1>
          <img src="/favicon.ico" alt="icon"/>
          <br/> Welcome to React Isomorphic Starterkit.
        </h1>

        <h3>Features</h3>
        <ul>
          <li>Fully automated with npm run scripts</li>
          <li>Server hot reloads with piping and Hapi.js</li>
          <li>Webpack for watch + production builds</li>
          <li>React.js + Router on the client and server</li>
          <li>React Hot Loader for instant client updates</li>
          <li>Babel.js automatically compiles ES6 + ES7</li>
          <li>React Transmit to preload on server to client</li>
          <li>InlineCss-component for styling components</li>
        </ul>
        <p>
          In short – <em>an excellent choice</em>.
          Ready to start{'?'}
        </p>

        <h3>Community</h3>

        <p>
          <a href={repositoryUrl} title="you here? star us!">
            {stargazers.map((user) => {
              return (
                <img key={user.id} className="avatar" src={avatarUrl(user.id)}
                     title={user.login} alt={user.login}/>
              );
            })}
            <img className="avatar" src={avatarUrl(0)} alt="you?"/>
          </a>
        </p>
      </InlineCss>
    );
  }

  /**
   * <InlineCss> component allows you to write a CSS stylesheet for your component.
   * Target your component with `&` and its children with `& selectors`. Be specific.
   */
  static css(avatarSize) {
    return (`
			& .github {
				position: absolute;
				top: 0;
				right: 0;
				border: 0;
			}
			& {
				font-family: sans-serif;
				color: #0df;
				padding: 10px 30px 30px;
				width: 380px;
				margin: 10px auto;
				background: #222;
			}
			& .avatar {
				border-radius: 50%;
				width: ${avatarSize}px;
				height: ${avatarSize}px;
				margin: 0 2px 2px 0;
			}
		`);
  }

}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 *
 * createContainer(ReactClass, options) : ReactClass
 * - Creates a container that wraps the original ReactClass.
 * - The container performs queries and passes query results as props to the original ReactClass.
 */
export default Transmit.createContainer(Main, {
  queryParams: {
    prevStargazers: [],
    nextPage: 1,
    pagesToFetch: 10
  },
  queries: {
    /**
     * Return a Promise of the previous stargazers + the newly fetched stargazers.
     */
      allStargazers (queryParams) {
      /**
       * On the server, connect to GitHub directly.
       */
      let githubApi = "https://api.github.com";

      /**
       * On the client, connect to GitHub via the Hapi proxy route.
       */
      if (__CLIENT__) {
        const {hostname, port} = window.location;
        githubApi = `http://${hostname}:${port}/api/github`;
      }

      /**
       * Load a few stargazers using the Fetch API.
       */
      return fetch(
        githubApi + "/repos/vasanthk/react-universal-starter/stargazers" +
        `?per_page=100&page=${queryParams.nextPage}`
      ).then((response) => response.json()).then((body) => {
          /**
           * Stop fetching if the response body is empty.
           */
          if (!body || !body.length) {
            queryParams.pagesToFetch = 0;

            return queryParams.prevStargazers;
          }

          /**
           * Pick id and username from fetched stargazers.
           */
          const fechedStargazers = body.map(({id, login}) => ({id, login}));

          return queryParams.prevStargazers.concat(fechedStargazers);
        });
    }
  }
});
