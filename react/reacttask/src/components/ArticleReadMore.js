import { useEffect, useState } from 'react';

export function ArticleReadMore(props) {

    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([])

    const [commentName, setCommentName] = useState("");
    const [commentDescription, setCommentDescription] = useState("")

    const setArticleID = ((articleID) => { 
        currentArticleId = articleID
        }
    )
    //On init sets article ID
    useEffect(() => {
        setArticleID(props.articleID)
        setComments(article.comments)
    })
    var currentArticleId;


    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/get-article/${currentArticleId}` )
            .then((response) => response.json())
            .then(setArticle)
    }, [currentArticleId]);

    const CreateComment = () =>  {
        fetch(
            `/api/v1/article_comments/${currentArticleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentName,
                    commentDescription,
                    registered: false
                })
            }
        )
    };

    return (
    <table>
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
            <td>Autorius</td>
            <td>
                {/* <input type="text" id="commentName" value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                ></input> */}
            </td>
        </tr>
        <tr>
            <td>Komentaras</td>
            <td>
            {/* <input type="text" id="commentDescription" value={commentDescription}
                onChange={(e) => setCommentDescription(e.target.value)}
            ></input> */}
            </td>
        </tr>
        <tr>
            {/* <button onClick={CreateComment}>Komentuoti</button> */}
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