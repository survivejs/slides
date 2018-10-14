import Presenter from "./components/Presenter.jsx";
import connect from "./utils/connect";

export default connect(
  `
{
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
    propsToVars: ({ apiUrl }) => ({ apiUrl })
  }
)(Presenter);
