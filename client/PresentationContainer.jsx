import Presenter from "./components/Presenter.jsx";
import connect from "./connect";

export default connect(
  `
{
  theme {
    primaryColor
    secondaryColor
  }
  slides {
    layout
    content {
      ... on TitleContent {
      	title
        author
    	}
      ... on MarkdownContent {
      	title
        markup
    	}
    }
  }
}
`,
  {
    apiUrl: "http://localhost:4000"
  }
)(Presenter);
