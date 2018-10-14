import Presenter from "./components/Presenter.jsx";
import connect from "./connect";
import initialData from "../initial-data.graphql";

export default connect(
  initialData,
  {
    apiUrl: "http://localhost:4000"
  }
)(Presenter);
