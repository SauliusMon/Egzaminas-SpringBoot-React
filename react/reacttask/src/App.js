import logo from './logo.svg';
import './App.css';
import { ViewArticles } from './components/ViewArticles';
import { useEffect, useState } from 'react';
import { CreateArticlePage } from './components/CreateArticlePage';
import { Menu } from './components/Menu';
import { ArticleReadMore } from './components/ArticleReadMore';

function App() {

  const [page, setPage] = useState("ViewArticles");
  var articleID = 1;

  const renderPage = (page, articleID) => {
    if (page === "CreateArticle") {
      return (<CreateArticlePage/>)
    }
    else if (page.includes("ReadMore")) {
      articleID = parseInt(page.slice(8));
      return (<ArticleReadMore articleID={articleID}/>)
    }
    else {
      return (<ViewArticles active={page} onChange={setPage}/>)
    }
  
    // switch(page) {
    //   case "CreateArticle":
    //     return (<CreateArticlePage/>)
    //   case "ReadMore//d":
    //     console.log(articleID + "supp")
    //     return (<ArticleReadMore setArticleID={articleID}/>)
    //   default:
    //     console.log(page + "supp")
    //       return (<ViewArticles active={page} onChange={setPage}/>)
    // }
  }


  return (
    <div className="App">
      Main page:
      <Menu active={page} onChange={setPage}/>
      {renderPage(page, articleID)}
    </div>
  );
}

// <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

export default App;
