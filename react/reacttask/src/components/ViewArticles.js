import { tab } from '@testing-library/user-event/dist/tab';
import { useEffect, useState } from 'react';

//css
import './ViewArticles.css';

export function ViewArticles(props) {

    const [articles, setArticles] = useState([]);

    const notifyActiveChange = (state, articleID) => {
        props.onChange(state + articleID);
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/get-articles' ) //+ props.id
            .then((response) => response.json())
            .then(setArticles)
    }, []);

    
    return (<tbody>
        {articles.map(article => (
            <table id="article">
                <tr>
                    <th id="article-name">{article.name}</th>
                </tr>
                <tr>
                    <td id="article-date">{article.publishDate}</td>
                </tr>
                <tr>
                    <td id="article-description">{article.description}</td>
                </tr>
                <tr>
                    <a id="link-viewmore" href="#" onClick={(e) => 
                        notifyActiveChange("ReadMore", article.id)}> Skaityti daugiau</a>
                </tr>
            </table>

            //  <tr key={article.id}>
            //      <th>{article.name}</th>
            //      <td>{article.description}</td>
            //  </tr>
         ))}
         </tbody>)
}