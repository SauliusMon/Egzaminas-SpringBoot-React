import { useEffect, useState } from 'react';

export function ArticleReadMore(props) {

    const [article, setArticle] = useState([]);
    const [comments, getComments] = useState([])

    const setArticleID = ((articleID) => { 
        currentArticleId = articleID
        }
    )
    //On init sets article ID
    useEffect(() => {
        setArticleID(props.articleID)
        getComments(article.comments)
    })
    var currentArticleId;


    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/get-article/${currentArticleId}` )
            .then((response) => response.json())
            .then(setArticle)
    }, [currentArticleId]);


    return (<table>
        <tr>
            <th>Sup bruh</th>
            <th>{currentArticleId}</th>
        </tr>
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
            <th>Palikti komentarą</th>
        </tr>
        <tr>
             <td></td>
        </tr>
        <tr>
            <th>Komentarai</th>
        </tr>
        <tr> 
            <article>Comment</article>
            {comments.map(comment => (
            <table id="comment">
                <td>{comment} Comment</td>
            </table>
            ))}
        </tr>

    </table>)
}