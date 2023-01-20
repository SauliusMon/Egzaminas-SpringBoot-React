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

    
    return (<table> 
            {articles.length !== 0 ?
                articles.map(article => (
                    <tbody id="article">
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
                            <td>
                                <a id="link-viewmore" href="#" onClick={(e) => 
                                    notifyActiveChange("ReadMore", article.id)}> Skaityti daugiau</a>
                            </td>
                        </tr>
                    </tbody>
                )) :
            <tr>
                <td id="article-name">No articles</td>
            </tr>
        }
        
         </table>
    )
}