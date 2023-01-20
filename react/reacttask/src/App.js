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
  }


  return (
    <div className="App">
      <h1>Main page:</h1>
      <Menu active={page} onChange={setPage}/>
      {renderPage(page, articleID)}
    </div>
  );
}

export default App;
