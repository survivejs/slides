import React from "react";
import { request } from "graphql-request";

function connect(query, { apiUrl, propsToVars }) {
  return component => {
    let queryCache = {};

    class Connect extends React.Component {
      constructor(props) {
        super(props);

        this.state = { data: queryCache || null };
        this._unmounted = false;
      }
      componentDidMount() {
        this.fetchData().then(
          data => !this._unmounted && this.setState(() => data)
        );
      }
      componentWillUnmount() {
        this._unmounted = true;
      }
      render() {
        if (this.state.data === null) {
          return null;
        } else {
          return React.createElement(component, {
            ...this.props,
            ...this.state.data
          });
        }
      }
      fetchData() {
        const vars = propsToVars ? propsToVars(this.props) : {};

        return request(vars.apiUrl || apiUrl, query, vars).then(data => {
          queryCache = data;

          return { data };
        });
      }
    }

    return Connect;
  };
}

export default connect;
